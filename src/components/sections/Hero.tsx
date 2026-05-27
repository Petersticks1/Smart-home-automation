import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from '../ui/Button';
import smartHomeVideo from '../../assets/smart-home.mp4';

export function Hero({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getAnimation = (delay: number) => isReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: 'easeOut' as const }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement;
    // 1:45 is 105 seconds
    if (video.currentTime >= 105) {
      video.currentTime = 0;
      video.play().catch(console.error);
    }
  };

  return (
    <section id="home" className="min-h-[100svh] h-[100svh] relative flex items-center overflow-hidden text-white bg-black">
      {/* Background Video */}
      <video 
        src={smartHomeVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex flex-col items-center justify-center relative z-10 py-12 md:py-20 mt-16 md:mt-0 text-center">
        
        <div className="flex flex-col items-center">
          <motion.div 
            {...getAnimation(0.1)}
            className="bg-white/10 text-white backdrop-blur-sm text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-white/20"
          >
            Smart Home Automation
          </motion.div>
          
          <motion.h1 
            {...getAnimation(0.2)}
            className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 md:mb-6 drop-shadow-lg max-w-5xl"
          >
            Your Home. <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(0,102,204,0.5)]">Intelligent.</span> Effortless.
          </motion.h1>
          
          <motion.p 
            {...getAnimation(0.3)}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl drop-shadow-md mx-auto"
          >
            We automate lighting, security, climate, access control, and energy management — building smarter Nigerian homes from Abeokuta to Lagos.
          </motion.p>
          
          <motion.div 
            {...getAnimation(0.4)}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button variant="primary" onClick={onOpenConsultation} className="shadow-[0_0_20px_rgba(0,102,204,0.3)]">Get a Free Consultation</Button>
            <a href="#projects"><Button variant="outline" className="border-white/50 text-white hover:bg-white/10">See Our Projects</Button></a>
          </motion.div>

          <motion.div 
            {...getAnimation(0.5)}
            className="flex flex-wrap gap-6 mt-12 justify-center"
          >
            {['100% Nigerian-Built', 'IoT Certified', '3+ Years Experience'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm font-medium drop-shadow-md">
                <Icon icon="ph:check-circle-bold" className="text-brand-primary w-5 h-5 drop-shadow-[0_0_8px_rgba(0,102,204,0.8)]" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
