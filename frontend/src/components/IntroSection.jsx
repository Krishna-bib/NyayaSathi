import React from 'react';

const IntroSection = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <p className="text-lg leading-relaxed text-gray-700 mb-4">
          <strong>NyayaSathi</strong>, the first free Legal ChatBot of India is based on cutting-edge AI technology. It was created to help common people like you understand the complexities of Indian law without charging them any fee. NyayaSathi ChatBot uses artificial intelligence to deliver insightful online consultation on a range of legal topics, assisting you in better understanding your rights and duties.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          NyayaSathi AI Law Bot, conceptualized by <a href="#" className="text-blue-600 hover:underline">Adv (Dr.) Vibhuti Bhushan Sharma</a> and developed, trained and maintained independently by <a href="#" className="text-blue-600 hover:underline">Brainwave Technologies</a>.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
