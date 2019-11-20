"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {}

  Artist.init(
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
      style: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: false
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [1, 250]
        },
        unique: false
      },
      interests: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [1, 250]
        },
        unique: false
      },
      profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 250]
        },
        unique: false
      }
    },
    {
      sequelize,
      modelName: "Artist"
    }
  );

  Artist.associate = models => {
    // associations can be defined here

    models.Artist.hasMany(models.Portfolio);
  };

  return Artist;
};
