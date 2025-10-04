const Warehouse = require('../../models/Warehouse');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const warehouse = await Warehouse.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );

    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });

    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
