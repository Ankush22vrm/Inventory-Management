import api from '../../utils/api';

export const loginAPI = async (credentials) => {
  const data = await api.post('/login', credentials);
  // Ensure we return the correct structure
  return data; // data already has token, user info, etc.
};

export const signupAPI = async (formData) => {
  const data = await api.post('/signup', formData);
  return data;
};

export const deleteAccountAPI = async () => {
  await api.delete('/users/delete');
  return true;
};

export const updateProfileAPI = async (formData) => {
  const data = await api.put('/users/profile', formData);
  return data;
};
