const Product = require('../../models/Product');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete the product image from the filesystem if it exists
    const oldImagePath = path.join(__dirname, '../../', product.imageUrl);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    // Use deleteOne() instead of deprecated remove()
    await product.deleteOne();

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
