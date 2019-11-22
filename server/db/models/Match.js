"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {}

  Match.init(
    {},
    {
      sequelize,
      modelName: "Match"
    }
  );

  Match.associate = models => {
    // associations can be defined here
    Match.belongsTo(models.Author); // Will add authorId to Match model
    Match.belongsTo(models.Artist); // Will add artistId to Match model
  };

  return Match;
};
