import express from "express";
import { ProjectController } from "../controllers/index.js";
import { validateId, validateProject } from "../validators/validateProject.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();
// Get all Projects for a User
router.get(
  "/",
  authorize(["admin", "user"]),
  ProjectController.getAllUserProjects
);

// Create A Project
router.post(
  "/",
  authorize(["admin", "user"]),
  validateProject,
  validate,
  ProjectController.createProject
);

// Get A Project by ID
router.get(
  "/:id",
  authorize(["admin", "user"]),
  validateId,
  validate,
  ProjectController.getProjectById
);

// Delete A Project by ID
router.delete(
  "/:id",
  authorize(["admin", "user"]),
  validateId,
  validate,
  ProjectController.deleteProjectById
);
// Get All Tasks for a Project
router.get(
  "/:id/tasks",
  authorize(["admin", "user"]),
  ProjectController.getAllProjectTasks
);

export default router;
