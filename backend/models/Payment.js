const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentId: { type: String, required: true, unique: true }, // e.g. "PAY-001"
    purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true }, // Linked to purchase
    paymentDate: { type: Date, required: true },
    amountPaid: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Bank', 'Mobile Pay', 'Cheque', 'Other'],
        required: true
    },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);