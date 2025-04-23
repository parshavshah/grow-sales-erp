"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {}
  }
  Invoice.init(
    {
      invoiceNumber: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
      contactId: DataTypes.INTEGER,
      invoiceDate: DataTypes.STRING,
      dueDate: DataTypes.STRING,
      status: DataTypes.STRING,
      taxAmount: DataTypes.FLOAT,
      discountType: DataTypes.STRING,
      discountValue: DataTypes.FLOAT,
      totalAmount: DataTypes.FLOAT,
      amountPaid: DataTypes.FLOAT,
      amountDue: DataTypes.FLOAT,
      notes: DataTypes.STRING,
      terms: DataTypes.TEXT,
      assignedTo: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invoice",
      paranoid: true,
      tableName: "invoices",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Invoice;
};
