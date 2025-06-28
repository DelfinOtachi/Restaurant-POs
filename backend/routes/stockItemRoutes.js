// routes/stockItemRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockItemController');

// ✅ MOVE THIS ABOVE /:id
router.post('/log-usage/:itemId', controller.logUsage); // POST usage log entry for an item

// CRUD
router.get('/', controller.getAllStockItems); // GET all items
router.get('/:id', controller.getStockItemById); // GET single item by ID
router.post('/', controller.createOrUpdateStock); // POST new or updated item
router.delete('/:id', controller.deleteStockItem); // DELETE item by ID

// Alerts & reports
router.get('/alerts/low-stock', controller.getLowStockItems);
router.get('/alerts/expiring-soon', controller.getExpiringItems);

module.exports = router;