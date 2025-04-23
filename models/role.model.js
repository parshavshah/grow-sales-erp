"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {}
  }
  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Role",
      paranoid: true,
      tableName: "roles",
      timestamps: true,
    }
  ).sync({ alter: true });
  return Role;
};
