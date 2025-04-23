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
      amount: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
      reference: DataTypes.STRING,
      notes: DataTypes.STRING,
      entityType: DataTypes.STRING,
      entityId: DataTypes.INTEGER,
      paymentNumber: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      paymentImage: DataTypes.STRING,
      accountId: DataTypes.INTEGER,
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
