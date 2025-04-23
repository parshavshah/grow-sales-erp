"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {}
  }
  Expense.init(
    {
      expense_number: DataTypes.STRING,
      expense_date: DataTypes.DATE,
      amount: DataTypes.INTEGER,
      tax_amount: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      vendor: DataTypes.STRING,
      description: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      reference: DataTypes.STRING,
      receipt_image: DataTypes.STRING,
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
