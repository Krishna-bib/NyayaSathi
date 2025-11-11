import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MainTitleSection from './components/MainTitleSection';
import ChatInterface from './components/ChatInterface';
import BlogSection from './components/BlogSection';
import AboutSection from './components/AboutSection';
import AreasOfLawSection from './components/AreasOfLawSection';
import ExampleQueriesSection from './components/ExampleQueriesSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <MainTitleSection />
        <ChatInterface />
        <BlogSection />
        <AboutSection />
        <AreasOfLawSection />
        <ExampleQueriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
