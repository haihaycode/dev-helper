const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const UserEntity = require("../entities/UserEntity");
const ApiError = require("../utils/ApiError");

class UserService {
  async register(username, password, role) {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw new ApiError(400, "Tên đăng nhập đã tồn tại!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create(username, hashedPassword, role || "user");
    const newUser = await User.findById(result.insertId);

    return new UserEntity(newUser);
  }

  async login(username, password) {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, "Tên đăng nhập hoặc mật khẩu không đúng!");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userEntity = new UserEntity(user);
    return { userEntity, token };
  }

  async getAllUsers() {
    const users = await User.getAllUsers();
    return users.map((user) => new UserEntity(user));
  }
}

module.exports = new UserService();
