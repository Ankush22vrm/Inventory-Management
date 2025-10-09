const Product = require('../../models/Product');
const Warehouse = require('../../models/Warehouse');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, category, inStock, quantity, pricePerUnit, warehouseId } = req.body;

  if (!req.file) return res.status(400).json({ message: 'Product image is required' });

  try {
    const warehouse = await Warehouse.findOne({ _id: warehouseId, user: req.user._id });
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found or unauthorized' });

    // Properly parse the inStock value
    const isInStock = inStock === 'true' || inStock === true;

    const product = new Product({
      name,
      category,
      inStock: isInStock,  
      quantity,
      pricePerUnit,
      imageUrl: `/uploads/productImages/${req.file.filename}`,
      warehouse: warehouseId,
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
