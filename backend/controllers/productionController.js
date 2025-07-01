// controllers/productionController.js
const Recipe = require('../models/Recipe');
const StockItem = require('../models/StockItem');

exports.produceMenuItem = async (req, res) => {
  try {
    const { menuItemId, quantity = 1, preparedBy } = req.body;

    const recipe = await Recipe.findOne({ menuItemId }).populate('ingredients.stockItemId');
    if (!recipe) return res.status(404).json({ error: 'Recipe not found for this menu item' });

    for (const ingredient of recipe.ingredients) {
      const stockItem = ingredient.stockItemId;
      const totalQty = ingredient.quantity * quantity;

      stockItem.usage += totalQty;
      stockItem.usageLogs.push({
        quantity: totalQty,
        type: 'sale', // or "production"
        referenceId: menuItemId,
        referenceType: 'Production',
        note: `Used in producing menu item`,
        usedBy: preparedBy || 'System',
        date: new Date(),
      });

      stockItem.closingStock = stockItem.openingStock + stockItem.purchases - stockItem.usage;
      stockItem.totalValue = stockItem.closingStock * stockItem.unitPrice;
      stockItem.lastUpdated = new Date();

      await stockItem.save();
    }

    res.status(200).json({ message: 'Production successful and stock updated' });
  } catch (err) {
    console.error('Production error:', err);
    res.status(500).json({ error: 'Failed to produce item' });
  }
};
