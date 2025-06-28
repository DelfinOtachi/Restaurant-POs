const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensure one-to-one link with User
    },
    position: {
        type: String,
        enum: ['admin', 'cashier', 'chef', 'waiter', 'manager', 'other'],
        required: true
    },
    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract'],
        default: 'full-time'
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);