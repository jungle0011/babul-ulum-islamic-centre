'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  Star, 
  User, 
  MessageCircle, 
  Lightbulb, 
  GraduationCap,
  Sparkles,
  Eye,
  Brain,
  Target,
  Shield,
  Zap
} from 'lucide-react';

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Sparkles,
      title: t('services.mastery'),
      description: t('services.mastery.desc'),
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Heart,
      title: t('services.prayers'),
      description: t('services.prayers.desc'),
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Star,
      title: t('services.astrology'),
      description: t('services.astrology.desc'),
      color: 'from-yellow-500 to-yellow-700',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Brain,
      title: t('services.nature'),
      description: t('services.nature.desc'),
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50'
    },
    {
      icon: Target,
      title: t('services.consultations'),
      description: t('services.consultations.desc'),
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50'
    },
    {
      icon: Eye,
      title: t('services.illumination'),
      description: t('services.illumination.desc'),
      color: 'from-orange-500 to-orange-700',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Shield,
      title: t('services.education'),
      description: t('services.education.desc'),
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern-bg opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 gold-accent">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-500-400 mx-auto rounded-full"></div>
          <p className="text-xl text-white/80 mt-6 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card */}
              <div className="islamic-card p-8 h-full relative overflow-hidden group cursor-pointer card-hover">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>

                {/* Gold glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:to-yellow-500/5 transition-all duration-300"></div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-500/30 transition-all duration-300"></div>
              </div>

              {/* Floating accent */}
              <motion.div
                className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${service.color} rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-300`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              />
            </motion.div>
          ))}
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
              {t('services.cta.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('services.cta.text')}
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
              {t('services.cta.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection; 