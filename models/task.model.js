"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: DataTypes.TEXT,
      projectId: {
        type: DataTypes.INTEGER,
      },
      startDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      status: {
        type: DataTypes.STRING,
      },
      priority: {
        type: DataTypes.STRING,
      },
      progress: {
        type: DataTypes.INTEGER,
      },
      estimatedHours: DataTypes.FLOAT,
      assignedTo: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Task",
      paranoid: true,
      tableName: "tasks",
      timestamps: true,
    }
  );
  return Task;
};
