// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tableController');

router.post('/', ctrl.createTable);
router.get('/', ctrl.getTables);
router.put('/:id', ctrl.updateTable);
router.delete('/:id', ctrl.deleteTable);

module.exports = router;