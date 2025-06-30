const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    stockItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockItem',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
        unique: true, // 1 recipe per menu item
    },
    ingredients: [ingredientSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);