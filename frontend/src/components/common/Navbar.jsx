import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">FinancePortfolio</Link>
        <div className="space-x-4 hidden md:flex items-center">
          <Link to="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link>
          <Link to="/crypto" className="hover:text-green-400 transition-colors">Crypto</Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium">Sign Up</Link>
          <Link to="/login" className="hover:text-green-400 transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
