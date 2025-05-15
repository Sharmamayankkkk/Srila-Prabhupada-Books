import React from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import NewsletterSignup from '@/components/NewsletterSignup';
import { motion } from 'framer-motion';
import '../index.css';

const ComingSoon = () => {
  // Set the launch date to May 18, 2025 at 12:00 PM
  const launchDate = new Date("2025-05-18T12:00:00");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text pb-3">Coming Soon</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Our exciting new project is launching on May 18, 2025
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <CountdownTimer targetDate={launchDate} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Get notified when we launch!</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and be the first to know when our project goes live.
            </p>
            <NewsletterSignup />
          </div>
        </motion.div>
        
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 text-muted-foreground text-sm"
        >
          &copy; {new Date().getFullYear()} Prabhupada Verse Vault. All rights reserved.
        </motion.footer>
      </div>
    </div>
  );
};

export default ComingSoon;