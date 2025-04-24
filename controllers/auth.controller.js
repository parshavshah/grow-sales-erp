const { User, UserRole, Role } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "auth";
const MODULE_TITLE_SINGLE = "Admin";
const MODULE_TITLE_PLURAL = "Admins";
const ADMIN_MODEL = User;
const ROLE_MODEL = Role;
const USER_ROLE_MODEL = UserRole;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// Validation schemas
const AUTH_VALIDATION_SCHEMA = Joi.object({
  email: Joi.string().required().trim().email(),
  passwordHash: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for admins
 */
module.exports = {
  /**
   * Render the list view with paginated admins
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  loginView: async (req, res) => {
    try {
      res.render(`${VIEW_PATH}/login`, {
        layout: "../views/layouts/auth_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in loginView:", error);
      res.status(500).json({
        message: "Failed to fetch admins",
        error: error.message,
      });
    }
  },

  loginAPI: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Input validation
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if user exists
      const user = await User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Reset failed attempts on successful login
      await User.update(
        {
          lastLogin: new Date(),
        },
        { where: { id: user.id } }
      );

      // Set session
      req.session.user = user;
      req.session.save();

      res.status(200).json({
        user,
        message: "Login successful",
      });
    } catch (error) {
      console.error("Error in loginAPI:", error);
      res.status(500).json({
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  },
};
