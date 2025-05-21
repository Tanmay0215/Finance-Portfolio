import React from 'react';
import Navbar from '../components/common/Navbar';

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <header className="bg-green-500 text-white py-16 px-5 text-center">
        <h1 className="text-5xl mb-3">Track Your Crypto Portfolio Like a Pro</h1>
        <p className="text-xl mb-5">
          Gain insights, manage assets, and stay ahead of the market with our intuitive finance tracker.
        </p>
        <button className="bg-white text-green-500 py-2 px-5 rounded-md text-lg cursor-pointer hover:bg-gray-100">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-10 px-5 text-center">
        <h2 className="text-4xl mb-10">Why Choose Our Tracker?</h2>
        <div className="flex justify-around flex-wrap">
          <div className="max-w-xs m-5">
            <h3 className="text-2xl text-green-500 font-semibold">Comprehensive Tracking</h3>
            <p className="text-gray-600">Monitor all your cryptocurrency investments in one place. Real-time updates and detailed analytics.</p>
          </div>
          <div className="max-w-xs m-5">
            <h3 className="text-2xl text-green-500 font-semibold">Insightful Analytics</h3>
            <p className="text-gray-600">Understand your portfolio&apos;s performance with easy-to-read charts and reports. Make data-driven decisions.</p>
          </div>
          <div className="max-w-xs m-5">
            <h3 className="text-2xl text-green-500 font-semibold">Secure & Reliable</h3>
            <p className="text-gray-600">Your data is protected with top-tier security measures. Track your assets with peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 py-16 px-5 text-center">
        <h2 className="text-4xl mb-5">Ready to Take Control of Your Finances?</h2>
        <p className="text-xl mb-8 text-gray-700">
          Sign up today and start your journey towards smarter crypto investment management.
        </p>
        <button className="bg-green-500 text-white py-3 px-8 rounded-md text-xl cursor-pointer hover:bg-green-600">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;
