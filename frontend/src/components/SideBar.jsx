import { Home, List, Settings, Layers, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import ProjectMenuItem from "./ProjectMenuItem";
import CheckBox from "./CheckBox";

import "../styles/SideBar.css";
import { useContext } from "react";
import { AuthContext, ProjectContext } from "../context";

export default function SideBar() {
  const { projects, currentProject, dispatch } = useContext(ProjectContext);
  const { logout } = useContext(AuthContext);

  const handleMyTasksClick = () => {
    console.log("first");
    dispatch({ type: "SET_CURRENT_PROJECT", payload: null });
    localStorage.removeItem("currentProject");
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">Menu</h2>

      <ul className="sidebar-list">
        <li className="sidebar-item">
          <NavLink to="/" className="navlink">
            <Home className="sidebar-icon" />
            Dashboard
          </NavLink>
        </li>

        <li className="sidebar-item" onClick={handleMyTasksClick}>
          <NavLink to="/tasks/mine" className="navlink">
            <List className="sidebar-icon" />
            My Tasks
          </NavLink>
        </li>

        <li className="sidebar-item sidebar-projects">
          <span className="sidebar-projects-title">
            <Layers className="sidebar-icon" />
            Projects
          </span>
          <ul className="sidebar-projects-list">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectMenuItem
                  key={project.id}
                  project={project}
                  dispatch={dispatch}
                  currentProject={currentProject?.id}
                />
              ))
            ) : (
              <li className="sidebar-empty">No projects yet</li>
            )}
          </ul>
        </li>

        <li className="sidebar-item">
          <NavLink to="/settings" className="navlink">
            <Settings className="sidebar-icon" />
            Settings
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/login" className="navlink" onClick={logout}>
            <LogOut className="sidebar-icon" /> Logout
          </NavLink>
        </li>

        <CheckBox />
      </ul>
    </aside>
  );
}
