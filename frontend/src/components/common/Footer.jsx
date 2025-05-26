import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400">Contact</h3>
          <p>Email: <a href="mailto:info@financeportfolio.com" className="hover:text-green-300 hover:underline">info@financeportfolio.com</a></p>
          <p>Phone: <a href="tel:+919876543210" className="hover:text-green-300 hover:underline">+91-9876543210</a></p>
          <p>Location: New Delhi, India</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:text-green-300 hover:underline">About</a></li>
            <li><a href="#portfolio" className="hover:text-green-300 hover:underline">Portfolio</a></li>
            <li><a href="#services" className="hover:text-green-300 hover:underline">Services</a></li>
            <li><a href="#contact" className="hover:text-green-300 hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Disclaimer and Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400">Disclaimer</h3>
          <p className="text-sm mb-4 text-slate-400">
            This portfolio is for informational purposes only and does not constitute financial advice.
          </p>
          <h4 className="text-lg font-semibold mb-3 text-green-400">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-green-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/Tanmay0215"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-green-300"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-green-300"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} FinancePortfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
