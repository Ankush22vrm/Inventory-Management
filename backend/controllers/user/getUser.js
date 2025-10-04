module.exports = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });

  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    profileImageUrl: req.user.profileImageUrl,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  });
};
