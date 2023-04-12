"use strict";

const path = require("path");
const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	dialect: "sqlite",
	logging: process.env.NODE_ENV !== "production" && console.log,
	storage: path.join(__dirname, "db.sqlite"),
});

const Produce = sequelize.define("Produce", {
	name: DataTypes.STRING,
	color: DataTypes.STRING,
	type: DataTypes.STRING,
});

module.exports = exports = { Produce, sequelize };
