"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    static associate(models) {}
  }
  Accounts.init(
    {
      name: DataTypes.STRING,
      accountType: DataTypes.STRING,
      website: DataTypes.STRING,
      industry: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      country: DataTypes.STRING,
      description: DataTypes.STRING,
      assignedTo: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Accounts",
      paranoid: true,
      tableName: "accounts",
      timestamps: true,
    }
  );
  return Accounts;
};
