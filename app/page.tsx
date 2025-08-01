'use client';

import React from 'react';
import { LanguageProvider } from '../components/LanguageProvider';
import LanguageToggle from '../components/LanguageToggle';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FounderSection from '../components/FounderSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LatestPostsCarousel from '../components/LatestPostsCarousel';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <LatestPostsCarousel />
          <AboutSection />
          <ServicesSection />
          <FounderSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
} 