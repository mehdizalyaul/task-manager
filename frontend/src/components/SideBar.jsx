import { Home, List, Settings, Layers } from "lucide-react"; // import icons
import { NavLink } from "react-router-dom";
import CheckBox from "./CheckBox";

import "../styles/SideBar.css";

export default function SideBar({ projects, currentProject, dispatch }) {
  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">Menu</h2>

      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Home className="sidebar-icon" />
          Dashboard
        </li>
        <li className="sidebar-item">
          <NavLink to="/tasks/mine" className="navlink">
            {" "}
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
                <li
                  key={project.id}
                  className={`sidebar-project-item ${
                    project.id === currentProject ? "active" : ""
                  }`}
                  onClick={() => {
                    dispatch({
                      type: "SET_CURRENT_PROJECT",
                      payload: project.id,
                    });
                  }}
                >
                  {project.title}
                </li>
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
        <CheckBox />
      </ul>
    </aside>
  );
}
