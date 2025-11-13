import { useParams } from "react-router-dom";
import Board from "../components/Board/Board";
import { ProjectContext } from "../context";
import { useContext } from "react";

export default function ProjectTasks() {
  const { currentProject } = useContext(ProjectContext);
  const { projectId } = useParams();
  if (currentProject?.id !== Number(projectId)) {
    return null;
  }

  return <Board />;
}
