"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {}
  }
  Permission.init(
    {
      code: DataTypes.STRING,
      module: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Permission",
      paranoid: true,
      tableName: "permissions",
      timestamps: true,
    }
  );
  return Permission;
};
