const Product = require('../../models/Product');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Product not found' });
    }

    // Verify ownership by warehouse user
    if (String(product.warehouse) !== req.body.warehouseId)
      return res.status(403).json({ message: 'Unauthorized' });

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.inStock = req.body.inStock !== undefined ? (req.body.inStock === 'true' || req.body.inStock === true) : product.inStock;
    product.quantity = req.body.quantity !== undefined ? Number(req.body.quantity) : product.quantity;
    product.pricePerUnit = req.body.pricePerUnit !== undefined ? Number(req.body.pricePerUnit) : product.pricePerUnit;

    if (req.file) {
      const oldImagePath = path.join(__dirname, '../../', product.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      product.imageUrl = `/uploads/productImages/${req.file.filename}`;
    }

    await product.save();

    res.json(product);
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
