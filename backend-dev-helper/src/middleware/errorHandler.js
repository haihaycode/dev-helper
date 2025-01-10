const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Lỗi hệ thống";
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const { statusCode, message, stack } = err;

  if (res.headersSent) {
    return next(err);
  }

  const response = ApiResponse.error(
    message,
    {
      path: req.path,
      method: req.method,
      statusCode,
      controller: req.route?.path,
      handler: req.route?.stack[0]?.name,
    },
    stack
  );

  return res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
