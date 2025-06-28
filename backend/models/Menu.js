const mongoose = require('mongoose');
//bar and kitchen menu
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    slug: String,
});

module.exports = mongoose.model('Menu', menuSchema);