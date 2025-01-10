const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json(ApiResponse.error(req.__("errors.auth.tokenNotFound")));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(ApiResponse.error(req.__("errors.auth.invalidToken")));
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json(ApiResponse.error(req.__("errors.auth.unauthorized")));
  }
  next();
};

module.exports = { verifyToken, isAdmin };
