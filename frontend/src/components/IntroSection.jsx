import React from 'react';
import { Sparkles, Users, Award } from 'lucide-react';

const IntroSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl font-bold text-white">About NyayaSathi</h2>
          </div>
          
          <div className="space-y-6 text-white">
            <p className="text-lg leading-relaxed">
              <strong className="text-amber-400">NyayaSathi</strong>, India's premier free Legal AI ChatBot, harnesses cutting-edge artificial intelligence to democratize legal knowledge. Built to empower everyday citizens, NyayaSathi breaks down complex Indian legal concepts into simple, understandable guidance — completely free of charge.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">For Everyone</h3>
                </div>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  Designed to help common people understand their legal rights and responsibilities without any fees or barriers.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">AI-Powered Expertise</h3>
                </div>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  Leverages advanced AI technology to provide accurate, insightful legal information across multiple domains.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-indigo-100 leading-relaxed">
                NyayaSathi AI Law Bot, conceptualized by{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300 font-semibold underline">
                  Adv (Dr.) Vibhuti Bhushan Sharma
                </a>{' '}
                and developed, trained, and maintained independently by{' '}
                <a href="#" className="text-amber-400 hover:text-amber-300 font-semibold underline">
                  Brainwave Technologies
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
