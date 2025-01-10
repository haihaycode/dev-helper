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

      const { userEntity, accessToken, refreshToken } = await userService.login(
        username,
        password
      );

      res.json(
        ApiResponse.success(
          userEntity.toAuthJSON(accessToken, refreshToken),
          req.__("success.auth.loggedIn")
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const sort = req.query.sort || "created_at";
      const order = req.query.order?.toUpperCase() || "DESC";

      const { users, totalItems, totalPages } = await userService.getAllUsers({
        page,
        limit,
        search,
        sort,
        order,
      });

      res.json(
        ApiResponse.success(
          {
            items: users.map((entity) => entity.toJSON()),
            pagination: {
              page,
              limit,
              totalItems,
              totalPages,
            },
            sort: {
              field: sort,
              order,
            },
          },
          req.__("success.auth.getUserList")
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new ApiError(400, req.__("errors.auth.missingRefreshToken"));
      }

      const { userEntity, accessToken, newRefreshToken } =
        await userService.refreshToken(refreshToken);

      res.json(
        ApiResponse.success(
          {
            ...userEntity.toJSON(),
            accessToken,
            refreshToken: newRefreshToken,
          },
          req.__("success.auth.tokenRefreshed")
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
