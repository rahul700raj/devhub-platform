import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Search, Plus, Moon, Sun, LogOut, User } from 'lucide-react';

function Navbar({ isAuthenticated, setIsAuthenticated, theme, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-accent-green" />
              <span className="text-xl font-bold">DevHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/search" className="flex items-center space-x-1 hover:text-accent-green transition">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/new"
                  className="flex items-center space-x-1 px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-green-600 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>New</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 hover:text-accent-green transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-green-600 transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;