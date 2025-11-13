import {
  useReducer,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import { TaskApi } from "../services/index";
import { ProjectContext } from "./ProjectContext";
import { LoadingContext } from "./LoadingContext";
export const TaskContext = createContext();

const initialTasks = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "SET_MY_TASKS": // for drag/drop reorder
      return { ...state, tasks: action.payload };

    default:
      return state;
  }
};

export default function TaskProvider({ children }) {
  const { projects, currentProject } = useContext(ProjectContext);
  const { token, user } = useContext(AuthContext);
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [error, setError] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!projects || projects.length === 0 || !token || !user) return;

    const fetchCurrentProjectTasks = async () => {
      startLoading();
      try {
        let res;

        if (user.role === "user" && !currentProject?.id) {
          res = await TaskApi.getTasksById(token);
          const data = res.data;
          dispatch({ type: "SET_MY_TASKS", payload: data || [] });
        } else if (user.role === "user" && currentProject?.id) {
          res = await TaskApi.getTasksByProject(token, currentProject?.id);
          const data = res.data;
          dispatch({
            type: "SET_CURRENT_PROJECT_TASKS",
            payload: data || [],
          });
          localStorage.setItem(
            "currentProject",
            JSON.stringify(currentProject)
          );
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
      } finally {
        stopLoading();
      }
    };

    fetchCurrentProjectTasks();
  }, [projects, token, user, currentProject]);

  const value = {
    ...tasks,
    dispatch,
    error,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
