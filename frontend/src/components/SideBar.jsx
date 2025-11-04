import "../styles/SideBar.css";
export default function SideBar({
  projects,
  currentProject,
  setCurrentProject,
}) {
  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">Menu</h2>

      <ul className="sidebar-list">
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">My Tasks</li>

        <li className="sidebar-item sidebar-projects">
          <span className="sidebar-projects-title">Projects</span>
          <ul className="sidebar-projects-list">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <li
                  key={project.id}
                  className={
                    "sidebar-project-item" +
                    (project.id === currentProject ? "-active" : "")
                  }
                  onClick={() => {
                    setCurrentProject(project.id);
                    dispatch({ type: "SET_PROJECTS", payload: project });
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

        <li className="sidebar-item">Settings</li>
      </ul>
    </aside>
  );
}
