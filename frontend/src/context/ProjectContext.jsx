import { createContext, useReducer, useEffect, useContext } from "react";
import { ProjectApi } from "../services";
import { LoadingContext } from "./LoadingContext";
import { AuthContext } from "./AuthContext";
export const ProjectContext = createContext();

const initialState = {
  projects: [],
  currentProject: localStorage.getItem("currentProject")
    ? JSON.parse(localStorage.getItem("currentProject"))
    : null,
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
      };
    case "SET_CURRENT_PROJECT":
      return { ...state, currentProject: action.payload };
    default: {
      return state;
    }
  }
};

export default function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (!token) return;
    async function fetchProjects() {
      startLoading();
      try {
        const res = await ProjectApi.getByUser(token);
        if (!res.success) throw new Error(res.message);
        const data = res.data;
        dispatch({ type: "SET_PROJECTS", payload: data });
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        stopLoading();
      }
    }

    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        currentProject: state.currentProject,
        dispatch,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
