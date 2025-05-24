import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p>Email: <a href="mailto:you@example.com" className="underline">finance.com</a></p>
          <p>Phone: 100</p>
          <p>Location: New Delhi ,India</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Disclaimer and Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Disclaimer</h3>
          <p className="text-sm mb-4">
            This portfolio is for informational purposes only and does not constitute financial advice.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/delhi_body_spa/" className="hover:text-blue-400">LinkedIn</a>
            <a href="https://github.com/Tanmay0215" className="hover:text-gray-400">GitHub</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        &copy; 2025 Your Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
