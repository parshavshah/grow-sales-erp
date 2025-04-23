"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {}
  }
  Expense.init(
    {
      expenseNumber: DataTypes.STRING,
      expenseDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      taxAmount: DataTypes.FLOAT,
      categoryId: DataTypes.INTEGER,
      totalAmount: DataTypes.INTEGER,
      vendor: DataTypes.STRING,
      description: DataTypes.STRING,
      paymentMethodId: DataTypes.STRING,
      reference: DataTypes.STRING,
      receiptImage: DataTypes.STRING,
      createdBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Expense",
      paranoid: true,
      tableName: "expenses",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Expense;
};
