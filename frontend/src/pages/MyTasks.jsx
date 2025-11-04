import Board from "../components/Board/Board";
import SideBar from "../components/SideBar";
import { ProjectContext, TaskContext } from "../context";
import { useContext } from "react";
import "../styles/MyTasks.css";

export default function MyTasks() {
  const { projects, dispatch, currentProject, setCurrentProject } =
    useContext(ProjectContext);

  const { currentProjectTasks } = useContext(TaskContext);

  return (
    <div className="main-layout">
      <SideBar
        dispatch={dispatch}
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
      {currentProject && (
        <Board tasks={currentProjectTasks} dispatch={dispatch} />
      )}
    </div>
  );
}
