import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Crypto from './pages/crypto/Crypto';
import CryptoDetails from './pages/crypto/CryptoDetails';

import MarketLayout from './layouts/MarketsLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardLayout from './layouts/DashboardLayout';
import Portfolio from './pages/dashboard/Portfolio';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';

import ChatButton from './components/chat/ChatButton';
import ChatbotModal from './components/chat/ChatbotModal';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<MarketLayout />}>
          <Route index element={<Home />} />
          <Route path="crypto" element={<Crypto />} />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatButton onClick={toggleChat} />
      <ChatbotModal isOpen={isChatOpen} onClose={toggleChat} />
    </>
  );
};

export default App;

