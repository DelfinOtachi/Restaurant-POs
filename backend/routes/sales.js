const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Order = require('../models/Order');

router.post('/', async(req, res) => {
    try {
        const {
            orderId,
            amountPaid,
            discount = 0,
            totalAmountBeforeDiscount,
            paymentMethod,
            cashierName
        } = req.body;

        const totalAmount = totalAmountBeforeDiscount - discount;
        const change = amountPaid - totalAmount;

        // Update order status to "Paid"
        await Order.findByIdAndUpdate(orderId, { status: 'Paid' });

        const sale = new Sale({
            orderId,
            amountPaid,
            discount,
            totalAmountBeforeDiscount,
            totalAmount,
            change,
            paymentMethod,
            cashierName
        });

        await sale.save();

        res.status(201).json(sale);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET /api/sales — Get all sales
router.get('/', async(req, res) => {
    try {
        console.log("GET /api/sales called"); // Debug log
        const sales = await Sale.find().populate('orderId'); // Optional: populate order details
        res.status(200).json(sales);
    } catch (err) {
        console.error("❌ Error in GET /api/sales:", err.message);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;