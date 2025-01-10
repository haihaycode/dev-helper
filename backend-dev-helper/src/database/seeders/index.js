const { connectDB } = require("../../config/db");
const seedUsers = require("./userSeeder");

const runSeeders = async () => {
  try {
    await connectDB();
    await seedUsers(20);
    console.log("Hoàn thành nạp dữ liệu mẫu!");
    process.exit(0);
  } catch (error) {
    console.error("Lỗi khi nạp dữ liệu mẫu:", error);
    process.exit(1);
  }
};

runSeeders();
