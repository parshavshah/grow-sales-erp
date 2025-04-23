"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {
     
    }
  }
  ProjectMember.init(
    {
      projectId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      role: DataTypes.STRING,
      joinedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ProjectMember",
      paranoid: true,
      tableName: "projectmembers",
      timestamps: true,
    }
  ).sync({ alter: true });
  return ProjectMember;
};
