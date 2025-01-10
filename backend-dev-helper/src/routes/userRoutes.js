const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/refresh-token", userController.refreshToken.bind(userController));
router.get(
  "/users",
  verifyToken,
  isAdmin,
  userController.getAllUsers.bind(userController)
);

module.exports = router;
