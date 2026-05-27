import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import faviconImage from '../../assets/favicon.png';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Ensure the animation is visible for at least 1.5 seconds so it doesn't flash abruptly
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
    // Wait for all assets (images, videos, styles) on the page to finish loading
    const windowLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', resolve);
      }
    });

    // When BOTH the minimum time has passed AND the window is fully loaded
    Promise.all([minLoadTime, windowLoad]).then(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    });

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0d14]"
        >
          {/* Circular Beating Animation Container */}
          <div className="relative flex items-center justify-center w-32 h-32 mb-10">
            {/* Rotating Circular Lines */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute inset-0 w-full h-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-primary opacity-50">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="40 20 10 20"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="15 15"
                  strokeLinecap="round"
                  className="opacity-60"
                />
              </svg>
            </motion.div>

            {/* Beating Heart / Logo */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="relative z-10 w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center backdrop-blur-sm"
            >
              <img 
                src={faviconImage} 
                alt="Altair Attic" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(0,102,204,0.8)]" 
              />
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
