const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { protect } = require('../middlewares/authMiddleware');
const { productValidation } = require('../utils/validators');
const validateRequest = require('../middlewares/validateMiddleware');

const createProduct = require('../controllers/product/createProduct');
const getProducts = require('../controllers/product/getProducts');
const updateProduct = require('../controllers/product/updateProduct');
const deleteProduct = require('../controllers/product/deleteProduct');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/productImages/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.use(protect);
router.post('/', upload.single('image'), productValidation, validateRequest, createProduct);
router.get('/', getProducts);
router.put('/:id', upload.single('image'), productValidation, validateRequest, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
