const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    balance: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Part Paid', 'Unpaid'], default: 'Unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);