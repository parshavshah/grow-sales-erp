"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductTax extends Model {
    static associate(models) {}
  }
  ProductTax.init(
    {
      productId: DataTypes.INTEGER,
      taxId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductTax",
      paranoid: true,
      tableName: "producttaxes",
      timestamps: true,
    }
  ).sync({ alter: true });
  return ProductTax;
};
