import { useContext } from "react";
import { ProjectContext } from "../context";
import NoProjects from "../components/NoProjects";
import Board from "../components/Board/Board";

export default function MyTasks({ openModal }) {
  const { projects } = useContext(ProjectContext);

  return (
    <>
      {projects.length === 0 ? (
        <NoProjects openModal={openModal} isProjectExist={false} />
      ) : (
        <Board />
      )}
    </>
  );
}
