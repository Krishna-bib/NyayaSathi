import React from 'react';

const ExampleQueriesSection = () => {
  const queries = [
    'What are the grounds for divorce in India?',
    'How can I protect my intellectual property rights?',
    'What is the procedure for filing an FIR?',
    'How do I register a company in India?',
    'What are my rights as a consumer under the Consumer Protection Act?',
    'How can I apply for bail in a criminal case?',
    'What is the process for property registration in India?',
    'How do I file an income tax return?',
    'What are the rights of an employee under labour laws?',
    'How can I file a complaint under RERA?',
    'What is the procedure for obtaining a trademark?',
    'How do I challenge an administrative order?',
    'What are the penalties for cyber crimes in India?',
    'How can I claim insurance under banking regulations?'
  ];

  return (
    <section className="py-16 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Example Legal Queries
          </h2>
          <p className="text-lg text-gray-600">
            See what you can ask NyayaSathi
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {queries.map((query, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <p className="text-sm text-gray-700">{query}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleQueriesSection;
