const { Payment } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "payment";
const MODULE_TITLE_SINGLE = "Payment";
const MODULE_TITLE_PLURAL = "Payments";
const PAYMENT_MODEL = Payment;

// Validation schemas
const PAYMENT_VALIDATION_SCHEMA = Joi.object({
  paymentNumber: Joi.string().required().trim(),
  paymentType: Joi.string().required().trim(),
  paymentDate: Joi.date().required(),
  amount: Joi.number().required(),
  paymentMethodId: Joi.number().integer().required(),
  reference: Joi.string().optional().trim().allow(""),
  notes: Joi.string().optional().trim().allow(""),
  entityType: Joi.string().required().trim(),
  entityId: Joi.number().integer().required(),
  accountId: Joi.number().integer().required(),
  paymentImage: Joi.string().optional().trim().allow(""),
});

const PAYMENT_STATUS_SCHEMA = Joi.object({
  status: Joi.string().valid(status.active, status.inactive).required(),
});

/**
 * Base controller containing CRUD operations for payments
 */
module.exports = {
  /**
   * Render the list view with paginated payments
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listPaymentView: async (req, res) => {
    try {
      const payments = await PAYMENT_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        payments,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listPaymentView:", error);
      res.status(500).json({
        message: "Failed to fetch payments",
        error: error.message,
      });
    }
  },

  /**
   * Create a new payment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createPaymentAPI: async (req, res) => {
    try {
      const { error, value } = PAYMENT_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      // value.createdBy = req.user.id; @todo
      value.createdBy = 0;

      const insertProcess = await PAYMENT_MODEL.create(value);

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
   * Update an existing payment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updatePaymentAPI: async (req, res) => {
    try {
      const { error, value } = PAYMENT_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const payment = await PAYMENT_MODEL.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await PAYMENT_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedPayment = await PAYMENT_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedPayment,
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
   * Update payment status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updatePaymentStatusAPI: async (req, res) => {
    try {
      const { error, value } = PAYMENT_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const payment = await PAYMENT_MODEL.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await PAYMENT_MODEL.update(value, {
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
   * Read a single payment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readPaymentAPI: async (req, res) => {
    try {
      const payment = await PAYMENT_MODEL.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: payment,
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
   * Delete a payment
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deletePaymentAPI: async (req, res) => {
    try {
      const payment = await PAYMENT_MODEL.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await PAYMENT_MODEL.destroy({
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