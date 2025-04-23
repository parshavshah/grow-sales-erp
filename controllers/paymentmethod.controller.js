const { PaymentMethod } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");
const VIEW_PATH = "paymentmethod";
const MODULE_TITLE_SINGLE = "Payment Method";
const MODULE_TITLE_PLURAL = "Payment Methods";
const PAYMENT_METHOD_MODEL = PaymentMethod;

// Validation schemas
const PAYMENT_METHOD_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().optional().trim(),
});

const PAYMENT_METHOD_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for payment methods
 */
module.exports = {
  /**
   * Render the list view with paginated payment methods
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listPaymentMethodView: async (req, res) => {
    try {
      const paymentMethods = await PAYMENT_METHOD_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        paymentMethods,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listPaymentMethodView:", error);
      res.status(500).json({
        message: "Failed to fetch payment methods",
        error: error.message,
      });
    }
  },

  /**
   * Create a new payment method
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createPaymentMethodAPI: async (req, res) => {
    try {
      const { error, value } = PAYMENT_METHOD_VALIDATION_SCHEMA.validate(req.body, {
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

      const insertProcess = await PAYMENT_METHOD_MODEL.create(value);

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
   * Update an existing payment method
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updatePaymentMethodAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = PAYMENT_METHOD_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const paymentMethod = await PAYMENT_METHOD_MODEL.findByPk(req.params.id);
      if (!paymentMethod) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await PAYMENT_METHOD_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedPaymentMethod = await PAYMENT_METHOD_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedPaymentMethod,
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
   * Update an status of the payment method
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updatePaymentMethodStatusAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = PAYMENT_METHOD_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const paymentMethod = await PAYMENT_METHOD_MODEL.findByPk(req.params.id);
      if (!paymentMethod) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await PAYMENT_METHOD_MODEL.update(value, {
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
   * Read a single payment method
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readPaymentMethodAPI: async (req, res) => {
    try {
      const paymentMethod = await PAYMENT_METHOD_MODEL.findByPk(req.params.id);
      if (!paymentMethod) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: paymentMethod,
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
   * Delete a payment method
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deletePaymentMethodAPI: async (req, res) => {
    try {
      const paymentMethod = await PAYMENT_METHOD_MODEL.findByPk(req.params.id);
      if (!paymentMethod) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await PAYMENT_METHOD_MODEL.destroy({
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
