import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/auth/LoginForm';
import { login } from '../redux/slices/authSlice'; 
import { clearWarehouses } from '../redux/slices/warehouseSlice';
import { clearProducts } from '../redux/slices/productSlice';

const Login = ({ showToast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      
      dispatch(clearWarehouses());
      dispatch(clearProducts());
      
      await dispatch(login(credentials)).unwrap();
      showToast('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const message = error?.message || String(error);
      showToast(message, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to WareFlow
        </h2>
        <LoginForm onLogin={handleLogin} isLoading={loading} />
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
