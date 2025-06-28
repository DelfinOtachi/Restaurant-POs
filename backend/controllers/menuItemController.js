// controllers/menuItemController.js
const MenuItem = require('../models/MenuItem');
exports.createMenuItem = async(req, res) => {
    try {
        const item = new MenuItem(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getMenuItems = async(req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateMenuItem = async(req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deleteMenuItem = async(req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};