const express = require('express');
const router = express.Router();

const purchaseController = require('../controllers/purchaseController');
const paymentController = require('../controllers/paymentController');

// --- PURCHASE ROUTES ---
router.post('/purchases', purchaseController.createPurchase);
router.get('/purchases', purchaseController.getAllPurchases);
router.get('/purchases/:id', purchaseController.getPurchaseById);
router.put('/purchases/:id', purchaseController.updatePurchase);
router.delete('/purchases/:id', purchaseController.deletePurchase);

// --- PAYMENT ROUTES ---
router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getAllPayments);
router.get('/payments/:id', paymentController.getPaymentById);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);



module.exports = router;