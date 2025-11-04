import { createContext, useReducer, useState, useEffect } from "react";
import { ProjectApi } from "../services";

export const ProjectContext = createContext();

const initialProjects = [];

const projectReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return action.payload;
    case "ADD_PROJECT":
      return [...state, action.payload];
    case "UPDATE_PROJECT":
      return state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
    case "DELETE_PROJECT":
      return state.filter((project) => project.id !== action.payload);
    default:
      return state;
  }
};

export default function ProjectProvider({ children }) {
  const [projects, dispatch] = useReducer(projectReducer, initialProjects);
  const [currentProject, setCurrentProject] = useState(null);
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await ProjectApi.getByUser();
        console.log(res);
        if (!res.success) throw new Error(res.message);
        const data = res.data;
        dispatch({ type: "SET_PROJECTS", payload: data });
        setCurrentProject(data[0].id);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, dispatch, currentProject, setCurrentProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
