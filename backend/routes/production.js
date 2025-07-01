// routes/production.js
const express = require('express');
const router = express.Router();
const { produceMenuItem } = require('../controllers/productionController');

router.post('/', produceMenuItem); // POST /api/production

module.exports = router;
