import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faviconImage from '../../assets/favicon.webp';
import smartHomeVideo from '../../assets/smart-home.mp4';

// Pre-fetch all scrubber frames via Vite's glob import
const rawMorning = import.meta.glob('../../assets/ezgif-38fa852f1ff2fb3e-jpg/*.webp', { eager: true, query: '?url', import: 'default' });
const rawAppliance = import.meta.glob('../../assets/ezgif-1354f6978a4e68c0-jpg/*.webp', { eager: true, query: '?url', import: 'default' });

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading, including mobile touch events
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    
    // Ensure the animation is visible for at least 1.5 seconds
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
    // Gather all frame URLs
    const imageUrls = [
      ...Object.values(rawMorning) as string[],
      ...Object.values(rawAppliance) as string[]
    ];

    // Only block the preloader on the FIRST frame of each sequence
    const criticalImages = [
      (Object.values(rawMorning) as string[])[0],
      (Object.values(rawAppliance) as string[])[0],
    ].filter(Boolean);

    // Explicitly preload critical images, with a 2-second timeout fallback
    const imagePromises = criticalImages.map(url => {
      const loadPromise = new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });
      return Promise.race([loadPromise, new Promise(res => setTimeout(res, 2000))]);
    });

    // Explicitly preload the hero background video (wait for first frame data), with a 3-second timeout fallback
    const loadVideoPromise = new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadeddata = resolve; // Faster than oncanplaythrough
      video.onerror = resolve;
      video.src = smartHomeVideo;
      video.load();
    });
    const videoPromise = Promise.race([loadVideoPromise, new Promise(res => setTimeout(res, 3000))]);
    
    // Wait for the main DOM and stylesheets, with a 3-second timeout fallback
    const loadWindowPromise = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', resolve);
      }
    });
    const windowLoad = Promise.race([loadWindowPromise, new Promise(res => setTimeout(res, 3000))]);

    // Wait for ALL conditions to be met: min time, DOM loaded, first frames loaded, and video ready
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
