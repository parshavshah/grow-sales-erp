"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailTemplate extends Model {
    static associate(models) {}
  }
  EmailTemplate.init(
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      body: DataTypes.TEXT,
      description: DataTypes.TEXT,
      category: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EmailTemplate",
      paranoid: true,
      tableName: "emailtemplates",
      timestamps: true,
    }
  ).sync({ alter: true });
  return EmailTemplate;
};
