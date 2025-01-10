const bcrypt = require("bcryptjs");
const { pool } = require("../../config/db");

const generateRandomUser = async () => {
  const username = `user_${Math.random().toString(36).substring(7)}`;
  const password = await bcrypt.hash("password123", 10);
  const role = Math.random() > 0.8 ? "admin" : "user"; // 20% cơ hội là admin
  return [username, password, role];
};

const seedUsers = async (count = 10) => {
  try {
    console.log("Bắt đầu nạp dữ liệu mẫu cho users...");
    const promises = [];

    for (let i = 0; i < count; i++) {
      const userData = await generateRandomUser();
      const promise = pool.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        userData
      );
      promises.push(promise);
    }

    await Promise.all(promises);
    console.log(`Đã nạp thành công ${count} users vào database!`);
  } catch (error) {
    console.error("Lỗi khi nạp dữ liệu:", error);
  }
};

module.exports = seedUsers;
