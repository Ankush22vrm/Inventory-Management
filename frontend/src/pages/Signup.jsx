
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignupForm from '../components/auth/SignupForm';
import { signup } from '../redux/slices/authSlice';

const Signup = ({ showToast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSignup = async (formData) => {
    try {
      await dispatch(signup(formData)).unwrap();
      showToast('Signup successful! Please log in.');
      navigate('/login'); // ✅ Redirect to login after successful signup
    } catch (error) {
      const message = error?.message || String(error);
      showToast(message, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your WareFlow Account
        </h2>
        <SignupForm onSignup={handleSignup} isLoading={loading} />

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
