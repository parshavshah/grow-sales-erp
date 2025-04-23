const { Tax } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "tax";
const MODULE_TITLE_SINGLE = "Tax";
const MODULE_TITLE_PLURAL = "Taxes";
const TAX_MODEL = Tax;

// Validation schemas
const TAX_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
  value: Joi.number().required(),
  type: Joi.string().required().trim(),
});

const TAX_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for taxes
 */
module.exports = {
  /**
   * Render the list view with paginated taxes
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listTaxView: async (req, res) => {
    try {
      const taxes = await TAX_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        taxes,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listTaxView:", error);
      res.status(500).json({
        message: "Failed to fetch taxes",
        error: error.message,
      });
    }
  },

  /**
   * Create a new tax
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createTaxAPI: async (req, res) => {
    try {
      const { error, value } = TAX_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const insertProcess = await TAX_MODEL.create(value);

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
   * Update an existing tax
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateTaxAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = TAX_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const tax = await TAX_MODEL.findByPk(req.params.id);
      if (!tax) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await TAX_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedTax = await TAX_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedTax,
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
   * Update an status of the tax
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateTaxStatusAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = TAX_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const tax = await TAX_MODEL.findByPk(req.params.id);
      if (!tax) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await TAX_MODEL.update(value, {
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
   * Read a single tax
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readTaxAPI: async (req, res) => {
    try {
      const tax = await TAX_MODEL.findByPk(req.params.id);
      if (!tax) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: tax,
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
   * Delete a tax
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteTaxAPI: async (req, res) => {
    try {
      const tax = await TAX_MODEL.findByPk(req.params.id);
      if (!tax) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await TAX_MODEL.destroy({
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
