"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    static associate(models) {}
  }
  ToDo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ToDo",
      paranoid: true,
      tableName: "todos",
      timestamps: true,
    }
  ).sync({ alter: true });
  return ToDo;
};
