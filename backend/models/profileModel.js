import db from "../db.js";

export const get = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || null);
      }
    );
  });
};

export const create = (fullName, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO profiles (user_id, full_name) VALUES (?, ?)`,
      [userId, fullName],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

export const update = (updatedData, userId) => {
  return new Promise((resolve, reject) => {
    const { full_name, phone_number, bio, avatar_url, job_title } = updatedData;

    db.query(
      "UPDATE profiles SET full_name = ?, phone_number = ?, bio = ?, avatar_url = ?, job_title = ? WHERE user_id = ?",
      [full_name, phone_number, bio, avatar_url, job_title, userId],
      (err) => {
        if (err) return reject(err);

        db.query(
          "SELECT * FROM profiles WHERE user_id = ?",
          [userId],
          (err2, rows) => {
            if (err2) return reject(err2);
            resolve(rows[0]);
          }
        );
      }
    );
  });
};
