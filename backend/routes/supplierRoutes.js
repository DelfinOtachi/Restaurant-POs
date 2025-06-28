// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/supplierController');

router.post('/', ctrl.createSupplier);
router.get('/', ctrl.getAllSuppliers); // ✅ Fixed this line
router.get('/:id', ctrl.getSupplierById); // ✅ Add this too
router.put('/:id', ctrl.updateSupplier);
router.delete('/:id', ctrl.deleteSupplier);

module.exports = router;