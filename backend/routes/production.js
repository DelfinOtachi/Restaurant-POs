// STEP 2: Production Logging Route
// routes/production.js
const express = require('express');
const router = express.Router();
const StockItem = require('../models/StockItem');
const Recipe = require('../models/Recipe');

router.post('/', async(req, res) => {
    const { productId, quantityProduced, preparedBy, note } = req.body;

    try {
        const recipe = await Recipe.findOne({ productId }).populate('ingredients.ingredientId');
        const productStock = await StockItem.findById(productId);

        if (!productStock) return res.status(404).json({ error: 'Product not found' });

        // Check if item is a recipe-based product or ready-made (final product)
        if (!recipe) {
            // No recipe: just add to stock as purchased/prepared manually
            productStock.purchases += quantityProduced;
            productStock.closingStock += quantityProduced;
            productStock.totalValue = productStock.closingStock * productStock.unitPrice;
            productStock.lastUpdated = new Date();
            await productStock.save();
            return res.json({ message: '✅ Stock updated for ready-made product' });
        }

        // Deduct ingredients from stock
        for (const ing of recipe.ingredients) {
            const ingredientStock = await StockItem.findById(ing.ingredientId._id);
            const totalUsed = ing.quantity * quantityProduced;

            if (!ingredientStock) continue;

            ingredientStock.usage += totalUsed;
            ingredientStock.closingStock -= totalUsed;
            ingredientStock.totalValue = ingredientStock.closingStock * ingredientStock.unitPrice;

            ingredientStock.usageLogs.push({
                used: totalUsed,
                purpose: `Production of ${quantityProduced} units of ${productStock.itemCode}`,
                usedBy: preparedBy,
                note,
                date: new Date()
            });

            await ingredientStock.save();
        }

        // Update final product stock
        productStock.purchases += quantityProduced;
        productStock.closingStock += quantityProduced;
        productStock.totalValue = productStock.closingStock * productStock.unitPrice;
        productStock.lastUpdated = new Date();

        await productStock.save();

        res.json({ message: '✅ Production logged successfully' });
    } catch (err) {
        console.error('❌ Error:', err);
        res.status(500).json({ error: 'Failed to log production' });
    }
});

module.exports = router;