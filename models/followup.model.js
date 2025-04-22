"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Followup extends Model {
    static associate(models) {}
  }
  Followup.init(
    {
      entityType: DataTypes.STRING,
      entityId: DataTypes.INTEGER,
      followUpType: DataTypes.STRING,
      subject: DataTypes.STRING,
      description: DataTypes.STRING,
      outcome: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      completedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Followup",
      paranoid: true,
      tableName: "followups",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Followup;
};
