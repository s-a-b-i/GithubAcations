import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              ProductStore
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
            )}
            
            <Link
              to={isAdmin ? "/products" : "/admin/products"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {isAdmin ? 'User View' : 'Admin Panel'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;