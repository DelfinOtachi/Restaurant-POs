const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/', stockController.getAllStockItems);
router.post('/', stockController.createStockItem);
router.put('/:id', stockController.updateStockItem);
router.delete('/:id', stockController.deleteStockItem);

module.exports = router;
