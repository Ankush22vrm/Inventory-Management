const express = require('express');
const router = express.Router();
const loginUser = require('../controllers/user/loginUser');
const { loginValidation } = require('../utils/validators');
const validateRequest = require('../middlewares/validateMiddleware');

router.post('/', loginValidation, validateRequest, loginUser);

module.exports = router;
