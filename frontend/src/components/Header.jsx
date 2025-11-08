import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white bg-opacity-95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                <path d="M12 12v8"/>
                <path d="M8 14l4-4 4 4"/>
              </svg>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', active: true },
              { name: 'Blog', active: false },
              { name: 'About Us', active: false },
              { name: 'Contact Us', active: false }
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium transition-colors relative ${
                  item.active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                {item.active && (
                  <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gray-900"></div>
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {['Home', 'Blog', 'About Us', 'Contact Us'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block py-2 text-sm font-medium text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
