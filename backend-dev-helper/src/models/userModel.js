const { pool } = require("../config/db");

const User = {
  create: async (username, password, role) => {
    const [results] = await pool.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, password, role]
    );
    return results;
  },

  findByUsername: async (username) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  },

  getAllUsers: async () => {
    const [rows] = await pool.query("SELECT username, role FROM users");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
};

module.exports = User;
