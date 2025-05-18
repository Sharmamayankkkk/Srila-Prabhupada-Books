import React, { useState, useEffect } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import NewsletterSignup from '@/components/NewsletterSignup';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../index.css';

const BirthdayPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-xl relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-400"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-yellow-400"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-yellow-400"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-400"></div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
          aria-label="Close popup"
        >
          &times;
        </button>

        {/* Decorative portrait frame */}
        <div className="relative mx-auto mb-6 p-3 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100 rounded-lg shadow-lg">
          <div className="border-4 border-yellow-600 p-1 bg-yellow-50">
            <div className="border-2 border-yellow-400 p-1">
              <div className="relative w-76 h-64 mx-auto overflow-hidden">
                <img
                  src="/pictures/Gurudev-3.jpg"
                  alt="Gurudev"
                  className="w-full h-full object-cover"
                />
                {/* Subtle inner shadow overlay for depth */}
                <div className="absolute inset-0 shadow-inner"></div>
              </div>
            </div>
          </div>

          {/* Decorative ornaments at frame corners */}
          <div className="absolute top-0 left-0 w-6 h-6 bg-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-600 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 bg-yellow-600 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-yellow-600 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <h2 className="text-3xl font-bold mb-3 text-yellow-700">Happy Birthday Gurudev!</h2>
        {/* <p className="text-gray-700 text-lg">
          Wishing His Divine Grace a joyous birthday filled with blessings and grace.
        </p> */}
        <p className="text-gray-700 text-lg mt-4">
          Happy Krishna Consciousness Birthday, Gurudev! On this auspicious day, we honor the divine life and teachings of His Grace, whose mission brought the timeless wisdom of the Vedas to the world.          <a
            href="https://www.krishnaconsciousnesssociety.com/h-g-gsd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 underline hover:text-yellow-800 ml-1"
          >
            Read More
          </a>
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center my-4">
          <div className="h-px w-16 bg-yellow-300"></div>
          <div className="mx-2 text-yellow-500">✨</div>
          <div className="h-px w-16 bg-yellow-300"></div>
        </div>
      </div>
    </div>
  );
};

const ComingSoon = () => {
  const launchDate = new Date("2025-05-18T12:00:00");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup only on May 15th
    const today = new Date();
    const birthdayMonth = 4; // May is month 4 (0-indexed)
    const birthdayDate = 18;

    if (today.getMonth() === birthdayMonth && today.getDate() === birthdayDate) {
      const lastShown = localStorage.getItem('gurudevBirthdayPopupLastShown');
      const now = Date.now();

      if (!lastShown || now - parseInt(lastShown, 10) > 3600000) { // 1 hour
        setShowPopup(true);
        localStorage.setItem('gurudevBirthdayPopupLastShown', now.toString());
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative pt-24 md:pt-32">
      <div className="w-full max-w-5xl mx-auto text-center">

        {/* Responsive Logo */}
        <div className="absolute top-6 left-6">
          <img
            src="/pictures/KCS-Logo.png"
            alt="KCS Logo"
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-full"
          />
        </div>

        {/* Responsive Srila Prabhupada photo */}
        {/* <div className="flex flex-col items-center mb-6">
          <img
            src="/pictures/Srila-Prabhupada.png"
            alt="Srila Prabhupada"
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg shadow-md object-cover"
          />
        </div>  */}

        <div className="hero-image relative flex justify-center items-center mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-300/20 rounded-full blur-3xl transform scale-90"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 shadow-xl transform rotate-3"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-amber-50 to-white shadow-xl transform -rotate-3"></div>
              <div className="relative h-full w-full rounded-2xl p-3 bg-white shadow-lg overflow-hidden">
                <img
                  src="/pictures/Srila-Prabhupada.png"
                  alt="Srila Prabhupada"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                  <p className="text-white text-center font-heading text-lg">
                    His Divine Grace A.C. Bhaktivedanta Swami Prabhupada
                  </p>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-primary/20 rounded-full"></div>
              <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-orange-300/20 rounded-full"></div>
            </div>
          </motion.div>
        </div>


        {/* Meaningful paragraph */}
        <div className="mb-10">
          <p className="text-lg italic text-muted-foreground max-w-2xl mx-auto px-4">
            Inspired by the teachings of His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada, we are building a digital sanctuary to preserve and share timeless Vedic wisdom for generations to come.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <CountdownTimer targetDate={launchDate} className="w-full max-w-md mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Be Part of Our Journey</h2>
            <p className="text-muted-foreground mb-6">
              Enter your email to receive launch updates and join us in this devotional initiative from the very beginning.
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

      {showPopup && <BirthdayPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ComingSoon;
