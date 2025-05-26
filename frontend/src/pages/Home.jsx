import React from 'react';
import { useNavigate } from 'react-router-dom';

// Placeholder icons - consider using a library like react-icons
const IconPlaceholder = ({ className = "w-12 h-12 text-green-500" }) => (
  <svg className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 6.253v11.494m0 0A8.001 8.001 0 004 17.747M12 17.747A8.001 8.001 0 0020 17.747M12 6.253A8.001 8.001 0 004 6.253m8 0A8.001 8.001 0 0020 6.253M4 12a8.001 8.001 0 0116 0H4z"></path>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans text-slate-800">
      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Your All-In-One Crypto Portfolio Tracker
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
          Effortlessly manage, analyze, and grow your cryptocurrency investments. Get real-time insights and stay ahead of the market.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started for Free
        </button>
      </header>

      {/* Why Choose Us? Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-slate-800">Why Choose Our Tracker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <IconPlaceholder />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Comprehensive Tracking</h3>
              <p className="text-slate-600">Monitor all your crypto assets in one place with real-time price updates and detailed performance analytics.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <IconPlaceholder />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Insightful Analytics</h3>
              <p className="text-slate-600">Gain deep understanding of your portfolio with interactive charts, historical data, and profit/loss statements.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <IconPlaceholder />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Secure & Reliable</h3>
              <p className="text-slate-600">Your data security is our priority. We employ robust measures to protect your information and ensure platform stability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-slate-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-slate-800">Get Started in 3 Simple Steps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-green-500 mb-4">1</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Sign Up</h3>
              <p className="text-slate-600">Create your free account in minutes. No credit card required.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-green-500 mb-4">2</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Connect Exchanges</h3>
              <p className="text-slate-600">Securely link your cryptocurrency exchange accounts or add manual transactions.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-green-500 mb-4">3</div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-700">Track & Analyze</h3>
              <p className="text-slate-600">Watch your portfolio grow and gain valuable insights to make informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-slate-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg">
              <p className="text-slate-600 italic mb-6">&quot;This tracker has revolutionized how I manage my crypto. The interface is clean and the analytics are powerful!&quot;</p>
              <p className="font-semibold text-slate-700">- Alex P.</p>
              <p className="text-sm text-green-500">Crypto Enthusiast</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg">
              <p className="text-slate-600 italic mb-6">&quot;Finally, a portfolio tracker that&apos;s both easy to use and provides deep insights. Highly recommended!&quot;</p>
              <p className="font-semibold text-slate-700">- Sarah K.</p>
              <p className="text-sm text-green-500">Day Trader</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-xl shadow-lg md:col-span-2 lg:col-span-1">
              <p className="text-slate-600 italic mb-6">&quot;The security features give me peace of mind. I can track all my assets without worry. Great job!&quot;</p>
              <p className="font-semibold text-slate-700">- Mike L.</p>
              <p className="text-sm text-green-500">Long-term Investor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-green-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Crypto?</h2>
          <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto">
            Join thousands of investors who trust our platform to manage their digital assets. Sign up today and experience the future of crypto portfolio tracking.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-green-500 font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:bg-slate-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
