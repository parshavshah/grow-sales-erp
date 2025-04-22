"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    static associate(models) {}
  }
  Lead.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      company: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      leadSource: DataTypes.STRING,
      industry: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      country: DataTypes.STRING,
      description: DataTypes.STRING,
      assignedTo: DataTypes.INTEGER,
      lastActivity: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lead",
      paranoid: true,
      tableName: "leads",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Lead;
};
