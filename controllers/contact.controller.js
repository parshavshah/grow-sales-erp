const { Contact } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "contact";
const MODULE_TITLE_SINGLE = "Contact";
const MODULE_TITLE_PLURAL = "Contacts";
const CONTACT_MODEL = Contact;

// Validation schemas
const CONTACT_VALIDATION_SCHEMA = Joi.object({
  accountId: Joi.number().integer().optional(),
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email().optional().allow("").trim(),
  phone: Joi.string().optional().trim().allow(""),
  department: Joi.string().optional().trim().allow(""),
  company: Joi.string().optional().trim().allow(""),
  jobTitle: Joi.string().optional().trim().allow(""),
  leadSource: Joi.string().optional().trim().allow(""),
  industry: Joi.string().optional().trim().allow(""),
  address: Joi.string().optional().trim().allow(""),
  city: Joi.string().optional().trim().allow(""),
  state: Joi.string().optional().trim().allow(""),
  zip: Joi.string().optional().trim().allow(""),
  country: Joi.string().optional().trim().allow(""),
  description: Joi.string().optional().trim().allow(""),
  assignedTo: Joi.number().integer().optional(),
  lastActivity: Joi.date().optional(),
  leadStatus: Joi.string().optional().trim().allow(""),
});

const CONTACT_STATUS_SCHEMA = Joi.object({
  status: Joi.string().valid(status.active, status.inactive).required(),
});

/**
 * Base controller containing CRUD operations for contacts
 */
module.exports = {
  /**
   * Render the list view with paginated contacts
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listContactView: async (req, res) => {
    try {
      const contacts = await CONTACT_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        contacts,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listContactView:", error);
      res.status(500).json({
        message: "Failed to fetch contacts",
        error: error.message,
      });
    }
  },

  /**
   * Create a new contact
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createContactAPI: async (req, res) => {
    try {
      const { error, value } = CONTACT_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      // Set default createdBy if not provided
      value.createdBy = value.createdBy || 0;

      const insertProcess = await CONTACT_MODEL.create(value);

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
   * Update an existing contact
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateContactAPI: async (req, res) => {
    try {
      const { error, value } = CONTACT_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const contact = await CONTACT_MODEL.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await CONTACT_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedContact = await CONTACT_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedContact,
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
   * Update contact status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateContactStatusAPI: async (req, res) => {
    try {
      const { error, value } = CONTACT_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const contact = await CONTACT_MODEL.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await CONTACT_MODEL.update(value, {
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
   * Read a single contact
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readContactAPI: async (req, res) => {
    try {
      const contact = await CONTACT_MODEL.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: contact,
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
   * Delete a contact
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteContactAPI: async (req, res) => {
    try {
      const contact = await CONTACT_MODEL.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await CONTACT_MODEL.destroy({
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