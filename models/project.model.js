"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
      },
      priority: {
        type: DataTypes.STRING,
      },
      progress: {
        type: DataTypes.INTEGER,
      },
      budget: DataTypes.FLOAT,
      accountId: {
        type: DataTypes.INTEGER,
      },
      assignedTo: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Project",
      paranoid: true,
      tableName: "projects",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Project;
};
