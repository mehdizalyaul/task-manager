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

export const update = (update, userId) => {
  return new Promise((resolve, reject) => {
    const { full_name, phone, bio, avatarUrl, job_title } = update;

    db.query(
      "UPDATE profiles SET full_name = ?, phone = ?, bio = ?, avatar_url = ?, job_title = ? WHERE user_id = ?",
      [full_name, phone, bio, avatarUrl, job_title, userId],
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

export const uploadAvatar = (avatarUrl, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE profiles SET avatar_url = ? WHERE user_id = ?",
      [avatarUrl, userId],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};
