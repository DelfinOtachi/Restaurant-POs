// models/Ingredient.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemCode: { type: String, default: null, unique: true, sparse: true },
    unit: { type: String, required: true }, // e.g., kg, litre, pcs
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);