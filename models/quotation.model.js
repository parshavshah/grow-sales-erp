"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    static associate(models) {}
  }
  Quotation.init(
    {
      name: DataTypes.STRING,
      sku: DataTypes.STRING,
      shortDescription: DataTypes.STRING,
      price: DataTypes.FLOAT,
      unit: DataTypes.STRING,
      type: DataTypes.INTEGER,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quotation",
      paranoid: true,
      tableName: "quotations",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Quotation;
};
