import React from 'react';

const HeroSection = () => {
  return (
    <section 
      className="pt-20 pb-12 px-4 relative bg-cover bg-center"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"1920\" height=\"400\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3ClinearGradient id=\"grad\" x1=\"0%25\" y1=\"0%25\" x2=\"100%25\" y2=\"100%25\"%3E%3Cstop offset=\"0%25\" style=\"stop-color:rgb(101,84,60);stop-opacity:1\" /%3E%3Cstop offset=\"100%25\" style=\"stop-color:rgb(70,58,42);stop-opacity:1\" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\"1920\" height=\"400\" fill=\"url(%23grad)\" /%3E%3C/svg%3E')",
        minHeight: '400px'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60"></div>
      <div className="max-w-7xl mx-auto relative z-10 text-center py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
          NyayGuru
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
