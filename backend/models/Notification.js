// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: String,
    type: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);