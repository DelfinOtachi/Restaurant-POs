// routes/purchaseRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/purchaseController');

router.post('/', ctrl.createPurchase);
router.get('/', ctrl.getAllPurchases);
router.put('/:id', ctrl.updatePurchase);
router.delete('/:id', ctrl.deletePurchase);

module.exports = router;