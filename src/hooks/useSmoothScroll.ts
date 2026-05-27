import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Adjust for smoothness (lower = smoother)
      wheelMultiplier: 1,
    });

    // Synchronize Lenis scroll updates with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Run Lenis's requestAnimationFrame inside GSAP's ticker to keep everything perfectly synced
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing as recommended when using Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
}
