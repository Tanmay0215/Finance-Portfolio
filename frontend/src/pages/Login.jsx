import React, { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        // Redirect to dashboard or home
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (err) {
      setMessage('Server error.');
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
        <circle cx="1300" cy="320" r="32" fill="#fff" opacity="0.08"/>
        <circle cx="1350" cy="340" r="18" fill="#fff" opacity="0.12"/>
        <circle cx="1270" cy="350" r="12" fill="#fff" opacity="0.10"/>
      </svg>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
        <h2 className="text-3xl font-semibold text-green-500 mb-6 text-center">Log In to Your Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md text-lg hover:bg-green-600 transition-colors"
          >
            Log In
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-600">{message}</p>
        )}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-green-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;