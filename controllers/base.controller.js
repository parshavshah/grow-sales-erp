const { Record } = require("../models/index");
const Joi = require("joi");

const VIEW_PATH = "base";
const MODULE_TITLE_SINGLE = "User";
const MODULE_TITLE_PLURAL = "Users";
const MODULE_MODEL = Record;

module.exports = {
  listRecordView: async (req, res) => {
    try {
      const records = await MODULE_MODEL.findAll({
        order: [["id", "DESC"]],
        raw: true,
      });

      console.log({ records });

      res.render(`${VIEW_PATH}/list`, {
        records,
        layout: "../views/layouts/admin_layout.ejs",
        baseUrl: process.env.BASE_URL,
        title: MODULE_TITLE_PLURAL,
        singleTitle: MODULE_TITLE_SINGLE,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  createRecordAPI: async (req, res) => {
    try {
      const validationSchema = Joi.object({
        name: Joi.string().required(),
      });

      const { error, value } = validationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      req.body = value;

      const insertProcess = await MODULE_MODEL.create(req.body);

      res.status(200).json({
        message: `Record created successfully`,
        data: insertProcess,
      });
    } catch (error) {
      console.error(`Error creating Record:`, error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  updateRecordAPI: async (req, res) => {
    try {
      const validationSchema = Joi.object({
        name: Joi.string().required(),
      });

      const { error, value } = validationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      // check record exists
      const record = await MODULE_MODEL.findByPk(req.params.id);

      if (!record) {
        return res.status(400).json({
          message: "Record not found",
        });
      }

      req.body = value;

      const updateProcess = MODULE_MODEL.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        message: `Record updated successfully`,
        data: updateProcess,
      });
    } catch (error) {
      console.error(`Error updating Record:`, error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  readRecordAPI: async (req, res) => {
    try {
      const record = await MODULE_MODEL.findByPk(req.params.id);

      if (!record) {
        return res.status(400).json({
          message: "Record not found",
        });
      }

      res.status(200).json({
        message: `Record read successfully`,
        data: record,
      });
    } catch (error) {
      console.error(`Error reading Record:`, error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  deleteRecordAPI: async (req, res) => {
    try {
      const record = await MODULE_MODEL.findByPk(req.params.id);

      if (!record) {
        return res.status(400).json({
          message: "Record not found",
        });
      }

      const deleteProcess = MODULE_MODEL.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        message: `Record deleted successfully`,
        data: deleteProcess,
      });
    } catch (error) {
      console.error(`Error deleting Record:`, error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
