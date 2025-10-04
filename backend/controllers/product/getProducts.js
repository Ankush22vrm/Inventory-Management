const Product = require('../../models/Product');

module.exports = async (req, res) => {
  try {
    const { warehouseId } = req.query;

    if (!warehouseId) {
      return res.status(400).json({ message: 'warehouseId query param required' });
    }

    const products = await Product.find({ warehouse: warehouseId });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
