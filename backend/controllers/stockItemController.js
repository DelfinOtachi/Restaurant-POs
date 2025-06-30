const StockItem = require('../models/StockItem');

// Get all stock items
exports.getAllStockItems = async (req, res) => {
    try {
        const items = await StockItem.find().populate('categoryId supplierId menuId');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching stock items' });
    }
};

// Create new stock item
exports.createStockItem = async (req, res) => {
    try {
        const item = new StockItem(req.body);

        // closingStock & totalValue are handled by pre-save hook
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update stock item
exports.updateStockItem = async (req, res) => {
    try {
        const existingItem = await StockItem.findById(req.params.id);
        if (!existingItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Merge updates from request
        Object.assign(existingItem, req.body);

        // Recalculate stock & value manually (hook doesn't run on update)
        existingItem.closingStock = existingItem.openingStock + existingItem.purchases - existingItem.usage;
        existingItem.totalValue = existingItem.closingStock * existingItem.unitPrice;
        existingItem.lastUpdated = new Date();

        await existingItem.save();
        res.json(existingItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete stock item
exports.deleteStockItem = async (req, res) => {
    try {
        const result = await StockItem.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error while deleting stock item' });
    }
};
