import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const MarketLayout = () => {
  return (
    <div className="min-h-screen">
        <Navbar />
        <main className="bg-gray-100">
          <Outlet />
        </main>
        <Footer />
    </div>
  );
};

export default MarketLayout;
