// models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,
    itemAffected: String,
    timestamp: { type: Date, default: Date.now },
    details: String
});

module.exports = mongoose.model('AuditLog', auditLogSchema);