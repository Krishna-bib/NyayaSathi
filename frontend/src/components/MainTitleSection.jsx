import React from 'react';

const MainTitleSection = () => {
  const features = [
    'Ask Legal Queries',
    'Multiple Languages',
    'Case Law Search',
    'Legal Drafting',
    'Free Service'
  ];

  return (
    <section className="py-12 px-4 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          India's AI Legal Assistant
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainTitleSection;
