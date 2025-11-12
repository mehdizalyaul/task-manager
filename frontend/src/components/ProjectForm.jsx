import { useContext, useState } from "react";
import { AuthContext, ProjectContext } from "../context";
import { ProjectApi } from "../services";
import "../styles/ProjectForm.css";

export default function ProjectForm({ closeModal }) {
  const { token } = useContext(AuthContext);
  const { dispatch } = useContext(ProjectContext);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title: projectTitle,
      description: projectDescription,
    };
    const createProject = async () => {
      try {
        const res = await ProjectApi.createProject(newProject, token);
        if (!res.success) {
          throw new Error("Failed to create project");
        }
        const data = res.data;
        dispatch({ type: "ADD_PROJECT", payload: data });
      } catch (error) {}
    };
    createProject();
    setProjectDescription("");
    setProjectTitle("");
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div>
        <label className="project-label">Project Title:</label>
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          required
          className="project-input"
        />
      </div>

      <div>
        <label className="project-label">Project Description:</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
          className="project-textarea"
        ></textarea>
      </div>

      <button type="submit" className="project-button">
        Create Project
      </button>
    </form>
  );
}
