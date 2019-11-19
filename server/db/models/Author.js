"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {}

  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          len: [4, 250],
          notEmpty: true
        },
        unique: true
      },
      genre: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: false
      },
      bio: {
        type: DataTypes.TEXT,
        validate: {
          len: [1, 250],
          notEmpty: false
        },
        unique: false
      },
      interests: {
        type: DataTypes.TEXT,
        validate: {
          len: [1, 250],
          notEmpty: false
        },
        unique: false
      },
      profile_pic: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: false
        },
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Author"
    }
  );

  Author.associate = models => {
    // associations can be defined here

    models.Author.hasMany(models.Content);
  };

  return Author;
};
