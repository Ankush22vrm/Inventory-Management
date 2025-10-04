const { body } = require('express-validator');

const signupValidation = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password is required'),
];

const warehouseValidation = [
  body('name').isLength({ min: 2 }).withMessage('Warehouse name must be at least 2 characters'),
];

const productValidation = [
  body('name').isLength({ min: 2 }).withMessage('Product name must be at least 2 characters'),
  body('category').isIn(['electronics', 'clothing', 'furniture', 'food', 'other']).withMessage('Invalid category'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be zero or positive'),
  body('pricePerUnit').isFloat({ min: 0 }).withMessage('Price per unit must be zero or positive'),
];

module.exports = {
  signupValidation,
  loginValidation,
  warehouseValidation,
  productValidation,
};

