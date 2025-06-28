const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactPerson: String,
    phone: String,
    email: String,
    address: String, // ✅ Added this field
    category: String, // e.g. 'Food Supplies', 'Drinks', 'Equipment'
    paymentTerms: String, // e.g. '7 days', 'Cash on Delivery'
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);