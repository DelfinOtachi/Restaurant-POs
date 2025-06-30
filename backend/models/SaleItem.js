const saleItemSchema = new mongoose.Schema({
    saleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale' },
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
        createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('SaleItem', saleItemSchema);
