import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 pb-12 px-4 bg-gradient-to-br from-indigo-600 to-indigo-800">
      <div className="max-w-7xl mx-auto text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome to NyayaSathi
        </h1>
        
        <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
          AI-Powered Legal Assistance for Indian Law
        </p>

        <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
          Get instant, reliable legal information and guidance on Indian law matters, completely free of charge
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
