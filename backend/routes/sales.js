const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Order = require('../models/Order');
const StockItem = require('../models/StockItem');

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

        // 1. Validate order
        const order = await Order.findById(orderId).populate('items.menuItem');
        if (!order) return res.status(404).json({ error: 'Order not found' });

        // 2. Prevent duplicate payment
        if (order.status === 'Paid') {
            return res.status(400).json({ error: 'Order is already paid' });
        }

        // 3. Validate payment
        const totalAmount = totalAmountBeforeDiscount - discount;
        if (amountPaid < totalAmount) {
            return res.status(400).json({
                error: `Insufficient payment. Required: $${totalAmount.toFixed(2)}, Paid: $${amountPaid.toFixed(2)}`
            });
        }

        // 4. Deduct sold stock (for produced/finalProduct only)
        for (const item of order.items) {
            const menuItem = item.menuItem;
            const quantitySold = item.quantity;

            const stockItem = await StockItem.findOne({ itemId: menuItem._id });
            if (!stockItem) {
                console.warn(`⚠️ No stock record found for menu item: ${menuItem.name}`);
                continue; // Optionally throw error instead
            }

            // Only deduct final or produced products
            if (stockItem.type === 'finalProduct' || stockItem.type === 'produced') {
                stockItem.usage += quantitySold;
                stockItem.closingStock -= quantitySold;
                stockItem.totalValue = stockItem.closingStock * stockItem.unitPrice;

                stockItem.usageLogs.push({
                    used: quantitySold,
                    spoiled: 0,
                    purpose: 'Sold',
                    usedBy: cashierName,
                    note: `Order ${orderId}`
                });

                stockItem.lastUpdated = new Date();
                await stockItem.save();
            }
        }

        // 5. Save Sale
        const sale = new Sale({
            orderId,
            amountPaid,
            discount,
            totalAmountBeforeDiscount,
            totalAmountAfterDiscount: totalAmount,
            paymentMethod,
            cashierName
        });
        await sale.save();

        // 6. Mark order paid
        order.status = 'Paid';
        await order.save();

        res.status(201).json({ message: '✅ Sale recorded and stock updated', sale });

    } catch (err) {
        console.error("❌ Error recording sale:", err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 🔍 Get all sales
router.get('/', async(req, res) => {
    try {
        const sales = await Sale.find().populate('orderId');
        res.status(200).json(sales);
    } catch (err) {
        console.error("❌ Error fetching sales:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;