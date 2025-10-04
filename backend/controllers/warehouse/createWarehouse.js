const Warehouse = require('../../models/Warehouse');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, address } = req.body;

  try {
    const warehouse = new Warehouse({ name, address, user: req.user._id });
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
