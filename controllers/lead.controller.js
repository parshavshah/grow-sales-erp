const { Lead } = require("../models/index");
const Joi = require("joi");
const { status, leadStatus } = require("../utils/constant");
const VIEW_PATH = "lead";
const MODULE_TITLE_SINGLE = "Lead";
const MODULE_TITLE_PLURAL = "Leads";
const LEAD_MODEL = Lead;

// Validation schemas
const LEAD_VALIDATION_SCHEMA = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email().optional().allow("").trim(),
  phone: Joi.string().optional().trim().allow(""),
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
  leadStatus: Joi.string()
    .valid(...Object.values(leadStatus))
    .optional(),
});

const LEAD_STATUS_SCHEMA = Joi.object({
  status: Joi.string().valid(status.active, status.inactive).required(),
});

/**
 * Base controller containing CRUD operations for leads
 */
module.exports = {
  /**
   * Render the list view with paginated leads
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listLeadView: async (req, res) => {
    try {
      const leads = await LEAD_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        leads,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
        leadStatus,
      });
    } catch (error) {
      console.error("Error in listLeadView:", error);
      res.status(500).json({
        message: "Failed to fetch leads",
        error: error.message,
      });
    }
  },

  /**
   * Create a new lead
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createLeadAPI: async (req, res) => {
    try {
      const { error, value } = LEAD_VALIDATION_SCHEMA.validate(req.body, {
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
      value.leadStatus = value.leadStatus || leadStatus.New;
      // value.createdBy = req.user.id; @todo

      value.createdBy = req.session.user.id || 0;

      const insertProcess = await LEAD_MODEL.create(value);

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
   * Update an existing lead
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateLeadAPI: async (req, res) => {
    try {
      const { error, value } = LEAD_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const lead = await LEAD_MODEL.findByPk(req.params.id);
      if (!lead) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await LEAD_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedLead = await LEAD_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedLead,
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
   * Update lead status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateLeadStatusAPI: async (req, res) => {
    try {
      const { error, value } = LEAD_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const lead = await LEAD_MODEL.findByPk(req.params.id);
      if (!lead) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await LEAD_MODEL.update(value, {
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
   * Read a single lead
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readLeadAPI: async (req, res) => {
    try {
      const lead = await LEAD_MODEL.findByPk(req.params.id);
      if (!lead) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: lead,
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
   * Delete a lead
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteLeadAPI: async (req, res) => {
    try {
      const lead = await LEAD_MODEL.findByPk(req.params.id);
      if (!lead) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await LEAD_MODEL.destroy({
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
