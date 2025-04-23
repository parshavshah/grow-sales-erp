"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SystemSetting extends Model {
    static associate(models) {}
  }
  SystemSetting.init(
    {
      settingKey: DataTypes.STRING,
      settingGroup: DataTypes.STRING,
      settingValue: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SystemSetting",
      paranoid: true,
      tableName: "systemsettings",
      timestamps: true,
    }
  );
  return SystemSetting;
};
