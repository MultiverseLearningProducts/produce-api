"use strict";

const { DataTypes, Sequelize } = require("sequelize");

const { MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
	dialect: "mysql",
	host: MYSQL_HOST,
	logging: process.env.NODE_ENV !== "production" && console.log,
});

const Produce = sequelize.define("Produce", {
	name: DataTypes.STRING,
	color: DataTypes.STRING,
	type: DataTypes.STRING,
});

module.exports = exports = { Produce, sequelize };
