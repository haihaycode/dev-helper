const userService = require("../services/userService");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

class UserController {
  async register(req, res, next) {
    try {
      const { username, password, role } = req.body;
      if (!username || !password) {
        throw new ApiError(400, req.__("errors.auth.missingFields"));
      }
      const userEntity = await userService.register(username, password, role);

      res
        .status(201)
        .json(
          ApiResponse.success(
            userEntity.toJSON(),
            req.__("success.auth.registered")
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ApiError(400, req.__("errors.auth.missingFields"));
      }

      const { userEntity, token } = await userService.login(username, password);

      res.json(
        ApiResponse.success(
          userEntity.toAuthJSON(token),
          req.__("success.auth.loggedIn")
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
          req.__("success.auth.getUserList")
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
