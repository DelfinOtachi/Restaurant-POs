const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
    itemCode: { type: String, default: null },
    name: { type: String, required: true },
    price: Number,
    type: {
        type: String,
        enum: ['finalProduct', 'composite'],
        default: 'composite'
    },
    stockItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockItem',
        required: function() {
            return this.type === 'finalProduct';
        }
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    available: { type: Boolean, default: true }
});


module.exports = mongoose.model('MenuItem', menuItemSchema);