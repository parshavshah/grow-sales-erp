"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {}
  }
  PaymentMethod.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      paranoid: true,
      tableName: "paymentmethods",
      timestamps: true,
    }
  ).sync({ alter: true });
  return PaymentMethod;
};
