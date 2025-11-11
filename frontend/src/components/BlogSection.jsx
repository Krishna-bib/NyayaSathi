import React from 'react';
import { Calendar, User, ExternalLink } from 'lucide-react';

const BlogSection = () => {
  const blogs = [
    {
      title: "Supreme Court's Landmark Verdict on Article 370: Constitutional Validity Upheld",
      date: "December 11, 2023",
      author: "The Hindu Legal Desk",
      source: "The Hindu",
      sourceUrl: "https://www.thehindu.com",
      excerpt: "The Supreme Court unanimously upheld the constitutional validity of the abrogation of Article 370, stating that it was a temporary provision. The five-judge Constitution Bench led by Chief Justice of India D.Y. Chandrachud delivered the historic judgment, emphasizing that the provision was meant to be temporary from its inception.",
      category: "Constitutional Law"
    },
    {
      title: "New Criminal Laws Replace IPC, CrPC: Bharatiya Nyaya Sanhita Takes Effect",
      date: "July 1, 2024",
      author: "Bar & Bench",
      source: "Bar & Bench",
      sourceUrl: "https://www.barandbench.com",
      excerpt: "Three new criminal laws—Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita, and Bharatiya Sakshya Adhiniyam—replaced the Indian Penal Code, Code of Criminal Procedure, and Indian Evidence Act respectively. These modernized laws aim to transform India's criminal justice system with technology integration and victim-centric provisions.",
      category: "Criminal Law"
    },
    {
      title: "Delhi High Court Grants Bail in Landmark Cyber Crime Case Under IT Act",
      date: "November 20, 2024",
      author: "LiveLaw News Network",
      source: "LiveLaw",
      sourceUrl: "https://www.livelaw.in",
      excerpt: "The Delhi High Court granted bail in a significant cyber fraud case, establishing new precedents for digital evidence evaluation under the IT Act. The court emphasized the need for clear guidelines on digital forensics and electronic evidence admissibility, impacting future cyber crime prosecutions.",
      category: "Cyber Law"
    },
    {
      title: "Supreme Court Clarifies GST Provisions on E-commerce Transactions",
      date: "October 15, 2024",
      author: "TaxScan Editorial",
      source: "TaxScan",
      sourceUrl: "https://www.taxscan.in",
      excerpt: "The Supreme Court provided crucial clarity on GST applicability for e-commerce platforms, addressing controversies around tax collection at source (TCS) and place of supply rules. This judgment will significantly impact online businesses and digital commerce taxation in India.",
      category: "Tax Law"
    },
    {
      title: "Bombay HC Ruling Strengthens Consumer Rights Under New Consumer Protection Act",
      date: "September 28, 2024",
      author: "Consumer Voice Legal Team",
      source: "Consumer Voice",
      sourceUrl: "https://www.consumervoice.org",
      excerpt: "The Bombay High Court delivered a progressive judgment expanding consumer rights in e-commerce disputes, holding platforms liable for defective products and service deficiencies. The ruling strengthens the Consumer Protection Act 2019's provisions on product liability and consumer forums' jurisdiction.",
      category: "Consumer Protection"
    },
    {
      title: "Supreme Court Verdict on Same-Sex Marriage: Status Quo Maintained",
      date: "October 17, 2023",
      author: "The Wire Legal",
      source: "The Wire",
      sourceUrl: "https://thewire.in",
      excerpt: "The Supreme Court declined to grant legal recognition to same-sex marriages under the Special Marriage Act, maintaining that such legislative changes are the domain of Parliament. However, the court recognized the rights of LGBTQ+ individuals to choose their partners and urged the government to ensure their rights are protected.",
      category: "Family Law"
    }
  ];

  return (
    <section id="blog" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Legal News & Insights
          </h2>
          <p className="text-lg text-gray-600">
            Stay updated with recent landmark judgments and legal developments in India
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, idx) => (
            <article 
              key={idx} 
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                  {blog.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {blog.title}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-600">
                  Source: {blog.source}
                </span>
                <a 
                  href={blog.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Read More <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Articles sourced from reputable legal news platforms. NyayaSathi does not claim ownership of the content.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
