const express = require("express");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUser
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUser
  );
// .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
// .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser)

module.exports = router;