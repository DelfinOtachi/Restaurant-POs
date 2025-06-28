// controllers/tableController.js
const Table = require('../models/Table');

exports.createTable = async(req, res) => {
    try {
        const table = new Table(req.body);
        await table.save();
        res.status(201).json(table);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTables = async(req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTable = async(req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(table);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTable = async(req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};