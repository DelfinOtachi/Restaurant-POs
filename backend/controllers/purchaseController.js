// controllers/purchaseController.js
const Purchase = require('../models/Purchase');

exports.createPurchase = async(req, res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).json(purchase);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllPurchases = async(req, res) => {
    try {
        const purchases = await Purchase.find().populate('supplier');
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get one asset by ID
exports.getPurchaseById = async(req, res) => {
    try {
        const asset = await Purchase.findById(req.params.id);
        if (!asset) return res.status(404).json({ message: 'Purchase not found' });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePurchase = async(req, res) => {
    try {
        const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(purchase);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePurchase = async(req, res) => {
    try {
        await Purchase.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};