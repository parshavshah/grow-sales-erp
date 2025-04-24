const { User, UserRole, Role } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "admin";
const MODULE_TITLE_SINGLE = "Admin";
const MODULE_TITLE_PLURAL = "Admins";
const EMPLOYEE_MODEL = User;
const ROLE_MODEL = Role;
const USER_ROLE_MODEL = UserRole;
const bcrypt = require("bcrypt");

// Validation schemas
const EMPLOYEE_VALIDATION_SCHEMA = Joi.object({
  email: Joi.string().required().trim().email(),
  passwordHash: Joi.string().optional().trim(),
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  phone: Joi.string().optional().trim(),
  profileImage: Joi.string().optional().trim(),
  status: Joi.string().optional().trim(),
});

const EMPLOYEE_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
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
  listAdminView: async (req, res) => {
    try {
      const admins = await EMPLOYEE_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        admins,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listAdminView:", error);
      res.status(500).json({
        message: "Failed to fetch admins",
        error: error.message,
      });
    }
  },

  /**
   * Create a new admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createAdminAPI: async (req, res) => {
    try {
      const { error, value } = EMPLOYEE_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      // check user exists or not
      const isExist = await EMPLOYEE_MODEL.count({
        where: {
          email: value.email,
        },
        raw: true,
      });

      if (isExist) {
        return res.status(400).json({
          message: `${MODULE_TITLE_SINGLE} already exists.`,
          errors: "Validation error",
        });
      }

      // set default role if not exists
      value.status = status.active;

      // hash the password
      const passwordHash = bcrypt.hashSync(value.passwordHash, 10);
      value.passwordHash = passwordHash;

      // insert process
      const insertProcess = await EMPLOYEE_MODEL.create(value);

      // create user role
      const role = await ROLE_MODEL.findOne({
        where: {
          name: "Admin",
        },
        raw: true,
      });

      const userRoleBody = {
        roleId: role.id,
        userId: insertProcess.id,
      };

      await USER_ROLE_MODEL.create(userRoleBody);

      res.status(201).json({
        message: `${MODULE_TITLE_SINGLE} created successfully`,
        data: insertProcess,
      });
    } catch (error) {
      console.error(`Error creating ${MODULE_TITLE_SINGLE}:`, error);
      res.status(500).json({
        message: `Failed to create ${MODULE_TITLE_SINGLE}`,
        error: error.message,
      });
    }
  },

  /**
   * Update an existing admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateAdminAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = EMPLOYEE_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const admin = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!admin) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EMPLOYEE_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedAdmin = await EMPLOYEE_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedAdmin,
      });
    } catch (error) {
      console.error(`Error updating ${MODULE_TITLE_SINGLE}:`, error);
      res.status(500).json({
        message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        error: error.message,
      });
    }
  },

  /**
   * Update an status of the admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateAdminStatusAPI: async (req, res) => {
    try {
      console.log(req.body);
      // Validate body
      const { error, value } = EMPLOYEE_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log({ value });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      console.log({ value });

      const admin = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!admin) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EMPLOYEE_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
      });
    } catch (error) {
      console.error(`Error updating ${MODULE_TITLE_SINGLE}:`, error);
      res.status(500).json({
        message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        error: error.message,
      });
    }
  },

  /**
   * Read a single admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readAdminAPI: async (req, res) => {
    try {
      const admin = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!admin) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: admin,
      });
    } catch (error) {
      console.error(`Error reading ${MODULE_TITLE_SINGLE}:`, error);
      res.status(500).json({
        message: `Failed to retrieve ${MODULE_TITLE_SINGLE}`,
        error: error.message,
      });
    }
  },

  /**
   * Delete a admin
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteAdminAPI: async (req, res) => {
    try {
      const admin = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!admin) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await EMPLOYEE_MODEL.destroy({
        where: { id: req.params.id },
      });

      if (deletedRows === 0) {
        return res.status(400).json({
          message: `Failed to delete ${MODULE_TITLE_SINGLE}`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} deleted successfully`,
      });
    } catch (error) {
      console.error(`Error deleting ${MODULE_TITLE_SINGLE}:`, error);
      res.status(500).json({
        message: `Failed to delete ${MODULE_TITLE_SINGLE}`,
        error: error.message,
      });
    }
  },
};
