"use strict";

const express = require("express");
const { Produce, sequelize } = require("./sequelize");

const app = express();

app.set("json spaces", "\t");
app.use(express.json());

app.post("/", async (req, res, next) => {
	try {
		const item = await Produce.create(req.body);
		res.status(201).send(item);
	} catch (err) {
		next(err);
		res.status(500).send({ error: err.message });
	}
});

app.get("/", async (req, res, next) => {
	try {
		const items = await Produce.findAll();
		res.send(items);
	} catch (err) {
		next(err);
		res.status(500).send({ error: err.message });
	}
});

app.get("/:id", async (req, res, next) => {
	try {
		const item = await Produce.findByPk(req.params.id);

		if (!item) {
			res.status(404).send({});
			return;
		}

		res.send(item);
	} catch (err) {
		next(err);
		res.status(500).send({ error: err.message });
	}
});

app.patch("/:id", async (req, res, next) => {
	try {
		let item = await Produce.findByPk(req.params.id);

		if (!item) {
			res.status(404).send({});
			return;
		}

		item = await item.update(req.body);
		res.send(item);
	} catch (err) {
		next(err);
		res.status(500).send({ error: err.message });
	}
});

app.delete("/:id", async (req, res, next) => {
	try {
		let item = await Produce.findByPk(req.params.id);

		if (!item) {
			res.status(404).send({});
			return;
		}

		item = await item.destroy();
		res.send({});
	} catch (err) {
		next(err);
		res.status(500).send({ error: err.message });
	}
});

const PORT = 3000;

app.listen(PORT, async () => {
	await sequelize.sync();
	console.log(`Listening on port ${PORT}`);
});
