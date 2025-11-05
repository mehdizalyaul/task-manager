import "../styles/SideBar.css";
import { Home, List, Settings, Layers } from "lucide-react"; // import icons
import CheckBox from "./CheckBox";

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
          <List className="sidebar-icon" />
          My Tasks
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
          <Settings className="sidebar-icon" />
          Settings
        </li>
        <CheckBox />
      </ul>
    </aside>
  );
}
