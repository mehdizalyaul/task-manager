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
import "./styles/global.css";

import { useState } from "react";

import ProjectTasks from "./pages/ProjectTasks";
import ProfilePage from "./pages/ProfilePage";
import MyTasks from "./pages/MyTasks";
import Layout from "./components/Layout";

export default function App() {
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
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardHome />} />

            {/* My tasks page */}
            <Route
              path="/tasks/mine"
              element={<MyTasks openModal={openModal} />}
            />

            {/* Project tasks page */}
            <Route
              path="/projects/:projectId/tasks"
              element={<ProjectTasks />}
            />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <ProjectForm closeModal={closeModal} />
        </Modal>
      )}
      <Notification />
    </div>
  );
}
