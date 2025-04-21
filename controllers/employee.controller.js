const { User } = require("../models/index");
const Joi = require("joi");
const { roles, status } = require("../utils/constant");
const VIEW_PATH = "employee";
const MODULE_TITLE_SINGLE = "Employee";
const MODULE_TITLE_PLURAL = "Employees";
const EMPLOYEE_MODEL = User;

// Validation schemas
const EMPLOYEE_VALIDATION_SCHEMA = Joi.object({
  email: Joi.string().required().trim().email(),
  passwordHash: Joi.string().required().trim(),
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  phone: Joi.string().optional().trim(),
  profileImage: Joi.string().optional().trim(),
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for employees
 */
module.exports = {
  /**
   * Render the list view with paginated employees
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listEmployeeView: async (req, res) => {
    try {
      const employees = await EMPLOYEE_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        employees,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listEmployeeView:", error);
      res.status(500).json({
        message: "Failed to fetch employees",
        error: error.message,
      });
    }
  },

  /**
   * Create a new employee
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createEmployeeAPI: async (req, res) => {
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

      // set default role if not exists
      value.role = roles.employee;
      value.status = status.active;

      const insertProcess = await EMPLOYEE_MODEL.create(value);

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
   * Update an existing employee
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateEmployeeAPI: async (req, res) => {
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

      const employee = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!employee) {
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

      const updatedEmployee = await EMPLOYEE_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedEmployee,
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
   * Read a single employee
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readEmployeeAPI: async (req, res) => {
    try {
      const employee = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: employee,
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
   * Delete a employee
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteEmployeeAPI: async (req, res) => {
    try {
      const employee = await EMPLOYEE_MODEL.findByPk(req.params.id);
      if (!employee) {
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
