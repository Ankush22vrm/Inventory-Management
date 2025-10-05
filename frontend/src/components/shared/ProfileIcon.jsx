import React from 'react';

const ProfileIcon = ({ user, onClick }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if profileImageUrl is a full URL (Cloudinary) or local path
  const getProfileImageUrl = (url) => {
    if (!url) return null;
    // If it's already a full URL (starts with http), use it as is
    if (url.startsWith('http')) return url;
    // Otherwise, it's a local path, prepend base URL
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${url}`;
  };

  const imageUrl = getProfileImageUrl(user?.profileImageUrl);

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={user.username}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div 
        className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium"
        style={{ display: imageUrl ? 'none' : 'flex' }}
      >
        {getInitials(user?.username || 'U')}
      </div>
      <span className="font-medium text-gray-700">{user?.username}</span>
    </button>
  );
};

export default ProfileIcon;