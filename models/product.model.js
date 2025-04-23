"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {}
  }
  Product.init(
    {
      name: DataTypes.STRING,
      sku: DataTypes.STRING,
      shortDescription: DataTypes.STRING,
      price: DataTypes.FLOAT,
      unit: DataTypes.STRING,
      type: DataTypes.INTEGER,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      paranoid: true,
      tableName: "products",
      timestamps: true,
    }
  );
  return Product;
};
