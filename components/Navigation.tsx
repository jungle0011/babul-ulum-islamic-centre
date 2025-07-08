'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
      
      // Active section detection
      const sections = ['home', 'about', 'services', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '/teachings', label: t('nav.teachings') },
    { href: 'https://selar.com/m/BabulUlumImamCentre', label: t('nav.bookshop'), external: true, ariaLabel: t('nav.bookshop') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    // Remove the # from href to get the section ID
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Close mobile menu first
      setIsOpen(false);
      
      // Add a small delay to ensure menu is closed before scrolling
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      console.warn(`Section with id "${sectionId}" not found`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`sticky-nav ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-yellow-500/20' 
          : 'bg-black/20 backdrop-blur-sm'
      } ${isVisible ? 'nav-visible' : 'nav-hidden'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 relative">
              <Image
                src="/babul-logo.jpg"
                alt="Babul Ulum Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold ${scrolled ? 'text-blue-800' : 'text-white'}`}>
                Babul Ulum
              </h1>
              <p className={`text-xs ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>Islamic Learning Centre</p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              item.external ? (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.ariaLabel || item.label}
                  className={`font-medium transition-colors relative group text-yellow-600 hover:text-yellow-700 min-h-[44px] min-w-[44px] flex items-center justify-center`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ) : item.href.startsWith('#') ? (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  aria-label={item.label}
                  className={`font-medium transition-colors relative group min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    activeSection === item.href.replace('#', '') 
                      ? 'text-blue-600' 
                      : scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-300 ${
                    activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </motion.button>
              ) : (
                <Link key={item.href} href={item.href} passHref legacyBehavior>
                  <motion.a
                    aria-label={item.label}
                    className={`font-medium transition-colors relative group min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-300'
                    }`}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('nav.closeMenu') || 'Close menu' : t('nav.openMenu') || 'Open menu'}
            className={`md:hidden p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} className={scrolled ? 'text-gray-700' : 'text-white'} /> : <Menu size={24} className={scrolled ? 'text-gray-700' : 'text-white'} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-yellow-500/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                item.external ? (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.a>
                ) : item.href.startsWith('#') ? (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ) : (
                  <Link key={item.href} href={item.href} passHref legacyBehavior>
                    <motion.a
                      aria-label={item.label}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation; 