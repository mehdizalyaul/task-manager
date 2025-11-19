import db from "../db.js";

export const add = async (project_id, users) => {
  if (!users.length) return;

  const placeholders = users.map(() => "(?, ?)").join(", ");

  const values = users.flatMap((userId) => [userId, project_id]);

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO project_members (user_id, project_id) VALUES ${placeholders}`,
      values,
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
