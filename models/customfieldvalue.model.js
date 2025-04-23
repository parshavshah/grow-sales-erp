"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CustomFieldValue extends Model {
    static associate(models) {}
  }
  CustomFieldValue.init(
    {
      customFieldId: DataTypes.INTEGER,
      entityId: DataTypes.INTEGER,
      entityType: DataTypes.STRING,
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CustomFieldValue",
      paranoid: true,
      tableName: "customfieldvalues",
      timestamps: true,
    }
  ).sync({ alter: true });
  return CustomFieldValue;
};
