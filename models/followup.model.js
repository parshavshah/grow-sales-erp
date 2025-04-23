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
      status: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      completedAt: DataTypes.DATE,
      assignedTo: DataTypes.INTEGER,
      dueDate: DataTypes.DATE,
      isResolved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Followup",
      paranoid: true,
      tableName: "followups",
      timestamps: true,
    }
  );
  return Followup;
};
