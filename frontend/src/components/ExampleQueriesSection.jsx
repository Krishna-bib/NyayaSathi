import React from 'react';
import { MessageCircle } from 'lucide-react';

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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Types of Legal Queries NyayaSathi Can Answer
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {queries.map((query, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3 hover:shadow-md transition-shadow"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-600" />
              <p className="text-sm text-gray-700">{query}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleQueriesSection;
