"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExpenseCategory extends Model {
    static associate(models) {}
  }
  ExpenseCategory.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ExpenseCategory",
      paranoid: true,
      tableName: "expensecategories",
      timestamps: true,
    }
  );
  return ExpenseCategory;
};
