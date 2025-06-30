const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    quantity: Number,
    type: { type: String, enum: ['sale', 'restock', 'wastage', 'correction'], required: true },
    referenceId: mongoose.Schema.Types.ObjectId,
    referenceType: String,
    note: String,
    usedBy: String
}, { _id: false });

const stockItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemCode: { type: String, unique: true, sparse: true },
    unit: { type: String, required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },

    openingStock: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    usage: { type: Number, default: 0 },
    closingStock: { type: Number, default: 0 },

    unitPrice: { type: Number, default: 0 },
    totalValue: { type: Number, default: 0 },
    expiryDate: Date,
    reorderLevel: Number,
    lowStockAlert: Number,

    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },

    type: { type: String, enum: ['ingredient', 'packaging', 'finalProduct', 'misc'], required: true },
    usageLogs: [usageLogSchema],
    lastUpdated: { type: Date, default: Date.now }
});

stockItemSchema.pre('save', function (next) {
    this.closingStock = this.openingStock + this.purchases - this.usage;
    this.totalValue = this.closingStock * this.unitPrice;
    next();
});

module.exports = mongoose.model('StockItem', stockItemSchema);
