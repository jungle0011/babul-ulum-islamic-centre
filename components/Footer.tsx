'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+2348063237436',
      link: 'tel:+2348063237436'
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'Babululumimam@gmail.com',
      link: 'mailto:Babululumimam@gmail.com'
    },
    {
      icon: MessageCircle,
      label: t('contact.whatsapp'),
      value: '+2348063237436',
      link: 'https://wa.me/2348063237436'
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern-bg opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/babul-logo.jpg"
                    alt="Babul Ulum Logo"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {t('footer.brand')}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {t('footer.subtitle')}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-500-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white font-bold">📚</span>
                </motion.div>
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white font-bold">🕌</span>
                </motion.div>
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-white font-bold">🌟</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gradient">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={link.href}>
                    <motion.button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 rtl:hover:-translate-x-1"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gradient">
                {t('footer.services')}
              </h4>
              <ul className="space-y-3">
                <li className="text-gray-400">{t('footer.service1')}</li>
                <li className="text-gray-400">{t('footer.service2')}</li>
                <li className="text-gray-400">{t('footer.service3')}</li>
                <li className="text-gray-400">{t('footer.service4')}</li>
                <li className="text-gray-400">{t('footer.service5')}</li>
                <li className="text-gray-400">{t('footer.service6')}</li>
                <li className="text-gray-400">{t('footer.service7')}</li>
                <li className="text-gray-400">{t('footer.service8')}</li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gradient">
                {t('footer.contactInfo')}
              </h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 rtl:space-x-reverse text-gray-400 hover:text-white transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-500-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{info.label}</p>
                      <p className="text-xs">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                {t('footer.rights')}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                <a 
                  href="https://sageverse.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors duration-300"
                >
                  {t('footer.powered')}
                </a>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <motion.a
                href="tel:+2348063237436"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:Babululumimam@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/2348063237436"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 