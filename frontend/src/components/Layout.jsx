import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import SideBar from "./SideBar";
import { AuthContext } from "../context";
import { useContext } from "react";
import { motion } from "framer-motion";

export default function Layout() {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout">
      {user.id && user.role && <SideBar />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="main-container"
      >
        <Outlet />
      </motion.div>{" "}
    </div>
  );
}
