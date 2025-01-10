const userService = require("../services/userService");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

class UserController {
  async register(req, res, next) {
    try {
      const { username, password, role } = req.body;
      if (!username || !password) {
        throw new ApiError(400, "Vui lòng điền đầy đủ thông tin!");
      }
      const userEntity = await userService.register(username, password, role);

      res
        .status(201)
        .json(ApiResponse.success(userEntity.toJSON(), "Đăng ký thành công!"));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ApiError(400, "Vui lòng điền đầy đủ thông tin!");
      }

      const { userEntity, token } = await userService.login(username, password);

      res.json(
        ApiResponse.success(
          userEntity.toAuthJSON(token),
          "Đăng nhập thành công!"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const userEntities = await userService.getAllUsers();
      res.json(
        ApiResponse.success(
          userEntities.map((entity) => entity.toJSON()),
          "Lấy danh sách người dùng thành công!"
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
