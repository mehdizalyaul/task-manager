import { Project, Task } from "../models/index.js";

// Get all projects for a user
export const getAllUserProjects = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.getByUser(userId);

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// Create a new project
export const createProject = async (req, res, next) => {
  try {
    const newProject = req.body;
    if (!newProject) {
      res
        .status(400)
        .json({ success: false, message: "New Project Not Provided" });
    }
    const userId = req.user.userId;
    if (!userId) {
      res.status(400).json({ success: false, message: "User Not Found" });
    }
    const projects = await Project.create({ ...newProject, userId });
    if (!projects) {
      res.status(500).json({ success: false, message: "Project Not Created" });
    }
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};
// Get single project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.getById(id);

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// Delete project by ID
export const deleteProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Project.deleteById(id);
    res.status(200).json({ success: true, message: "Project Deleted" });
  } catch (error) {
    next(error);
  }
};

// Update project by ID
export const updateProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProject = req.body;
    await Project.updateById(id, updatedProject);
    res.status(200).json({ success: true, message: "Project Updated" });
  } catch (error) {
    next(error);
  }
};

export const getAllProjectTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await Task.getByProject(id);
    res.status(200).json({ success: false, data: tasks });
  } catch (error) {
    next(error);
  }
};
