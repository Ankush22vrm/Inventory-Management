import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Toast from './components/shared/Toast';
import { checkAuth } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar showToast={showToast} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login showToast={showToast} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Signup showToast={showToast} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard showToast={showToast} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;