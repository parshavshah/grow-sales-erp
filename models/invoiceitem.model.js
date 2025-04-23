"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    static associate(models) {}
  }
  InvoiceItem.init(
    {
      invoiceId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.INTEGER,
      taxDetails: DataTypes.STRING,
      taxAmount: DataTypes.FLOAT,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.FLOAT,
      totalAmount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "InvoiceItem",
      paranoid: true,
      tableName: "invoiceitems",
      timestamps: true,
    }
  );
  return InvoiceItem;
};
