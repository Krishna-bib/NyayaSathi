import React from 'react';

const AreasOfLawSection = () => {
  const lawDomains = [
    {
      title: 'Constitutional Law',
      topics: ['Fundamental Rights and Freedoms', 'Judicial Review', 'Constitutional Amendments', 'Separation of Powers']
    },
    {
      title: 'Criminal Law',
      topics: ['IPC Offenses', 'Criminal Procedure', 'Bail and Custody', 'Investigation and Trial']
    },
    {
      title: 'Civil Law',
      topics: ['Contract Disputes', 'Property Disputes', 'Tort Law', 'Civil Procedure Code']
    },
    {
      title: 'Family Law',
      topics: ['Marriage and Divorce', 'Child Custody', 'Maintenance and Alimony', 'Succession and Inheritance']
    },
    {
      title: 'Labour and Employment Law',
      topics: ['Employment Contracts', 'Workplace Rights', 'Industrial Disputes', 'Social Security Benefits']
    },
    {
      title: 'Intellectual Property Law',
      topics: ['Patents and Trademarks', 'Copyright Protection', 'Trade Secrets', 'IP Litigation']
    },
    {
      title: 'Commercial and Business Law',
      topics: ['Business Transactions', 'Corporate Governance', 'Banking Regulations', 'Competition Law']
    },
    {
      title: 'Tax Law',
      topics: ['Income Tax', 'Goods and Services Tax (GST)', 'Corporate Tax', 'Tax Disputes and Appeals']
    },
    {
      title: 'Real Estate and RERA',
      topics: ['Property Registration', 'RERA Compliance', 'Landlord-Tenant Disputes', 'Property Disputes']
    },
    {
      title: 'Consumer Protection Law',
      topics: ['Consumer Rights', 'Product Liability', 'Consumer Forums', 'Service Deficiency']
    },
    {
      title: 'Banking and Finance Law',
      topics: ['Loan Agreements', 'Debt Recovery', 'Banking Fraud', 'Financial Regulations']
    },
    {
      title: 'Environmental Law',
      topics: ['Pollution Control', 'Environmental Clearances', 'Wildlife Protection', 'Climate Regulations']
    },
    {
      title: 'Administrative Law',
      topics: ['Government Actions', 'Administrative Tribunals', 'Public Service Rules', 'Judicial Review']
    },
    {
      title: 'Cyber Law',
      topics: ['Data Protection', 'Cyber Crimes', 'IT Act Compliance', 'Digital Transactions']
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Areas of Law Covered
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive coverage across all major domains of Indian law
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawDomains.map((domain, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">{domain.title}</h3>
              <ul className="space-y-2.5">
                {domain.topics.map((topic, topicIdx) => (
                  <li key={topicIdx} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                    <span className="leading-snug">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasOfLawSection;
