const express = require("express");
const {
  login,
  createUser,
  deactivateUser,
  getAllUsers,
  getProfile,
  resetPassword,
  editRole,
  activateUser,
  getCurrentUser,
  editUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("/all", auth, isAdmin, getAllUsers);
router.get("/current", auth, getCurrentUser);
router.get("/profile/:id", auth, isAdmin, getProfile);
router.post("/login", login);
router.post("/create-user", auth, isAdmin, createUser);
router.patch("/deactivate/:id", auth, isAdmin, deactivateUser);
router.patch("/activate/:id", auth, isAdmin, activateUser);
router.patch("/reset-password/:id", auth, isAdmin, resetPassword);
router.patch("/role/:id", auth, isAdmin, editRole);
router.patch("/edit/:id", auth, isAdmin, editUser);

module.exports = router;
