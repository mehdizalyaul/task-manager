import { Task } from "../models/index.js";

// Get all tasks
export const fetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json({ success: false, data: tasks });
  } catch (error) {
    next(error);
  }
};

// Add task
export const createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    if (!newTask)
      return res
        .status(400)
        .json({ success: false, message: "New task not provided" });

    const userId = req.user.userId;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "User is not found" });

    const task = await Task.add(newTask, userId);

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ success: false, message: "ID Not in params Provided" });
    }
    const updatedTask = req.body;
    if (!updatedTask) {
      res
        .status(400)
        .json({ success: false, message: "Updated Task Not Provided" });
    }
    await Task.update(updatedTask, id);

    res.json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete task
export const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.deleteOne(id);
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTasksById = async (req, res, next) => {
  try {
    const id = req.user.userId;
    const tasks = await Task.getTasksById(id);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// Toggle task completion
export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ success: false, message: "ID Not in params Provided" });
    }
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ success: false, message: "Status Not Provided" });
    }
    await Task.updateStatus(id, status);
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    next(error);
  }
};
