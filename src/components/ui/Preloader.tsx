import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faviconImage from '../../assets/favicon.webp';
import smartHomeVideo from '../../assets/smart-home.mp4';
import { ALL_NARRATIVE_FRAMES } from '../sections/SmartHomeNarrative';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading, including mobile touch events
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    
    // Ensure the animation is visible for at least 1.5 seconds
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
    // Gather all frame URLs from the Narrative component (which is optimized)
    const imageUrls = ALL_NARRATIVE_FRAMES;

    // Explicitly preload all scrubber images to prevent stiffness on first scroll
    const imagePromises = imageUrls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
        img.src = url;
      });
    });

    // Explicitly preload the hero background video
    const videoPromise = new Promise((resolve) => {
      const video = document.createElement('video');
      video.oncanplaythrough = resolve; 
      video.onerror = resolve;
      video.src = smartHomeVideo;
      video.load();
    });
    
    // Wait for the main DOM and stylesheets
    const windowLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', resolve);
      }
    });

    // Wait for ALL conditions to be met: min time, DOM loaded, all frames loaded, and video ready
    Promise.all([minLoadTime, windowLoad, videoPromise, ...imagePromises]).then(() => {
      setIsLoading(false);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';

      // Lazy preload the rest in the background
      setTimeout(() => {
        imageUrls.forEach(url => {
          const img = new Image();
          img.src = url;
        });
      }, 1000);
    });

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
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
