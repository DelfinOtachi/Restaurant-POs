const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'FixedAsset', required: true }, // Link to asset
    date: { type: Date, default: Date.now },
    actionTaken: { type: String, required: true }, // e.g., "Cleaned", "Replaced parts"
    servicedBy: { type: String }, // Person/company that did the maintenance
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);