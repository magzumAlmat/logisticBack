/* eslint-disable camelcase */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendMail");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Пароль и email должны быть предоставлены" });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ error: "Пользователь отключен. Обратитесь к администратору" });
    }

    const userInfo = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };

    const token = jwt.sign(
      {
        user: userInfo,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token, userInfo });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const { full_name, email, role } = req.body;
  try {
    // Проверяем, существует ли пользователь с такой почтой
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("Пользователь с такой почтой уже существует");
    }

    const generatedPassword = Math.random().toString(36).slice(-8);

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role,
    });

    const isSended = await sendEmail(email, generatedPassword);

    if (!isSended) {
      throw new Error("Error sending email");
    }

    if (isSended) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const deactivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user.email === "admin@pandora") {
      return res
        .status(403)
        .json({ error: "You can not deactivate admin@pandora user" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ isActive: false });
    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "full_name", "email", "role", "isActive"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user.email === "admin@pandora") {
      return res
        .status(403)
        .json({ error: "You can not reset admin@pandora password" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const password = Math.random().toString(36).slice(-8);

    const isSended = await sendEmail(user.email, password);

    if (!isSended) {
      throw new Error("Error sending email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ role });
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ isActive: true });
    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.error("Error activating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "User is not active" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ full_name, email, role });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
  getCurrentUser,
  createUser,
  deactivateUser,
  getAllUsers,
  getProfile,
  resetPassword,
  editRole,
  activateUser,
  editUser,
};
