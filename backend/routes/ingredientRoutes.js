// routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// Create
router.post('/', async(req, res) => {
    try {
        const ingredient = new Ingredient(req.body);
        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all
router.get('/', async(req, res) => {
    const ingredients = await Ingredient.find().populate('categoryId');
    res.json(ingredients);
});

module.exports = router;