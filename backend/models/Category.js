// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    subcategories: [String]
});

module.exports = mongoose.model('Category', categorySchema);