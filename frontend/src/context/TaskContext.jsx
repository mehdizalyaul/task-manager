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
  // allTasks: [],
  currentProjectTasks: [],
  // selectedTask: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_TASKS":
      return { ...state, currentProjectTasks: action.payload };

    //  case "SET_TASKS":
    //   return { ...state, allTasks: action.payload };

    case "ADD_TASK":
      // Add to both allTasks (admin) and myTasks (if relevant)
      return {
        ...state,
        //  allTasks: [...state.allTasks, action.payload],
        currentProjectTasks: [...state.myTasks, action.payload],
      };

    case "UPDATE_TASK": {
      const update = (tasks) =>
        tasks.map((t) => (t.id === action.payload.id ? action.payload : t));

      return {
        ...state,
        //   allTasks: update(state.allTasks),
        currentProjectTasks: update(state.myTasks),
      };
    }

    case "DELETE_TASK":
      return {
        ...state,
        // allTasks: state.allTasks.filter((t) => t.id !== action.payload),
        myTasks: state.myTasks.filter((t) => t.id !== action.payload),
      };

    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        // allTasks: state.allTasks.map((t) =>
        //   t.id === action.payload.id
        //    ? { ...t, status: action.payload.status }
        //     : t
        //  ),
        myTasks: state.myTasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        ),
      };

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
  console.log(currentProject);
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
          console.log(data);
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
