const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
});

const connectDB = async () => {
  try {
    await pool.getConnection();
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Connect to MySQL failed :", error);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };
