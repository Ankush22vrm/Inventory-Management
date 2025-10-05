import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import Loader from '../shared/Loader';

const SignupForm = ({ onSignup, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    else if (formData.username.length < 3)
      newErrors.username = 'Username must be at least 3 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      if (formData.profileImage) data.append('profileImage', formData.profileImage);
      onSignup(data);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
        placeholder="Enter username"
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        placeholder="Enter email"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Confirm password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      <Input
        label="Profile Image (Optional)"
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFormData({ ...formData, profileImage: e.target.files[0] })
        }
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Loader /> : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignupForm;