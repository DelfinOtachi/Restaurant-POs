const StockItem = require('../models/StockItem');

// Get all stock items
exports.getAllStockItems = async (req, res) => {
    const items = await StockItem.find().populate('categoryId supplierId menuID');
    res.json(items);
};

// Create new stock item
exports.createStockItem = async (req, res) => {
    try {
        const item = new StockItem(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update stock item
exports.updateStockItem = async (req, res) => {
    try {
        const item = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete stock item
exports.deleteStockItem = async (req, res) => {
    const result = await StockItem.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
};
