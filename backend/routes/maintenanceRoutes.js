const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

// Maintenance Logs
router.post('/', maintenanceController.createMaintenance);
router.get('/', maintenanceController.getAllMaintenance);
router.get('/:id', maintenanceController.getMaintenanceById);
router.put('/:id', maintenanceController.updateMaintenance);
router.delete('/:id', maintenanceController.deleteMaintenance);

module.exports = router;