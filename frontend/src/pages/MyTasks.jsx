import Board from "../components/Board/Board";
import SideBar from "../components/SideBar";
import { ProjectContext, TaskContext } from "../context";
import { useContext } from "react";
import "../styles/MyTasks.css";

export default function MyTasks() {
  const { projects, currentProject, dispatch } = useContext(ProjectContext);

  return (
    <div className="main-layout">
      <SideBar
        dispatch={dispatch}
        projects={projects}
        currentProject={currentProject}
      />
      {currentProject && <Board />}
    </div>
  );
}
