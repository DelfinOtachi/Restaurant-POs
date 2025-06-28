const FixedAsset = require('../models/FixedAsset');

// Create new fixed asset
exports.createAsset = async(req, res) => {
    try {
        const asset = new FixedAsset(req.body);
        await asset.save();
        res.status(201).json(asset);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all fixed assets
exports.getAllAssets = async(req, res) => {
    try {
        const assets = await FixedAsset.find();
        res.json(assets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one asset by ID
exports.getAssetById = async(req, res) => {
    try {
        const asset = await FixedAsset.findById(req.params.id);
        if (!asset) return res.status(404).json({ message: 'Asset not found' });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update asset
exports.updateAsset = async(req, res) => {
    try {
        const updated = await FixedAsset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Asset not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete asset
exports.deleteAsset = async(req, res) => {
    try {
        const deleted = await FixedAsset.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Asset not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAssetSummaryByCategory = async(req, res) => {
    try {
        const summary = await FixedAsset.aggregate([
            { $group: { _id: "$category", total: { $sum: 1 } } }
        ]);
        res.json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAssetSummaryByLocation = async(req, res) => {
    try {
        const summary = await FixedAsset.aggregate([
            { $group: { _id: "$location", total: { $sum: 1 } } }
        ]);
        res.json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};exports.getAssetMaintenance = async (req, res) => {
    res.status(200).json({ message: 'Maintenance data not implemented yet' });
};

exports.addMaintenanceEntry = async (req, res) => {
    res.status(201).json({ message: 'Add maintenance entry not implemented yet' });
};
