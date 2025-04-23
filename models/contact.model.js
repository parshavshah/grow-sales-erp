"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {}
  }
  Contact.init(
    {
      accountId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      department: DataTypes.STRING,
      assignedTo: DataTypes.INTEGER,
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
      leadStatus: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Contact",
      paranoid: true,
      tableName: "contacts",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Contact;
};
