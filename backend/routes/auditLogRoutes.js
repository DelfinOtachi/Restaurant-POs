// routes/auditLogRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/auditLogController');

router.get('/', ctrl.getAuditLogs);

module.exports = router;