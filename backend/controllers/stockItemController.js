const StockItem = require('../models/StockItem');

// Create or Update stock
exports.createOrUpdateStock = async(req, res) => {
    try {
        const {
            itemCode,
            itemId,
            categoryId,
            supplierId,
            unit,
            openingStock = 0,
            purchases = 0,
            usage = 0,
            reorderLevel,
            lowStockAlert,
            unitPrice,
            expiryDate,
            type
        } = req.body;

        const closingStock = openingStock + purchases - usage;
        const totalValue = closingStock * unitPrice;

        const updatedStock = await StockItem.findOneAndUpdate({ itemCode }, {
            itemCode,
            itemId,
            categoryId,
            supplierId,
            unit,
            openingStock,
            purchases,
            usage,
            closingStock,
            reorderLevel,
            lowStockAlert,
            unitPrice,
            totalValue,
            expiryDate,
            type,
            lastUpdated: new Date()
        }, { new: true, upsert: true });

        res.json(updatedStock);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all stock items
exports.getAllStockItems = async(req, res) => {
    try {
        const {
            search,
            categoryId,
            supplierId,
            fromDate,
            toDate,
            page = 1,
            limit = 20
        } = req.query;

        const query = {};
        if (search) query.itemCode = { $regex: search, $options: 'i' };
        if (categoryId) query.categoryId = categoryId;
        if (supplierId) query.supplierId = supplierId;
        if (fromDate || toDate) {
            query.lastUpdated = {};
            if (fromDate) query.lastUpdated.$gte = new Date(fromDate);
            if (toDate) query.lastUpdated.$lte = new Date(toDate);
        }

        const totalItems = await StockItem.countDocuments(query);
        const items = await StockItem.find(query)
            .populate('itemId categoryId supplierId')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            totalItems,
            currentPage: Number(page),
            totalPages: Math.ceil(totalItems / limit),
            items
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stock items' });
    }
};

// Get one stock item
exports.getStockItemById = async(req, res) => {
    try {
        const item = await StockItem.findById(req.params.id).populate('itemId categoryId supplierId');
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stock item' });
    }
};

// Delete stock item
exports.deleteStockItem = async(req, res) => {
    try {
        const deletedItem = await StockItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted', deletedItem });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};

// Items with low stock
exports.getLowStockItems = async(req, res) => {
    try {
        const items = await StockItem.find({
            $expr: { $lte: ["$closingStock", "$lowStockAlert"] }
        });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch low stock items' });
    }
};

// Items expiring soon
exports.getExpiringItems = async(req, res) => {
    try {
        const today = new Date();
        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const items = await StockItem.find({
            expiryDate: { $lte: next7Days, $gte: today }
        });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch expiring items' });
    }
};

// Log usage (deduct if not ingredient)
exports.logUsage = async(req, res) => {
    const { itemId } = req.params;
    const { used = 0, spoiled = 0, purpose, usedBy, note } = req.body;
    const quantityUsed = used + spoiled;

    try {
        const item = await StockItem.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.usageLogs.push({
            used,
            spoiled,
            purpose,
            usedBy,
            note,
            date: new Date()
        });

        if (item.type !== 'ingredient') {
            item.usage += quantityUsed;
            item.closingStock -= quantityUsed;
            item.totalValue = item.closingStock * item.unitPrice;
        }

        item.lastUpdated = new Date();
        await item.save();

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to log usage' });
    }
};