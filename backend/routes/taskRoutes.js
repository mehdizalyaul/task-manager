import express from "express";
import { TaskController } from "../controllers/index.js";
import { validateId, validateTask } from "../validators/validateTask.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

// get all Tasks
router.get("/", authorize(["admin"]), TaskController.fetchTasks);

// get Tasks by ID
router.get(
  "/user/:id",
  validateId,
  validate,
  authorize(["admin", "user"]),
  TaskController.getTasksById
);

// Add A Task
router.post(
  "/",
  validateTask,
  validate,
  authorize(["admin", "user"]),
  TaskController.createTask
);
// Update a Task
router.put(
  "/:id",
  validateId,
  validateTask,
  validate,
  authorize(["admin", "user"]),
  TaskController.updateTask
);
// Toggle Task to Completed or Incompleted
router.patch(
  "/:id",
  validateId,
  validate,
  authorize(["admin", "user"]),
  TaskController.updateTaskStatus
);
// Delete A Task
router.delete(
  "/:id",
  validateId,
  validate,
  authorize(["admin", "user"]),
  TaskController.removeTask
);

export default router;
