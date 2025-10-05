import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import warehouseReducer from './slices/warehouseSlice';
import productReducer from './slices/productSlice';

// Load user from localStorage on app start
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      };
    }
  } catch (err) {
    console.error('Error loading user from storage:', err);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const preloadedState = {
  auth: {
    ...loadUserFromStorage(),
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    product: productReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;