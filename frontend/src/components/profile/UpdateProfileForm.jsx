import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import { updateProfile } from '../../redux/slices/authSlice';

const UpdateProfileForm = ({ isOpen, onClose, showToast }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    profileImage: null,
  });
 //3
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        profileImage: null,
      });
    }
    //5 Clear errors when modal opens
    setErrors({});
  }, [user,isOpen]);

  //1validate
   const validate = () => {
    const newErrors = {};
    
    if (!formData.username || formData.username.trim() === '') {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //2
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const data = new FormData();
      data.append('username', formData.username);
      if (formData.profileImage) {
        data.append('profileImage', formData.profileImage);
      }

      await dispatch(updateProfile(data)).unwrap();
      showToast('Profile updated successfully!');
      onClose();
    } catch (error) {
      showToast(error.message || 'Failed to update profile', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Profile">
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          value={formData.username}
          onChange={(e) =>{
            setFormData({ ...formData, username: e.target.value })
            //4 Clear error when user starts typing
            if (errors.username) {
              setErrors({ ...errors, username: '' });
            }

          }}
          error={errors.username}
          placeholder="Enter username"
        />
        <Input
          label="Profile Image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, profileImage: e.target.files[0] })
          }
        />
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProfileForm;