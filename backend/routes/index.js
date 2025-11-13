import express from "express";

import authRoutes from "./authRoutes.js";
import profileRoutes from "./profileRoutes.js";
import tasksRoutes from "./taskRoutes.js";
import projectRoutes from "./projectRoutes.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/api/auth", authRoutes);

router.use(authenticate);
router.use("/api/profile", profileRoutes);
router.use("/api/tasks", tasksRoutes);
router.use("/api/projects", projectRoutes);

export default router;
