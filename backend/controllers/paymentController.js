const Payment = require('../models/Payment');

// Get all payments
exports.getAllPayments = async(req, res) => {
    try {
        const payments = await Payment.find().populate('supplier');
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get one payment
exports.getPaymentById = async(req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('supplier');
        if (!payment) return res.status(404).json({ message: 'Not found' });
        res.json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new payment
exports.createPayment = async(req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update payment
exports.updatePayment = async(req, res) => {
    try {
        const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete payment
exports.deletePayment = async(req, res) => {
    try {
        const deleted = await Payment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};