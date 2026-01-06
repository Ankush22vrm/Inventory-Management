const Product = require('../../models/Product');
const Warehouse = require('../../models/Warehouse');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  console.log('=== CREATE PRODUCT REQUEST ===');
  console.log('Body:', req.body);
  console.log('File:', req.file);
  console.log('User ID:', req.user?._id);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, category, inStock, quantity, pricePerUnit, warehouseId } = req.body;

  if (!req.file) {
    console.log('❌ No image file uploaded');
    return res.status(400).json({ message: 'Product image is required' });
  }

  try {
    const warehouse = await Warehouse.findOne({ _id: warehouseId, user: req.user._id });
    if (!warehouse) {
      console.log('❌ Warehouse not found:', { warehouseId, userId: req.user._id });
      return res.status(404).json({ message: 'Warehouse not found or unauthorized' });
    }

    const isInStock = inStock === 'true' || inStock === true;

    console.log('✅ Creating product with data:', {
      name,
      category,
      inStock: isInStock,
      quantity: Number(quantity),
      pricePerUnit: Number(pricePerUnit),
      imageUrl: `/uploads/productImages/${req.file.filename}`,
      warehouseId
    });

    const product = new Product({
      name,
      category,
      inStock: isInStock,  
      quantity: Number(quantity),
      pricePerUnit: Number(pricePerUnit),
      imageUrl: `/uploads/productImages/${req.file.filename}`,
      warehouse: warehouseId,
    });

    await product.save();
    console.log('✅ Product created successfully:', product._id);

    res.status(201).json(product);
  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : undefined
    });
  }
};