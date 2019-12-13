"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Style extends Model {}

  Style.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        },
        unique: false
      }
    },
    {
      sequelize,
      modelName: "Style"
    }
  );

  Style.associate = models => {
    // associations can be defined here
  };

  return Style;
};
