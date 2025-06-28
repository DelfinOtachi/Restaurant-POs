const express = require('express');
const router = express.Router();
const fixedAssetsController = require('../controllers/fixedAssetController');


// Main CRUD
router
    .route('/')
    .get(fixedAssetsController.getAllAssets)
    .post(fixedAssetsController.createAsset);

router
    .route('/:id')
    .get(fixedAssetsController.getAssetById)
    .put(fixedAssetsController.updateAsset)
    .delete(fixedAssetsController.deleteAsset);

// Maintenance
router
    .route('/:id/maintenance')
    .get(fixedAssetsController.getAssetMaintenance)
    .post(fixedAssetsController.addMaintenanceEntry);

// Summary
router.get('/summary/by-category', fixedAssetsController.getAssetSummaryByCategory);
router.get('/summary/by-location', fixedAssetsController.getAssetSummaryByLocation);


module.exports = router;