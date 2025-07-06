'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Eye, Users, BookOpen } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Target,
      title: t('about.mission'),
      description: t('about.mission.text'),
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Eye,
      title: t('about.vision'),
      description: t('about.vision.text'),
      color: 'from-yellow-500 to-yellow-500-600'
    },
    {
      icon: Users,
      title: t('about.community'),
      description: t('about.community.text'),
      color: 'from-green-500 to-green-700'
    },
    {
      icon: BookOpen,
      title: t('about.excellence'),
      description: t('about.excellence.text'),
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-500-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="islamic-card p-8 text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Left side - Text */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900">
              {t('about.legacy.title')}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.legacy.text1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.legacy.text2')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-sm text-gray-600">{t('about.stats.students')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">10+</div>
                <div className="text-sm text-gray-600">{t('about.stats.years')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">7</div>
                <div className="text-sm text-gray-600">{t('about.stats.services')}</div>
              </div>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="relative">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-blue-800/80 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{t('about.wisdom.title')}</h4>
                  <p className="text-white/80">{t('about.wisdom.subtitle')}</p>
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
    </section>
  );
};

export default AboutSection; 