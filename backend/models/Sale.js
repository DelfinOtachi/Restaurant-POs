const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    totalAmountBeforeDiscount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Mobile Money', 'Bank Transfer', 'Other'], // ❌ 'a['Cash'..]' was invalid
        required: true
    },
    cashierName: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sale', saleSchema);