// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async(req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOrders = async(req, res) => {
    try {
        const orders = await Order.find().populate('items.menuItem');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOrderStatus = async(req, res) => {
    try {
        const { status, cancelReason } = req.body;
        const updateData = { status };

        if (status === 'Cancelled') {
            updateData.cancelReason = cancelReason || 'No reason provided';
            updateData.cancelledAt = new Date();
        }

        const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteOrder = async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};