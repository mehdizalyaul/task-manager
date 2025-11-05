import {
  useReducer,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import { TaskApi } from "../services/index";
import { ProjectContext } from "./ProjectContext";
export const TaskContext = createContext();

const initialTasks = {
  currentProjectTasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_TASKS":
      return { ...state, currentProjectTasks: action.payload };

    case "ADD_TASK":
      return {
        ...state,
        currentProjectTasks: [...state.currentProjectTasks, action.payload],
      };

    case "UPDATE_TASK":
      return {
        ...state,
        currentProjectTasks: state.currentProjectTasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        currentProjectTasks: state.currentProjectTasks.filter(
          (t) => t.id !== action.payload
        ),
      };

    case "SET_MY_TASKS": // for drag/drop reorder
      return { ...state, currentProjectTasks: action.payload };

    default:
      return state;
  }
};

export default function TaskProvider({ children }) {
  const { projects, currentProject } = useContext(ProjectContext);
  const { token, user } = useContext(AuthContext);
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projects || projects.length === 0 || !token || !user) return;

    const fetchCurrentProjectTasks = async () => {
      try {
        setLoading(true);
        let res;

        if (user.role === "admin") {
          //  data = await TaskApi.getAllTasks(token);
          //   dispatch({ type: "SET_TASKS", payload: data });
        } else if (user.role === "user" && currentProject) {
          res = await TaskApi.getTasksByProject(token, currentProject);
          const data = res.data;
          dispatch({
            type: "SET_CURRENT_PROJECT_TASKS",
            payload: data || [],
          });
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProjectTasks();
  }, [projects, token, user, currentProject]);

  const value = {
    ...tasks,
    dispatch,
    loading,
    error,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
