"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskComment extends Model {
    static associate(models) {
    
    }
  }
  TaskComment.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.TEXT,
      },
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TaskComment",
      paranoid: true,
      tableName: "taskcomments",
      timestamps: true,
    }
  ).sync({ alter: true });
  return TaskComment;
};
