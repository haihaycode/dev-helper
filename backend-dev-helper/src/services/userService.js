const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const i18n = require("i18n");
const User = require("../models/userModel");
const UserEntity = require("../entities/UserEntity");
const ApiError = require("../utils/ApiError");

class UserService {
  async register(username, password, role) {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      throw new ApiError(400, i18n.__("errors.auth.userExists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create(username, hashedPassword, role || "user");
    const newUser = await User.findById(result.insertId);

    return new UserEntity(newUser);
  }

  async login(username, password) {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, i18n.__("errors.auth.invalidCredentials"));
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Lưu refresh token vào database
    await User.saveRefreshToken(user.id, refreshToken);

    const userEntity = new UserEntity(user);
    return { userEntity, accessToken, refreshToken };
  }

  async refreshToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Kiểm tra token có trong database không
      const user = await User.findByIdAndRefreshToken(decoded.id, refreshToken);
      if (!user) {
        throw new ApiError(401, i18n.__("errors.auth.invalidRefreshToken"));
      }

      // Tạo token mới
      const accessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // Cập nhật refresh token mới vào database
      await User.updateRefreshToken(user.id, refreshToken, newRefreshToken);

      const userEntity = new UserEntity(user);
      return { userEntity, accessToken, newRefreshToken };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(401, i18n.__("errors.auth.invalidRefreshToken"));
    }
  }

  generateAccessToken(user) {
    if (!process.env.JWT_SECRET) {
      throw new ApiError(500, i18n.__("errors.system.missingJWTSecret"));
    }
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    });
  }

  generateRefreshToken(user) {
    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new ApiError(
        500,
        i18n.__("errors.system.missingRefreshTokenSecret")
      );
    }
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });
  }

  async getAllUsers({ page, limit, search, sort, order }) {
    const offset = (page - 1) * limit;

    // Validate sort field để tránh SQL injection
    const allowedSortFields = [
      "id",
      "username",
      "role",
      "created_at",
      "updated_at",
    ];
    if (!allowedSortFields.includes(sort)) {
      sort = "created_at";
    }

    // Validate order
    if (!["ASC", "DESC"].includes(order)) {
      order = "DESC";
    }

    const { users, total } = await User.getAllUsers({
      offset,
      limit,
      search,
      sort,
      order,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      users: users.map((user) => new UserEntity(user)),
      totalItems: total,
      totalPages,
    };
  }
}

module.exports = new UserService();
