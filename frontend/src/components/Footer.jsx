import React from 'react';
import { Scale } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Disclaimer */}
        <div className="mb-10 p-6 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-bold text-yellow-400 mb-2">Important Disclaimer</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            NyayaSathi is an AI-driven platform designed to provide general legal information. The responses generated do not constitute legal advice and are not a substitute for professional legal consultation. For specific legal matters, please consult a qualified lawyer.
          </p>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">NyayaSathi</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-powered legal assistance for Indian law, making justice accessible to everyone.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Blog', id: 'blog' },
                { name: 'About Us', id: 'about' }
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="#disclaimer" className="text-gray-400 hover:text-white transition-colors">
                Disclaimer
              </a>
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © 2025 NyayaSathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
