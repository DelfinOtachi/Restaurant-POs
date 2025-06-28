const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/menuItemController');

router.post('/', ctrl.createMenuItem);
router.get('/', ctrl.getMenuItems);
router.put('/:id', ctrl.updateMenuItem);
router.delete('/:id', ctrl.deleteMenuItem);

module.exports = router;