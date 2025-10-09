const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateMiddleware');
const { body } = require('express-validator');

const getUser = require('../controllers/user/getUser');
const updateUserProfile = require('../controllers/user/updateUserProfile');
const deleteUser = require('../controllers/user/deleteUser');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/userProfiles/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Validation rules (basic example)
const updateValidation = [
  body('username').optional().isLength({ min: 3 }).withMessage('Username should be minimum 3 characters'),

];

router.use(protect);

router.get('/profile', getUser);
router.put('/profile', upload.single('profileImage'), updateValidation, validateRequest, updateUserProfile);
router.delete('/delete', deleteUser);

module.exports = router;
