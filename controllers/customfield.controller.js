const { CustomField } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "customfield";
const MODULE_TITLE_SINGLE = "Custom Field";
const MODULE_TITLE_PLURAL = "Custom Fields";
const CUSTOMFIELD_MODEL = CustomField;

// Validation schemas
const CUSTOMFIELD_VALIDATION_SCHEMA = Joi.object({
  entityType: Joi.string().required().trim(),
  fieldName: Joi.string().required().trim(),
  fieldLabel: Joi.string().required().trim(),
  fieldType: Joi.string().required().trim(),
  fieldOptions: Joi.string().optional().trim().allow(""),
  isRequired: Joi.boolean().optional(),
  fieldOrder: Joi.string().optional().trim().allow(""),
  status: Joi.string().optional().trim(),
});

const CUSTOMFIELD_STATUS_SCHEMA = Joi.object({
  status: Joi.string().valid(status.active, status.inactive).required(),
});

/**
 * Base controller containing CRUD operations for custom fields
 */
module.exports = {
  /**
   * Render the list view with paginated custom fields
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listCustomFieldView: async (req, res) => {
    try {
      const customFields = await CUSTOMFIELD_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        customFields,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listCustomFieldView:", error);
      res.status(500).json({
        message: "Failed to fetch custom fields",
        error: error.message,
      });
    }
  },

  /**
   * Create a new custom field
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createCustomFieldAPI: async (req, res) => {
    try {
      const { error, value } = CUSTOMFIELD_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      // Set default status if not provided
      value.status = value.status || status.active;

      const insertProcess = await CUSTOMFIELD_MODEL.create(value);

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
   * Update an existing custom field
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateCustomFieldAPI: async (req, res) => {
    try {
      const { error, value } = CUSTOMFIELD_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const customField = await CUSTOMFIELD_MODEL.findByPk(req.params.id);
      if (!customField) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await CUSTOMFIELD_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedCustomField = await CUSTOMFIELD_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedCustomField,
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
   * Update custom field status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateCustomFieldStatusAPI: async (req, res) => {
    try {
      const { error, value } = CUSTOMFIELD_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const customField = await CUSTOMFIELD_MODEL.findByPk(req.params.id);
      if (!customField) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await CUSTOMFIELD_MODEL.update(value, {
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
   * Read a single custom field
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readCustomFieldAPI: async (req, res) => {
    try {
      const customField = await CUSTOMFIELD_MODEL.findByPk(req.params.id);
      if (!customField) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: customField,
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
   * Delete a custom field
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteCustomFieldAPI: async (req, res) => {
    try {
      const customField = await CUSTOMFIELD_MODEL.findByPk(req.params.id);
      if (!customField) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await CUSTOMFIELD_MODEL.destroy({
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