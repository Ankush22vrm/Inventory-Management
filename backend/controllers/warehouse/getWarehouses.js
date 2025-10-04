const Warehouse = require('../../models/Warehouse');

module.exports = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({ user: req.user._id });
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
