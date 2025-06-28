const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust the path as needed

// Get all orders
router.get('/', async(req, res) => {
    try {
        const orders = await Order.find().populate('tableId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one order by ID
router.get('/:id', async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('tableId');
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new order
router.post('/', async(req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an order
router.put('/:id', async(req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an order
router.delete('/:id', async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mark order as paid (payment handling)
router.put('/:id/pay', async(req, res) => {
    try {
        const { amountPaid, paymentMethod } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        if (amountPaid < order.totalAmount) {
            return res.status(400).json({ error: 'Amount paid is less than total due' });
        }

        const change = amountPaid - order.totalAmount;

        order.amountPaid = amountPaid;
        order.change = change;
        order.paymentMethod = paymentMethod;
        order.status = 'Completed'; // You can change to 'Paid' if you update the enum
        order.paidAt = new Date();

        await order.save();
        res.json({ message: 'Payment processed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;