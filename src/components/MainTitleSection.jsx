import React from 'react';

const MainTitleSection = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          NyayGuru: India's First Legal AI Chatbot
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-base md:text-lg text-gray-700">
          <div className="flex items-center gap-2">
            <span>📝</span>
            <span>Ask Your Legal Query</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <span>Be Specific</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌍</span>
            <span>Ask in Any Language</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📄</span>
            <span>Upload PDFs</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🔍</span>
            <span>Find Case Laws</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📋</span>
            <span>Legal Draftings</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💯</span>
            <span>It's Free!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainTitleSection;
