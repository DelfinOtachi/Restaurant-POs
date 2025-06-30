const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// 🔄 Create or Update a Recipe
router.post('/:menuItemId', async(req, res) => {
    try {
        const { ingredients } = req.body;
        const { menuItemId } = req.params;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: 'Ingredients are required' });
        }

        const recipe = await Recipe.findOneAndUpdate({ menuItemId }, { menuItemId, ingredients }, { new: true, upsert: true });

        res.status(200).json({ message: '✅ Recipe saved', recipe });
    } catch (err) {
        console.error("❌ Error saving recipe:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 📄 Get recipe for a menu item
router.get('/:menuItemId', async(req, res) => {
    try {
        const recipe = await Recipe.findOne({ menuItemId }).populate('ingredients.stockItemId');
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
});

module.exports = router;