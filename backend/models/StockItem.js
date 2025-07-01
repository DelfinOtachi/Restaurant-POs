const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return this.type === 'correction' || v >= 0;
      },
      message: 'Quantity must be non-negative unless it is a correction.'
    }
  },
  type: { type: String, enum: ['sale', 'restock', 'wastage', 'correction'], required: true },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false, // 👈 this makes it optional
    default: null     // 👈 and prevents casting "" to ObjectId
  },
  referenceType: { type: String, default: null },
  note: String,
  usedBy: String
}, { _id: false });


const stockItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemCode: { type: String, unique: true, sparse: true },
    unit: { type: String, required: true },


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
    menuID: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Menu' // this should match the name used in mongoose.model('Menu', ...)
},
 menuItemID: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'MenuItem' // this should match the name used in mongoose.model('Menu', ...)
},


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
