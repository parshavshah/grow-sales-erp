const { EmailTemplate } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "emailtemplate";
const MODULE_TITLE_SINGLE = "Email Template";
const MODULE_TITLE_PLURAL = "Email Templates";
const EMAILTEMPLATE_MODEL = EmailTemplate;

// Validation schemas
const EMAILTEMPLATE_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
  subject: Joi.string().required().trim(),
  body: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
  category: Joi.string().required().trim(),
  status: Joi.string().optional().trim(),
});

const EMAILTEMPLATE_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for email templates
 */
module.exports = {
  /**
   * Render the list view with paginated email templates
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listEmailTemplateView: async (req, res) => {
    try {
      const emailTemplates = await EMAILTEMPLATE_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        emailTemplates,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listEmailTemplateView:", error);
      res.status(500).json({
        message: "Failed to fetch email templates",
        error: error.message,
      });
    }
  },

  /**
   * Create a new email template
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createEmailTemplateAPI: async (req, res) => {
    try {
      const { error, value } = EMAILTEMPLATE_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      // set default status if not exists
      value.status = status.active;

      const insertProcess = await EMAILTEMPLATE_MODEL.create(value);

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
   * Update an existing email template
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateEmailTemplateAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = EMAILTEMPLATE_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const emailTemplate = await EMAILTEMPLATE_MODEL.findByPk(req.params.id);
      if (!emailTemplate) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EMAILTEMPLATE_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedEmailTemplate = await EMAILTEMPLATE_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedEmailTemplate,
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
   * Update an status of the email template
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateEmailTemplateStatusAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = EMAILTEMPLATE_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const emailTemplate = await EMAILTEMPLATE_MODEL.findByPk(req.params.id);
      if (!emailTemplate) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await EMAILTEMPLATE_MODEL.update(value, {
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
   * Read a single email template
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readEmailTemplateAPI: async (req, res) => {
    try {
      const emailTemplate = await EMAILTEMPLATE_MODEL.findByPk(req.params.id);
      if (!emailTemplate) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: emailTemplate,
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
   * Delete a email template
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteEmailTemplateAPI: async (req, res) => {
    try {
      const emailTemplate = await EMAILTEMPLATE_MODEL.findByPk(req.params.id);
      if (!emailTemplate) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await EMAILTEMPLATE_MODEL.destroy({
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