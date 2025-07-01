const StockItem = require('../models/StockItem');

// Get all stock items
exports.getAllStockItems = async (req, res) => {
  try {
    const items = await StockItem.find().populate('categoryId supplierId menuID');
    res.json(items);
  } catch (err) {
    console.error('❌ Error in getAllStockItems:', err);
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
// POST /api/stocks/:id/log - Add a usage log entry
// POST /api/stocks/:id/log - Add a usage log entry
exports.addUsageLog = async (req, res) => {
  try {
    const item = await StockItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const { quantity, type, referenceId, referenceType, note, usedBy } = req.body;
    const qty = Number(quantity); // original value
    const absQty = Math.abs(qty); // enforce positive where needed

    const log = {
      quantity: qty,
      type,
      //referenceId,
      //referenceType,
      note,
      usedBy,
      date: new Date(),
    };
    //Only add referenceId if it's a valid ObjectId string
if (referenceId && mongoose.Types.ObjectId.isValid(referenceId)) {
  log.referenceId = referenceId;
}

// Only add referenceType if provided
if (referenceType) {
  log.referenceType = referenceType;
}

    item.usageLogs.push(log);

    if (type === 'sale' || type === 'wastage') {
      item.usage += absQty;
    } else if (type === 'restock') {
      item.purchases += absQty;
    } else if (type === 'correction') {
      item.closingStock += qty; // correction can go either direction
    }

    // Recalculate closingStock and totalValue
    item.closingStock = item.openingStock + item.purchases - item.usage;
    item.totalValue = item.closingStock * item.unitPrice;
    item.lastUpdated = new Date();

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err); // helpful for debugging
    res.status(400).json({ error: err.message });
  }
};
