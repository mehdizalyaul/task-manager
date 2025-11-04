import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "../styles/DashboardHome.css";

export default function DashboardHome() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="dashboard-container">
      <h2>Dashboard Home</h2>
      <p>
        Tasks number is <span>{tasks.length}</span>
      </p>
    </div>
  );
}
