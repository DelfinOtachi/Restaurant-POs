const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    used: { type: Number, default: 0 },
    spoiled: { type: Number, default: 0 },
    purpose: String,
    usedBy: String,
    note: String
}, { _id: false });

const stockItemSchema = new mongoose.Schema({
    itemCode: { type: String, default: null, sparse: true, unique: true }, // ✅ unique when not null

    itemId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },

    unit: { type: String, required: true },
    openingStock: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    closingStock: { type: Number, default: 0 },

    reorderLevel: Number,
    lowStockAlert: Number,
    unitPrice: Number,
    totalValue: Number,
    expiryDate: Date,
    type: {
        type: String,
        enum: ['ingredient', 'packaging', 'finalProduct', 'misc'],
        required: true,
    },

    lastUpdated: { type: Date, default: Date.now },

    usageLogs: [usageLogSchema]
});

module.exports = mongoose.model('StockItem', stockItemSchema);