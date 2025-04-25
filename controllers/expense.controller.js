const { Expense } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "expense";
const MODULE_TITLE_SINGLE = "Expense";
const MODULE_TITLE_PLURAL = "Expenses";
const EXPENSE_MODEL = Expense;

// Validation schemas
const EXPENSE_VALIDATION_SCHEMA = Joi.object({
  expenseNumber: Joi.string().required().trim(),
  expenseDate: Joi.date().required(),
  amount: Joi.number().required(),
  taxAmount: Joi.number().required(),
  categoryId: Joi.number().integer().required(),
  totalAmount: Joi.number().required(),
  vendor: Joi.string().required().trim(),
  description: Joi.string().optional().trim().allow(""),
  paymentMethodId: Joi.string().required().trim(),
  reference: Joi.string().optional().trim().allow(""),
  receiptImage: Joi.string().optional().trim().allow(""),
});

const EXPENSE_STATUS_SCHEMA = Joi.object({
  status: Joi.string().valid(status.active, status.inactive).required(),
});

/**
 * Base controller containing CRUD operations for expenses
 */
module.exports = {
  /**
   * Render the list view with paginated expenses
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listExpenseView: async (req, res) => {
    try {
      const expenses = await EXPENSE_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        expenses,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listExpenseView:", error);
      res.status(500).json({
        message: "Failed to fetch expenses",
        error: error.message,
      });
    }
  },

  /**
   * Create a new expense
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createExpenseAPI: async (req, res) => {
    try {
      const { error, value } = EXPENSE_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      value.createdBy = req.session.user.id || 0;

      const insertProcess = await EXPENSE_MODEL.create(value);

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
   * Update an existing expense
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateExpenseAPI: async (req, res) => {
    try {
      const { error, value } = EXPENSE_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const expense = await EXPENSE_MODEL.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EXPENSE_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedExpense = await EXPENSE_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedExpense,
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
   * Update expense status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateExpenseStatusAPI: async (req, res) => {
    try {
      const { error, value } = EXPENSE_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const expense = await EXPENSE_MODEL.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EXPENSE_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} status updated successfully`,
      });
    } catch (error) {
      console.error(`Error updating ${MODULE_TITLE_SINGLE} status:`, error);
      res.status(500).json({
        message: `Failed to update ${MODULE_TITLE_SINGLE} status`,
        error: error.message,
      });
    }
  },

  /**
   * Read a single expense
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readExpenseAPI: async (req, res) => {
    try {
      const expense = await EXPENSE_MODEL.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: expense,
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
   * Delete an expense
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteExpenseAPI: async (req, res) => {
    try {
      const expense = await EXPENSE_MODEL.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await EXPENSE_MODEL.destroy({
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
