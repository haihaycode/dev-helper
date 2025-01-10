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
  getAllUsers: async ({ offset, limit, search, sort, order }) => {
    let query = "SELECT * FROM users";
    let countQuery = "SELECT COUNT(*) as total FROM users";
    const params = [];

    if (search) {
      query += " WHERE username LIKE ?";
      countQuery += " WHERE username LIKE ?";
      params.push(`%${search}%`);
    }

    query += ` ORDER BY ${sort} ${order}`;
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [users] = await pool.query(query, params);
    const [totalResult] = await pool.query(
      countQuery,
      search ? [`%${search}%`] : []
    );

    return {
      users,
      total: totalResult[0].total,
    };
  },

  findById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  saveRefreshToken: async (userId, refreshToken) => {
    const [result] = await pool.query(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refreshToken, userId]
    );
    return result;
  },

  findByIdAndRefreshToken: async (userId, refreshToken) => {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ? AND refresh_token = ?",
      [userId, refreshToken]
    );
    return rows[0];
  },

  updateRefreshToken: async (userId, oldToken, newToken) => {
    const [result] = await pool.query(
      "UPDATE users SET refresh_token = ? WHERE id = ? AND refresh_token = ?",
      [newToken, userId, oldToken]
    );
    return result;
  },
};

module.exports = User;
