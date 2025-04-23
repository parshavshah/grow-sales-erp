"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    static associate(models) {
      // Define associations here
      ProjectMember.belongsTo(models.Project, {
        foreignKey: "projectId",
        as: "project",
      });
      ProjectMember.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
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
