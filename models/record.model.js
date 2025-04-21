"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {}
  }
  Record.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Record",
      paranoid: true,
      tableName: "records",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Record;
};
