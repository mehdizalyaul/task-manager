import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Trash, SquarePen, GripVertical, Calendar, Flag } from "lucide-react";
import getStatusColor from "../../utils/getStatusColor";
import "../../styles/TaskItem.css";
import transformDate from "../../utils/transformDate";

export default function TaskItem({ task, deleteTask, openModal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const statusStyle = {
    borderLeft: `10px solid ${getStatusColor(task.status)}`,
  };

  // Format due date
  const formattedDate = task.due_date
    ? transformDate(task.due_date)
    : "No due date";

  return (
    <motion.li
      ref={setNodeRef}
      style={{
        ...style,
        borderLeft: statusStyle.borderLeft,
      }}
      {...attributes}
      className="tasks-item"
    >
      {/* Drag Handle */}
      <div className="drag-handle" {...listeners} style={{ cursor: "grab" }}>
        <GripVertical className="drag-handle-grip" size={20} />
      </div>

      {/* Task Info */}
      <div className="tasks-item_info">
        <p className="task-title">{task.title}</p>
        <p className="task-desc">{task.description.slice(0, 30)}</p>

        {/* Due Date & Priority */}
        <div className="tasks-item_meta">
          <div className="task-meta-item">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
          <div
            className={`task-meta-item task-priority ${task.priority?.toLowerCase()}`}
          >
            <Flag size={14} />
            <span>{task.priority || "No priority"}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="tasks-item_buttons">
        <SquarePen
          className="button button-edit"
          onClick={(e) => {
            e.stopPropagation();
            openModal(task);
          }}
        />
        <Trash
          className="button button-delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        />
      </div>
    </motion.li>
  );
}
