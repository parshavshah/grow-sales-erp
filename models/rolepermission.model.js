"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {}
  }
  RolePermission.init(
    {
      roleId: DataTypes.INTEGER,
      permissionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RolePermission",
      paranoid: true,
      tableName: "rolepermissions",
      timestamps: true,
    }
  ).sync({ alter: true });
  return RolePermission;
};
