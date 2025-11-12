import { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  AuthContext,
  SearchContext,
  NotificationContext,
  ProjectContext,
  TaskContext,
} from "../../context";
import { TaskApi } from "../../services/index";
import {
  TaskList,
  TaskItem,
  Spinner,
  Error,
  Modal,
  StatusMenu,
  TaskForm,
} from "../";
import "../../styles/Notification.css";
import { STATUS } from "../../utils/constants";
import { Outlet } from "react-router-dom";

export default function Board() {
  const { user, logout, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { search } = useContext(SearchContext);
  const { showNotification } = useContext(NotificationContext);
  const [activeTask, setActiveTask] = useState(null);
  const [modal, setModal] = useState({ open: false, task: null });
  const { tasks, dispatch } = useContext(TaskContext);
  const { currentProject: projectId } = useContext(ProjectContext);
  if (!user || !token) {
    logout();
    return;
  }
  const filteredTasks = useMemo(() => {
    if (!search) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const allTasks = useMemo(
    () => ({
      todo: filteredTasks.filter((t) => t.status === "todo"),
      in_progress: filteredTasks.filter((t) => t.status === "in_progress"),
      review: filteredTasks.filter((t) => t.status === "review"),
      done: filteredTasks.filter((t) => t.status === "done"),
    }),
    [filteredTasks]
  );

  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && handleCloseModal();
    if (modal.open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modal.open]);

  const handleOpenModal = useCallback((task = null) => {
    setModal({ open: true, task });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal({ open: false, task: null });
  });

  const addTask = useCallback(
    async (newTask) => {
      setLoading(true);
      setError(null);

      try {
        const res = await TaskApi.createTask(token, newTask, projectId);
        if (!res.success) throw new Error(res.message);
        const data = res.data;
        dispatch({ type: "ADD_TASK", payload: data });
        showNotification("Task added successfully!", "success");
      } catch (error) {
        setError(error.response || "Unexpected error occurred");
      } finally {
        setLoading(false);
        handleCloseModal();
      }
    },
    [dispatch, showNotification, token, projectId]
  );

  const updateTask = useCallback(
    async (updatedTask) => {
      setLoading(true);
      setError(null);

      try {
        const res = await TaskApi.updateTask(token, updatedTask, projectId);
        if (!res.success) {
          throw new Error(res.message);
        } else {
          dispatch({ type: "UPDATE_TASK", payload: updatedTask });
          showNotification("Task updated successfully!", "success");
        }
      } catch (error) {
        setError(error.response || "Unexpected error occurred");
      } finally {
        setLoading(false);
        handleCloseModal();
      }
    },
    [dispatch, showNotification, token, projectId]
  );

  const deleteTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await TaskApi.deleteTask(token, id);
        dispatch({ type: "DELETE_TASK", payload: id });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, token]
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    const fromStatus = active.data?.current?.status || activeTask?.status;
    const toStatus = over.data?.current?.status || overTask?.status || overId;

    if (!(fromStatus && toStatus)) return;

    // clone to avoid mutating state
    const updatedTasks = structuredClone(allTasks);

    const columnTasks = updatedTasks[toStatus];
    const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
    const newIndex = columnTasks.findIndex((t) => t.id === overId);

    // 🟦 CASE 1: Same column → reorder
    if (fromStatus === toStatus) {
      if (oldIndex === newIndex) return;

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      updatedTasks[toStatus] = [...reordered];
    } else {
      // 🟩 CASE 2: Move between columns
      updatedTasks[fromStatus] = updatedTasks[fromStatus].filter(
        (t) => t.id !== activeTask.id
      );

      updatedTasks[toStatus] = [
        ...updatedTasks[toStatus].slice(0, newIndex),
        { ...activeTask, status: toStatus },
        ...updatedTasks[toStatus].slice(newIndex),
      ];
    }

    // rebuild and dispatch
    const newTasks = Object.values(updatedTasks).flat();
    dispatch({ type: "SET_MY_TASKS", payload: newTasks });

    // persist to backend
    TaskApi.updateTaskStatus(token, activeId, toStatus).catch(console.error);

    setActiveTask(null);
  };

  if (loading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="tasks-container"
    >
      <h1>{"My Tasks"}</h1>

      <DndContext
        onDragStart={(event) => {
          const { active } = event;
          const task = tasks.find((t) => t.id === active.id);
          setActiveTask(task);
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="tasks-grid">
          {STATUS.map((status) => (
            <TaskList
              key={status}
              id={status}
              title={status
                .replace("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
              tasks={allTasks[status]}
              deleteTask={deleteTask}
              addTask={addTask}
              updateTask={updateTask}
              dispatch={dispatch}
              modal={modal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && <TaskItem task={activeTask} deleteTask={deleteTask} />}
        </DragOverlay>
      </DndContext>

      {modal.open && (
        <Modal closeModal={handleCloseModal}>
          {modal.task && <StatusMenu task={modal.task} dispatch={dispatch} />}
          <TaskForm
            task={modal.task}
            addTask={addTask}
            updateTask={updateTask}
          />
        </Modal>
      )}

      <Outlet />
      {error && <Error message={error} />}
    </motion.div>
  );
}
