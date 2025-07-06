'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-24 h-24 mx-auto mb-6 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-4 border-yellow-500/30 border-t-yellow-500"></div>
          <div className="absolute inset-2 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-pulse"></div>
        </motion.div>
        
        <motion.div
          className="w-16 h-16 mx-auto mb-4 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/babul-logo.jpg"
            alt="Babul Ulum Logo"
            fill
            className="rounded-full object-cover"
          />
        </motion.div>
        
        <motion.h2
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Babul Ulum
        </motion.h2>
        
        <motion.p
          className="text-yellow-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 