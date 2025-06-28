// controllers/menuController.js
const Menu = require('../models/Menu');

// GET all menu items
exports.getAllMenus = async(req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET single menu item
exports.getMenuById = async(req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ error: 'Menu not found' });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST create menu item
exports.createMenu = async(req, res) => {
    try {
        const newMenu = new Menu(req.body);
        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT update menu item
exports.updateMenu = async(req, res) => {
    try {
        const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Menu not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE remove menu item
exports.deleteMenu = async(req, res) => {
    try {
        const deleted = await Menu.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Menu not found' });
        res.json({ message: 'Menu deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};