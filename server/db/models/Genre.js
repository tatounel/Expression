"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {}

  Genre.init(
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
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Genre"
    }
  );

  Genre.associate = models => {
    // associations can be defined here
  };

  return Genre;
};
