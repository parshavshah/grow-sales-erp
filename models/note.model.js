"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {}
  }
  Note.init(
    {
      entityType: DataTypes.STRING,
      entityId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Note",
      paranoid: true,
      tableName: "notes",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Note;
};
