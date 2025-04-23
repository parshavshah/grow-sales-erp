const { Product } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");

const VIEW_PATH = "product";
const MODULE_TITLE_SINGLE = "Product";
const MODULE_TITLE_PLURAL = "Products";
const PRODUCT_MODEL = Product;

// Validation schemas
const PRODUCT_VALIDATION_SCHEMA = Joi.object({
  name: Joi.string().required().trim(),
  sku: Joi.string().required().trim(),
  shortDescription: Joi.string().required().trim(),
  price: Joi.number().required(),
  unit: Joi.string().required().trim(),
  type: Joi.number().required(),
  status: Joi.string().optional().trim(),
  image: Joi.string().optional().trim(),
});

const PRODUCT_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for products
 */
module.exports = {
  /**
   * Render the list view with paginated products
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listProductView: async (req, res) => {
    try {
      const products = await PRODUCT_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        products,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listProductView:", error);
      res.status(500).json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  },

  /**
   * Create a new product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createProductAPI: async (req, res) => {
    try {
      const { error, value } = PRODUCT_VALIDATION_SCHEMA.validate(req.body, {
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

      const insertProcess = await PRODUCT_MODEL.create(value);

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
   * Update an existing product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateProductAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = PRODUCT_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const product = await PRODUCT_MODEL.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await PRODUCT_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedProduct = await PRODUCT_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedProduct,
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
   * Update an status of the product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateProductStatusAPI: async (req, res) => {
    try {
      // Validate body
      const { error, value } = PRODUCT_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const product = await PRODUCT_MODEL.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await PRODUCT_MODEL.update(value, {
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
   * Read a single product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readProductAPI: async (req, res) => {
    try {
      const product = await PRODUCT_MODEL.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: product,
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
   * Delete a product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteProductAPI: async (req, res) => {
    try {
      const product = await PRODUCT_MODEL.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await PRODUCT_MODEL.destroy({
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