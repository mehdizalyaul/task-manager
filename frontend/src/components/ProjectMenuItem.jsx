import { Ellipsis } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import "../styles/ProjectMenuItem.css";
import { useNavigate } from "react-router-dom";
import { ProjectApi } from "../services";
import { AuthContext } from "../context";

export default function ProjectMenuItem({ project, dispatch, currentProject }) {
  const { token } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const redirect = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await ProjectApi.deleteProject(projectId, token);

      if (!response.success) {
        console.error("Failed to delete project:", response.message);
        return;
      }
      dispatch({ type: "DELETE_PROJECT", payload: projectId });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <li
      key={project.id}
      ref={menuRef}
      className={`sidebar-project-item ${
        project.id === currentProject ? "active" : ""
      }`}
      onClick={() => {
        redirect(`/projects/${project.id}/tasks`);
        dispatch({
          type: "SET_CURRENT_PROJECT",
          payload: project,
        });
        localStorage.setItem("currentProject", JSON.stringify(project));
      }}
    >
      <div className="project-item-content">
        <span className="project-title">{project.title}</span>
        <button
          className="project-menu-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <Ellipsis size={18} />
        </button>
      </div>

      {menuOpen && (
        <div className="project-menu">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              console.log("Edit", project.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              handleDeleteProject(project.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
