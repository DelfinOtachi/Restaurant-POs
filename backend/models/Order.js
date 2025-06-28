const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        default: null
    },
    noOfPersons: Number,
    waitressName: String,
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Completed', 'Cancelled'],
        default: 'Pending'
    },

    cancelReason: { type: String },
    cancelledAt: { type: Date },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);