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
  );
  return Note;
};
