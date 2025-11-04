import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardHome from "./pages/DashboardHome";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import TaskDetails from "./pages/TaskDetails";
import Notification from "./components/Notification";
import MyTasks from "./pages/MyTasks";

import "./styles/global.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {user.role === "admin" && (
            <Route path="/" element={<DashboardHome />} />
          )}
          <Route path="/tasks/mine" element={<MyTasks />}>
            <Route path=":id" element={<TaskDetails />} />
          </Route>

          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Notification />
    </div>
  );
}
