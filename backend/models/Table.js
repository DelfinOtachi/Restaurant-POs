// models/Table.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Table 1"
    number: { type: Number, required: true }, // e.g., 1
    capacity: { type: Number, default: 4 }, // Number of seats
    location: { type: String, enum: ['bar', 'restaurant'], required: true }, // Where the table is
});

module.exports = mongoose.model('Table', tableSchema);