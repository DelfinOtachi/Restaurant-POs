const Maintenance = require('../models/Maintenance');

exports.createMaintenance = async(req, res) => {
    try {
        const maintenance = await Maintenance.create(req.body);
        res.status(201).json(maintenance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllMaintenance = async(req, res) => {
    try {
        const logs = await Maintenance.find().populate('assetId', 'itemName');
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMaintenanceById = async(req, res) => {
    try {
        const log = await Maintenance.findById(req.params.id).populate('assetId', 'itemName');
        if (!log) return res.status(404).json({ error: 'Log not found' });
        res.json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMaintenance = async(req, res) => {
    try {
        const log = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!log) return res.status(404).json({ error: 'Log not found' });
        res.json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteMaintenance = async(req, res) => {
    try {
        const log = await Maintenance.findByIdAndDelete(req.params.id);
        if (!log) return res.status(404).json({ error: 'Log not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};