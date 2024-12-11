import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Award, LogOut, Menu } from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { useSidebar } from '../../contexts/SidebarContext';

export default function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm h-16 fixed w-full top-0 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <Award className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BRAVO</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-150 ease-in-out"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}