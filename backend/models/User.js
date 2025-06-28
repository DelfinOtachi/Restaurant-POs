const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    idNumber: { type: String, required: true, unique: true },
    phone: String,
    email: { type: String, unique: true },
    password: { type: String, required: true }, // hash in backend

    // Controls system-level access
    authRole: {
        type: String,
        enum: ['superadmin', 'admin', 'user'],
        default: 'user',
        required: true
    },

    // Indicates if this user is also an employee
    isEmployee: {
        type: Boolean,
        default: false
    },

    // Only applicable if isEmployee === true
    jobRole: {
        type: String,
        enum: ['chef', 'waiter', 'cashier', 'manager', 'other', null],
        default: null
    },

    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', null],
        default: null
    },

    hireDate: {
        type: Date,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);