import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">FinancePortfolio</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/crypto" className="hover:text-gray-300">Crypto</Link>
          <Link to="/us-markets" className="hover:text-gray-300">US Markets</Link>
          <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
