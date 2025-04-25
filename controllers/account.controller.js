const { Accounts } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "account";
const MODULE_TITLE_SINGLE = "Account";
const MODULE_TITLE_PLURAL = "Accounts";
const ACCOUNT_MODEL = Accounts;

// Validation schemas
const ACCOUNT_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
  accountType: Joi.string().required().trim(),
  website: Joi.string().optional().trim().allow(""),
  industry: Joi.string().optional().trim().allow(""),
  phone: Joi.string().optional().trim().allow(""),
  address: Joi.string().optional().trim().allow(""),
  city: Joi.string().optional().trim().allow(""),
  state: Joi.string().optional().trim().allow(""),
  zip: Joi.string().optional().trim().allow(""),
  country: Joi.string().optional().trim().allow(""),
  description: Joi.string().optional().trim().allow(""),
  assignedTo: Joi.number().integer().optional(),
});

const ACCOUNT_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for accounts
 */
module.exports = {
  /**
   * Render the list view with paginated accounts
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listAccountView: async (req, res) => {
    try {
      const accounts = await ACCOUNT_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        accounts,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listAccountView:", error);
      res.status(500).json({
        message: "Failed to fetch accounts",
        error: error.message,
      });
    }
  },

  /**
   * Create a new account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createAccountAPI: async (req, res) => {
    try {
      const { error, value } = ACCOUNT_VALIDATION_SCHEMA.validate(req.body, {
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

      const insertProcess = await ACCOUNT_MODEL.create(value);

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
   * Update an existing account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateAccountAPI: async (req, res) => {
    try {
      const { error, value } = ACCOUNT_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const account = await ACCOUNT_MODEL.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await ACCOUNT_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedAccount = await ACCOUNT_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedAccount,
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
   * Update account status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateAccountStatusAPI: async (req, res) => {
    try {
      const { error, value } = ACCOUNT_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const account = await ACCOUNT_MODEL.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await ACCOUNT_MODEL.update(value, {
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
   * Read a single account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readAccountAPI: async (req, res) => {
    try {
      const account = await ACCOUNT_MODEL.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: account,
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
   * Delete a account
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteAccountAPI: async (req, res) => {
    try {
      const account = await ACCOUNT_MODEL.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await ACCOUNT_MODEL.destroy({
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