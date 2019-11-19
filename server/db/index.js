"use strict";

const Sequelize = require("sequelize");
const pkg = require("../package.json");

//create the database instance that can be used in other database files
module.exports = new Sequelize(`postgres://localhost:5432/${pkg.name}`);
