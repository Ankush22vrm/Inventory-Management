
const User = require('../../models/User');
const cloudinary = require('../../config/cloudinaryConfig');
const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const user = req.user;

  try {
    if (req.body.username) user.username = req.body.username;

   

    // If a new profile image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (user.profileImagePublicId) {
        await cloudinary.uploader.destroy(user.profileImagePublicId);
      }
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'userProfiles',
      });
      // Save new image URL and public_id
      user.profileImageUrl = result.secure_url;
      user.profileImagePublicId = result.public_id;
    }

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
