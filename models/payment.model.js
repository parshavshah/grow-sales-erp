"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {}
  }
  Payment.init(
    {
      paymentNumber: DataTypes.STRING,
      paymentType: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      paymentMethodId: DataTypes.INTEGER,
      reference: DataTypes.STRING,
      notes: DataTypes.STRING,
      entityType: DataTypes.STRING,
      entityId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      paymentImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
      paranoid: true,
      tableName: "payments",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Payment;
};
