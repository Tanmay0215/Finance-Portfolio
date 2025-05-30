import React, { useState } from 'react';
import api from '../../utils/api'; // Import the configured Axios instance
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.post('/api/auth/signup', form); // Use api instance
      if (res.status === 201) {
        setMessage(res.data.message || 'Account created successfully!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else if (error.response && error.response.status === 409) {
        setMessage('User already exists.');
      } else {
        setMessage('Server error. Please try again later.');
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(120deg, #0f2027 0%, #2c5364 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* SVG overlay for chart effect */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100vw",
          height: "40vh",
          zIndex: 0,
          opacity: 0.35,
          pointerEvents: "none"
        }}
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,350 100,300 200,320 300,250 400,270 500,200 600,220 700,180 800,210 900,160 1000,200 1100,140 1200,180 1300,120 1440,150"
          fill="none"
          stroke="#00fff7"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.7"
        />
        <polyline
          points="0,370 100,340 200,360 300,320 400,340 500,300 600,320 700,280 800,310 900,260 1000,300 1100,240 1200,280 1300,220 1440,250"
          fill="none"
          stroke="#ff00c8"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Faint coin shapes */}
        <circle cx="1300" cy="320" r="32" fill="#fff" opacity="0.08" />
        <circle cx="1350" cy="340" r="18" fill="#fff" opacity="0.12" />
        <circle cx="1270" cy="350" r="12" fill="#fff" opacity="0.10" />
      </svg>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
        <h2 className="text-3xl font-semibold text-green-500 mb-6 text-center">Create Your Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Create a password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md text-lg hover:bg-green-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-green-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;