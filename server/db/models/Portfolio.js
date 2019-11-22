"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {}

  Portfolio.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: false
      },
      location: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Portfolio"
    }
  );

  Portfolio.associate = models => {
    // associations can be defined here

    Portfolio.belongsTo(models.Artist); // Will add artistId to Portfolio model
    models.Style.hasOne(Portfolio); //`styleId` will be added on Portfolio model
  };

  return Portfolio;
};
