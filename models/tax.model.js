"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    static associate(models) {}
  }
  Tax.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.FLOAT,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tax",
      paranoid: true,
      tableName: "taxes",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Tax;
};
