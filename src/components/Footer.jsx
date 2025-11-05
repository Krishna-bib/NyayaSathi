import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Disclaimer */}
        <div className="mb-8 p-6 rounded-lg bg-gray-800">
          <p className="text-sm leading-relaxed">
            <strong className="text-yellow-400">Disclaimer:</strong> NyayGuru is an AI-driven platform designed to provide general legal information. The responses generated do not constitute legal advice and are not a substitute for professional legal consultation. For specific legal matters, please consult a qualified lawyer.
          </p>
        </div>

        {/* Footer Links */}
        <nav className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
          {['Home', 'Blog', 'About Us', 'Contact Us', 'Disclaimer', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-yellow-400 transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400">
          © 2025 NyayGuru. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
