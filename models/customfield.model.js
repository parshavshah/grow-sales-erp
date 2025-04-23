"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomField extends Model {
    static associate(models) {}
  }
  CustomField.init(
    {
      entityType: DataTypes.STRING,
      fieldName: DataTypes.STRING,
      fieldLabel: DataTypes.STRING,
      fieldType: DataTypes.STRING,
      fieldOptions: DataTypes.TEXT,
      isRequired: DataTypes.BOOLEAN,
      fieldOrder: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CustomField",
      paranoid: true,
      tableName: "customfields",
      timestamps: true,
    }
  ).sync({ alter: true });
  return CustomField;
};
