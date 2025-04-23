"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeEntry extends Model {
    static associate(models) {
      
    }
  }
  TimeEntry.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
      },
      hours: {
        type: DataTypes.FLOAT,
      },
      description: DataTypes.TEXT,
      billable: {
        type: DataTypes.BOOLEAN,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "TimeEntry",
      paranoid: true,
      tableName: "timeentries",
      timestamps: true,
    }
  );
  return TimeEntry;
};
