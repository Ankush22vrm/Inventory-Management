
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Added useLocation to track current route
import { Warehouse, LogIn, UserPlus, User, LogOut, Trash2 } from 'lucide-react'; // ✅ Removed LayoutDashboard icon
import Button from '../shared/Button';
import ProfileIcon from '../shared/ProfileIcon';
import DeleteDialog from '../shared/DeleteDialog';
import UpdateProfileForm from '../profile/UpdateProfileForm';
import { logout, deleteAccount } from '../../redux/slices/authSlice';

const Navbar = ({ showToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Track current route to detect if user is on home page
  const location = useLocation();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

 // Check if user is currently on home page

  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    showToast('Logged out successfully!');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteAccount()).unwrap();
      showToast('Account deleted successfully!');
      setShowDeleteDialog(false);
      navigate('/');
    } catch (error) {
      showToast(error.message || 'Failed to delete account', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-center items-center h-16 relative">
            
            <div
              className="absolute left-0 flex items-center gap-2 cursor-pointer"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            >
              <Warehouse className="text-purple-600" size={32} />
              <span className="text-xl font-bold text-gray-800">WareFlow</span>
            </div>

            {isAuthenticated && isHomePage && (
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-purple-600 font-medium text-lg transition-colors duration-200"
              >
                Dashboard
              </button>
            )}

            <div className="absolute right-0">
              {/* SCENARIO 1: User NOT logged in - Show Login and Signup buttons */}
              {!isAuthenticated ? (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    <LogIn size={18} />
                    Login
                  </Button>
                  <Button onClick={() => navigate('/signup')}>
                    <UserPlus size={18} />
                    Signup
                  </Button>
                </div>
              ) : (
                /* SCENARIO 2: User IS logged in - Show Profile Menu */
                <div className="relative">
                  <ProfileIcon
                    user={user}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  />
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={() => {
                          setShowUpdateProfile(true);
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <User size={18} />
                        Update Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteDialog(true);
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                      >
                        <Trash2 size={18} />
                        Delete Account
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Update Profile Modal */}
      <UpdateProfileForm
        isOpen={showUpdateProfile}
        onClose={() => setShowUpdateProfile(false)}
        showToast={showToast}
      />

      {/* Delete Account Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and will delete all your warehouses and products."
        loading={deleteLoading}
      />
    </>
  );
};

export default Navbar;