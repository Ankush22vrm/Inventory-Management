const User = require('../../models/User');
const Warehouse = require('../../models/Warehouse');
const Product = require('../../models/Product');

module.exports = async (req, res) => {
  try {
    // Delete all user warehouses and their products first
    const warehouses = await Warehouse.find({ user: req.user._id });
    for (const warehouse of warehouses) {
      await Product.deleteMany({ warehouse: warehouse._id });
      await warehouse.deleteOne();
    }
    // Delete the user
    await req.user.deleteOne();

    res.json({ message: 'User and all related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
