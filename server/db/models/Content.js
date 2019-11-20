"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {}

  Content.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true
        },
        unique: false
      },
      text: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true
        },
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Content"
    }
  );

  Content.associate = models => {
    // associations can be defined here

    Content.belongsTo(models.Author); // Will add authorId to Content model
    models.Genre.hasOne(Content); //`genreId` will be added on Content model
  };

  return Content;
};
