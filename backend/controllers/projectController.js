import { Project, ProjectMembers, Task } from "../models/index.js";

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
    const { title, description, members } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Project title and description are required",
      });
    }

    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const projectId = await Project.create({ title, description, userId });

    if (!projectId) {
      return res
        .status(500)
        .json({ success: false, message: "Project not created" });
    }

    if (Array.isArray(members) && members.length > 0) {
      await ProjectMembers.add(projectId, members);
    }

    return res
      .status(201)
      .json({ success: true, data: { id: projectId, title, description } });
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
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};
/*
// Assign users to a project
export const assignProjectToUsers = async (req, res, next) => {
  try {
    const { users } = req.body;
    const { id: project_id } = req.params;

    // Validate input
    if (!users || users.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No users assigned" });
    }

    await ProjectMembers.add(users, project_id);

    return res
      .status(200)
      .json({ success: true, message: "Users assigned successfully" });
  } catch (error) {
    next(error);
  }
};
*/
