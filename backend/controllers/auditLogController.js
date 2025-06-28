const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async(req, res) => {
    try {
        const logs = await AuditLog.find().sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};