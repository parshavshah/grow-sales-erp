const { Record } = require("../models/index");
const Joi = require("joi");

const VIEW_PATH = "base";
const MODULE_TITLE_SINGLE = "User";
const MODULE_TITLE_PLURAL = "Users";
const MODULE_MODEL = Record;

// Validation schemas
const RECORD_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
});

/**
 * Base controller containing CRUD operations for records
 */
module.exports = {
  /**
   * Render the list view with paginated records
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listRecordView: async (req, res) => {
    try {
      const records = await MODULE_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        records,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listRecordView:", error);
      res.status(500).json({
        message: "Failed to fetch records",
        error: error.message,
      });
    }
  },

  /**
   * Create a new record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createRecordAPI: async (req, res) => {
    try {
      const { error, value } = RECORD_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const insertProcess = await MODULE_MODEL.create(value);

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
   * Update an existing record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateRecordAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = RECORD_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const record = await MODULE_MODEL.findByPk(req.params.id);
      if (!record) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await MODULE_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedRecord = await MODULE_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedRecord,
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
   * Read a single record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readRecordAPI: async (req, res) => {
    try {
      const record = await MODULE_MODEL.findByPk(req.params.id);
      if (!record) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: record,
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
   * Delete a record
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteRecordAPI: async (req, res) => {
    try {
      const record = await MODULE_MODEL.findByPk(req.params.id);
      if (!record) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await MODULE_MODEL.destroy({
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
