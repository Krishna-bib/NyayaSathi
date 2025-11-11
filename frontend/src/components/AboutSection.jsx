import React from 'react';
import { Target, Users, Shield, Zap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About NyayaSathi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering citizens with accessible legal knowledge through artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What is NyayaSathi?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              NyayaSathi is India's first free AI-powered legal assistant designed to bridge the gap between complex legal systems and ordinary citizens. Built on advanced artificial intelligence technology, NyayaSathi makes Indian law accessible, understandable, and actionable for everyone.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our platform provides instant legal information, guidance on rights and procedures, and helps users understand their legal standing in various situations—all without any cost or barriers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why NyayaSathi Exists</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Legal systems can be intimidating and difficult to navigate. Many people cannot afford professional legal consultation or don't know where to start when facing legal questions. NyayaSathi was created to democratize legal knowledge.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe every citizen deserves to understand their legal rights and responsibilities. By leveraging AI technology, we make legal information available 24/7, breaking down language barriers and complex legal jargon into simple, actionable guidance.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Our Mission</h4>
            <p className="text-sm text-gray-600">
              Making Indian law accessible to every citizen through AI technology
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">For Everyone</h4>
            <p className="text-sm text-gray-600">
              Free, accessible legal guidance for all citizens regardless of background
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Comprehensive</h4>
            <p className="text-sm text-gray-600">
              Coverage across 14+ major domains of Indian law
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Instant Support</h4>
            <p className="text-sm text-gray-600">
              24/7 availability with immediate AI-powered responses
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">The Team Behind NyayaSathi</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            NyayaSathi was conceptualized by <strong>Adv (Dr.) Vibhuti Bhushan Sharma</strong>, a distinguished legal professional with a vision to make legal services accessible to all Indians. Recognizing the challenges faced by common citizens in understanding and accessing legal information, Dr. Sharma envisioned an AI-powered platform that could serve as a legal companion for everyone.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The platform is developed, trained, and maintained by <strong>Brainwave Technologies</strong>, a team of AI specialists and legal technology experts. Through continuous refinement and updates, we ensure NyayaSathi remains accurate, reliable, and aligned with the latest developments in Indian law.
          </p>
        </div>

        <div className="mt-12 bg-indigo-50 border border-indigo-200 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notice</h3>
          <p className="text-gray-700 leading-relaxed">
            While NyayaSathi provides comprehensive legal information based on Indian law, it is important to understand that our AI assistant offers general guidance and not personalized legal advice. For specific legal matters, court representation, or complex legal situations, we strongly recommend consulting with a qualified legal professional. NyayaSathi serves as an educational tool and first step in understanding your legal position.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
