const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const createUser = require('../controllers/user/createUser');
const { signupValidation } = require('../utils/validators');
const validateRequest = require('../middlewares/validateMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/userProfiles/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/', upload.single('profileImage'), signupValidation, validateRequest, createUser);

module.exports = router;
