import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardHome from "./pages/DashboardHome";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Modal from "./components/Modal";
import ProjectForm from "./components/ProjectForm";
import SideBar from "./components/SideBar";
import "./styles/MyTasks.css";
import "./styles/global.css";

import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { ProjectContext } from "./context";
import Board from "./pages/MyTasks";
import ProjectTasks from "./pages/ProjectTasks";

export default function App() {
  const { user } = useContext(AuthContext);
  const { projects, currentProject, dispatch } = useContext(ProjectContext);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {" "}
      <Navbar openModal={openModal} />
      <div className="main-layout">
        {user.id && user.role && (
          <SideBar
            dispatch={dispatch}
            projects={projects}
            currentProject={currentProject}
          />
        )}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {user.role === "admin" && (
              <Route path="/" element={<DashboardHome />} />
            )}

            {/* My tasks page */}
            <Route path="/tasks/mine" element={<Board />} />

            {/* Project tasks page */}
            <Route
              path="/projects/:projectId/tasks"
              element={<ProjectTasks />}
            />

            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>

        {isOpen && (
          <Modal closeModal={closeModal}>
            <ProjectForm closeModal={closeModal} />
          </Modal>
        )}
        <Notification />
      </div>
    </div>
  );
}
