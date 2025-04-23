const { ExpenseCategory } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "expensecategory";
const MODULE_TITLE_SINGLE = "Expense Category";
const MODULE_TITLE_PLURAL = "Expense Categories";
const EXPENSE_CATEGORY_MODEL = ExpenseCategory;

// Validation schemas
const EXPENSE_CATEGORY_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
});

const EXPENSE_CATEGORY_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for expense categories
 */
module.exports = {
  /**
   * Render the list view with paginated expense categories
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listExpenseCategoryView: async (req, res) => {
    try {
      const expenseCategories = await EXPENSE_CATEGORY_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        expenseCategories,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listExpenseCategoryView:", error);
      res.status(500).json({
        message: "Failed to fetch expense categories",
        error: error.message,
      });
    }
  },

  /**
   * Create a new expense category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createExpenseCategoryAPI: async (req, res) => {
    try {
      const { error, value } = EXPENSE_CATEGORY_VALIDATION_SCHEMA.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      // add default status
      value.status = status.active;

      const insertProcess = await EXPENSE_CATEGORY_MODEL.create(value);

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
   * Update an existing expense category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateExpenseCategoryAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = EXPENSE_CATEGORY_VALIDATION_SCHEMA.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const expenseCategory = await EXPENSE_CATEGORY_MODEL.findByPk(
        req.params.id
      );
      if (!expenseCategory) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EXPENSE_CATEGORY_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedExpenseCategory = await EXPENSE_CATEGORY_MODEL.findByPk(
        req.params.id
      );

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedExpenseCategory,
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
   * Update an status of the expense category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateExpenseCategoryStatusAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = EXPENSE_CATEGORY_STATUS_SCHEMA.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const expenseCategory = await EXPENSE_CATEGORY_MODEL.findByPk(
        req.params.id
      );
      if (!expenseCategory) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EXPENSE_CATEGORY_MODEL.update(value, {
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
   * Read a single expense category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readExpenseCategoryAPI: async (req, res) => {
    try {
      const expenseCategory = await EXPENSE_CATEGORY_MODEL.findByPk(
        req.params.id
      );
      if (!expenseCategory) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: expenseCategory,
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
   * Delete a expense category
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteExpenseCategoryAPI: async (req, res) => {
    try {
      const expenseCategory = await EXPENSE_CATEGORY_MODEL.findByPk(
        req.params.id
      );
      if (!expenseCategory) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await EXPENSE_CATEGORY_MODEL.destroy({
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
