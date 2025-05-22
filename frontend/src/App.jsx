import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Crypto from './pages/crypto/Crypto';
import USMarkets from './pages/USMarkets';
import CryptoDetails from './pages/crypto/CryptoDetails';

import MarketLayout from './layouts/MarketsLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardLayout from './layouts/DashboardLayout';
import Portfolio from './pages/dashboard/Portfolio';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketLayout />}>
        <Route index element={<Home />} />
        <Route path="crypto" element={<Crypto />}>
        </Route>
        <Route path="/crypto/:id" element={<CryptoDetails />} />
        <Route path="us-markets" element={<USMarkets />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
