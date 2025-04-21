"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      lastLogin: DataTypes.DATE,
      status: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      tableName: "users",
      timestamps: true,
    }
  ).sync({ alter: true });
  return User;
};
