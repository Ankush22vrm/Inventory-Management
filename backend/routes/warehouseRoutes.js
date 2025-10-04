const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { warehouseValidation } = require('../utils/validators');
const validateRequest = require('../middlewares/validateMiddleware');

const createWarehouse = require('../controllers/warehouse/createWarehouse');
const getWarehouses = require('../controllers/warehouse/getWarehouses');
const updateWarehouse = require('../controllers/warehouse/updateWarehouse');
const deleteWarehouse = require('../controllers/warehouse/deleteWarehouse');

router.use(protect);
router.post('/', warehouseValidation, validateRequest, createWarehouse);
router.get('/', getWarehouses);
router.put('/:id', warehouseValidation, validateRequest, updateWarehouse);
router.delete('/:id', deleteWarehouse);

module.exports = router;
