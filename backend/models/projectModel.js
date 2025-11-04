import db from "../db.js";

export const getByUser = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM projects WHERE created_by = ?",
      [userId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

export const create = async (newProject) => {
  const { title, description, created_by } = newProject;

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO projects (title, description, created_by) VALUES (?, ?, ?)",
      [title, description, created_by],
      (err, results) => {
        if (err) return reject(err);

        const insertedId = results.insertId;

        db.query(
          "SELECT * FROM projects WHERE id = ?",
          [insertedId],
          (err2, rows) => {
            if (err2) return reject(err2);
            resolve(rows[0]);
          }
        );
      }
    );
  });
};

//Get single project + its tasks
export const getById = async (projectId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT p.title AS project_title, p.description AS project_description, t.* FROM projects p LEFT JOIN tasks t ON p.id = t.project_id WHERE p.id = ?",
      [projectId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

export const deleteById = async (projectId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM projects WHERE id = ?",
      [projectId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
export const updateById = async (projectId, updatedProject) => {
  const { title, description } = updatedProject;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE projects SET title = ?, description = ? WHERE id = ?",
      [title, description, projectId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
