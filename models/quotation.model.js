"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    static associate(models) {}
  }
  Quotation.init(
    {
      quotationNumber: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
      contactId: DataTypes.INTEGER,
      quoteDate: DataTypes.DATE,
      expiryDate: DataTypes.DATE,
      status: DataTypes.STRING,
      currency: DataTypes.STRING,
      taxInclusive: DataTypes.STRING,
      subtotal: DataTypes.STRING,
      taxAmount: DataTypes.FLOAT,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.FLOAT,
      totalAmount: DataTypes.FLOAT,
      notes: DataTypes.STRING,
      terms: DataTypes.TEXT,
      assignedTo: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quotation",
      paranoid: true,
      tableName: "quotations",
      timestamps: true,
    }
  );
  return Quotation;
};
