const { ToDo } = require("../models/index");
const Joi = require("joi");
const { status } = require("../utils/constant");

const VIEW_PATH = "todo";
const MODULE_TITLE_SINGLE = "Todo";
const MODULE_TITLE_PLURAL = "Todos";
const TODO_MODEL = ToDo;

// Validation schemas
const TODO_VALIDATION_SCHEMA = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  status: Joi.string().optional().trim(),
});

const TODO_STATUS_SCHEMA = Joi.object({
  status: Joi.string().optional().trim(),
});

/**
 * Base controller containing CRUD operations for todos
 */
module.exports = {
  /**
   * Render the list view with paginated todos
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  listTodoView: async (req, res) => {
    try {
      const todos = await TODO_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      res.render(`${VIEW_PATH}/list`, {
        todos,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.error("Error in listTodoView:", error);
      res.status(500).json({
        message: "Failed to fetch todos",
        error: error.message,
      });
    }
  },

  /**
   * Create a new todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createTodoAPI: async (req, res) => {
    try {
      const { error, value } = TODO_VALIDATION_SCHEMA.validate(req.body, {
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
      value.createdBy = req.user?.id || 0; // @todo: Get from authenticated user

      const insertProcess = await TODO_MODEL.create(value);

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
   * Update an existing todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateTodoAPI: async (req, res) => {
    try {
      const { error, value } = TODO_VALIDATION_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const todo = await TODO_MODEL.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await TODO_MODEL.update(value, {
        where: { id: req.params.id },
        returning: true,
      });

      if (updatedRows === 0) {
        return res.status(400).json({
          message: `Failed to update ${MODULE_TITLE_SINGLE}`,
        });
      }

      const updatedTodo = await TODO_MODEL.findByPk(req.params.id);

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} updated successfully`,
        data: updatedTodo,
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
   * Update status of a todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateTodoStatusAPI: async (req, res) => {
    try {
      const { error, value } = TODO_STATUS_SCHEMA.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
          errors: "Validation error",
        });
      }

      const todo = await TODO_MODEL.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const [updatedRows] = await TODO_MODEL.update(value, {
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
   * Read a single todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  readTodoAPI: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      res.status(200).json({
        message: `${MODULE_TITLE_SINGLE} retrieved successfully`,
        data: todo,
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
   * Delete a todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteTodoAPI: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findByPk(req.params.id);
      if (!todo) {
        return res.status(404).json({
          message: `${MODULE_TITLE_SINGLE} not found`,
        });
      }

      const deletedRows = await TODO_MODEL.destroy({
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