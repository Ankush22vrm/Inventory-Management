const Warehouse = require('../../models/Warehouse');
const Product = require('../../models/Product');

module.exports = async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne({ _id: req.params.id, user: req.user._id });
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });

    // Delete all products in this warehouse
    await Product.deleteMany({ warehouse: warehouse._id });

    // Use deleteOne() instead of deprecated remove()
    await warehouse.deleteOne();

    res.json({ message: 'Warehouse and its products deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
