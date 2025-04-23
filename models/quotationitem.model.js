"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuotationItem extends Model {
    static associate(models) {}
  }
  QuotationItem.init(
    {
      quotationId: DataTypes.STRING,
      productId: DataTypes.STRING,
      description: DataTypes.STRING,
      quantity: DataTypes.STRING,
      unitPrice: DataTypes.STRING,
      taxDetails: DataTypes.TEXT,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.FLOAT,
      taxAmount: DataTypes.FLOAT,
      totalAmount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "QuotationItem",
      paranoid: true,
      tableName: "quotationitems",
      timestamps: true,
    }
  ).sync({ alter: true });
  return QuotationItem;
};
