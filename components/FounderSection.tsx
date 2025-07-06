'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Star } from 'lucide-react';

const FounderSection: React.FC = () => {
  const { t } = useTranslation();

  const achievements = [
    {
      icon: Award,
      title: t('founder.achievements.scholar'),
      description: t('founder.achievements.scholar.desc')
    },
    {
      icon: BookOpen,
      title: t('founder.achievements.educator'),
      description: t('founder.achievements.educator.desc')
    },
    {
      icon: Users,
      title: t('founder.achievements.leader'),
      description: t('founder.achievements.leader.desc')
    },
    {
      icon: Star,
      title: t('founder.achievements.guide'),
      description: t('founder.achievements.guide.desc')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern-bg opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 gold-accent">
            {t('founder.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-500-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Founder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Founder Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t('founder.name')}
              </h3>
              
              {/* Arabic Dua */}
              <div className="mb-6">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-800 arabic-text leading-relaxed mb-2">
                  {t('hero.dua')}
                </h4>
                <p className="text-lg text-yellow-600 font-medium tracking-wider">
                  {t('hero.symbolic')}
                </p>
              </div>
              
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-yellow-500-400 mx-auto lg:mx-0 rounded-full mb-6"></div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('founder.description')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('founder.description.extended')}
              </p>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="text-center p-4 rounded-lg bg-white shadow-lg border border-yellow-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Founder Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main founder card */}
              <div className="islamic-card p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-blue-500/5"></div>
                
                {/* Placeholder for founder image */}
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-900 to-blue-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-500-400/20"></div>
                  <div className="relative z-10 text-white text-center flex flex-col items-center justify-center">
                    {/* Premium SVG icon */}
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                      <circle cx="40" cy="40" r="38" stroke="#d4af37" strokeWidth="4" fill="#fffbe6" />
                      <path d="M40 20 L50 60 L40 50 L30 60 Z" fill="#d4af37" stroke="#bfa14a" strokeWidth="2" />
                      <path d="M40 30 A10 10 0 1 1 39.9 30" fill="none" stroke="#bfa14a" strokeWidth="2" />
                      <path d="M32 44 Q40 36 48 44" fill="none" stroke="#bfa14a" strokeWidth="2" />
                    </svg>
                    <p className="text-sm font-medium">Alfa Baba</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    {t('founder.quote.title')}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{t('founder.quote.text')}"
                  </p>
                  
                  {/* Quote decoration */}
                  <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-500-400"></div>
                    <div className="text-yellow-500 text-2xl">❝</div>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-500-400 to-yellow-500"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-500-400 rounded-full opacity-80"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-80"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="islamic-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {t('founder.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('founder.cta.text')}
            </p>
            <motion.button
              className="islamic-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('founder.cta.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection; 