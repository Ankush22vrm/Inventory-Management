 const User = require('../../models/User');
const cloudinary = require('../../config/cloudinaryConfig');
const generateToken = require('../../utils/generateToken');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    let profileImageUrl = '';

    // Upload profile image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'userProfiles',
      });
      profileImageUrl = result.secure_url;
    }

    // Create new user
    const user = new User({ username, email, password, profileImageUrl });

    await user.save();

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
