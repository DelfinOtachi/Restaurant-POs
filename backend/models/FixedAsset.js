const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    actionTaken: String,
    servicedBy: String,
    notes: String,
}, { _id: false });

const fixedAssetSchema = new mongoose.Schema({
    serialNumber: String,
    itemName: String,
    category: String,
    purchaseDate: Date,
    purchaseCost: Number,
    location: String,
    condition: String,
    estimatedLifespan: String,
    issuedTo: String,
    authorizedBy: String,
    notes: String,
    maintenanceLog: [maintenanceSchema]
}, { timestamps: true });

module.exports = mongoose.model('FixedAsset', fixedAssetSchema);