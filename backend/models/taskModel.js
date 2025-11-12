import db from "../db.js";

// Get all tasks
export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tasks", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add new task To project
export const add = async (newProject, userId) => {
  const { title, description, status, priority, dueDate, projectId } =
    newProject;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tasks (title,description, status, priority,due_date,created_by,project_id) VALUES (?, ?, ?,?,?,?,?);",
      [title, description, status, priority, dueDate, userId, projectId],
      (err, results) => {
        if (err) return reject(err);

        const insertedId = results.insertId;
        // ✅ Fetch the created project by its ID
        db.query(
          "SELECT * FROM tasks WHERE id = ?",
          [insertedId],
          (err2, rows) => {
            if (err2) return reject(err2);
            resolve(rows[0]); // return the full created project object
          }
        );
      }
    );
  });
};

// Update
export const update = (newTask, taskId) => {
  const { title, description, status, priority, dueDate } = newTask;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET title = ? , description = ? , status = ? , priority = ? , due_date = ? WHERE id = ?",
      [title, description, status, priority, dueDate, taskId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// Update Status
export const updateStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// Delete task
export const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// GET A Task by User ID
export const getTasksById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE created_by = ? ";
    db.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

export const getByProject = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT t.*, p.title as project_name FROM tasks t JOIN projects p ON t.project_id = p.id WHERE t.project_id = ?",
      [id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
