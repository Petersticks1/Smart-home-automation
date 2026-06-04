import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export interface ScrubberScene {
  time?: string;
  text: string;
}

interface VideoScrubberProps {
  id: string;
  frames: string[];
  scenes: ScrubberScene[];
  bgClassName?: string;
  transitionIndex?: number;
}

export function VideoScrubber({ id, frames, scenes, bgClassName = "bg-[#000B18]", transitionIndex = 99999 }: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndex = useRef({ current: 0 });
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const TOTAL_FRAMES = frames.length;

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || TOTAL_FRAMES === 0) return;
    
    // Preload image objects (synchronous access for canvas)
    const imageCache: Record<number, HTMLImageElement> = {};
    
    // Eagerly instantiate all images so they are ready before the user scrolls
    frames.forEach((url, index) => {
      const img = new Image();
      img.onload = () => {
        // If this image finishes decoding while we are currently scrubbing to it, force a render
        if (Math.floor(frameIndex.current.current) === index) {
          renderFrame(index);
        }
      };
      img.src = url;
      imageCache[index] = img;
    });

    const getImage = (index: number) => {
      return imageCache[index] || null;
    };
    
    // Wait for at least the first frame so we can render it immediately
    const firstImg = imageCache[0];
    if (firstImg) {
      if (firstImg.complete) {
        // Wrap in setTimeout to ensure ctx is available
        setTimeout(() => renderFrame(0), 0);
      } else {
        firstImg.addEventListener('load', () => renderFrame(0));
      }
    }
    
    const ctx = canvasRef.current.getContext('2d');
    
    const renderFrame = (idx: number) => {
      if (!ctx || !canvasRef.current) return;
      const canvas = canvasRef.current;
      
      const TRANSITION_FRAMES = 20;

      let aIdx = idx;
      if (aIdx >= transitionIndex) aIdx = transitionIndex - 1; 
      let bIdx = idx;
      if (bIdx < transitionIndex) bIdx = transitionIndex;

      const imgA = getImage(aIdx);
      const imgB = getImage(bIdx);

      const drawScaled = (img: HTMLImageElement, alpha: number, blendMode: GlobalCompositeOperation) => {
        if (!img.complete || img.naturalWidth === 0) return;
        
        ctx.globalAlpha = alpha;
        ctx.globalCompositeOperation = blendMode;
        
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvas.width / canvas.height;
        let drawW = canvas.width;
        let drawH = canvas.height;
        
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          if (imgAspect > 2.0) {
            drawH = canvas.width / (16/9);
            drawW = drawH * imgAspect;
          } else {
            if (canvasAspect > imgAspect) {
              drawH = canvas.height;
              drawW = canvas.height * imgAspect;
            } else {
              drawW = canvas.width;
              drawH = canvas.width / imgAspect;
            }
          }
        } else {
          if (canvasAspect > imgAspect) {
            drawH = canvas.height;
            drawW = canvas.height * imgAspect;
          } else {
            drawW = canvas.width;
            drawH = canvas.width / imgAspect;
          }
        }
        
        const x = (canvas.width - drawW) / 2;
        const y = (canvas.height - drawH) / 2;
        
        ctx.drawImage(img, x, y, drawW, drawH);
      };

      // Clear canvas
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render A
      if (imgA) {
        let opacityA = 1.0;
        if (idx >= transitionIndex) {
          const progress = (idx - transitionIndex) / TRANSITION_FRAMES;
          opacityA = Math.max(0, 1.0 - progress);
        }
        if (opacityA > 0) drawScaled(imgA, opacityA, 'source-over');
      }

      // Render B
      if (imgB) {
        let opacityB = 0.0;
        let blend: GlobalCompositeOperation = 'source-over';
        
        if (idx >= transitionIndex) {
          opacityB = 1.0;
        } else if (idx >= transitionIndex - TRANSITION_FRAMES) {
          const progress = (idx - (transitionIndex - TRANSITION_FRAMES)) / TRANSITION_FRAMES;
          opacityB = progress;
          blend = 'lighter'; // Additive Blending equivalent
        }
        
        if (opacityB > 0) drawScaled(imgB, opacityB, blend);
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        renderFrame(Math.floor(frameIndex.current.current));
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const gsapCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scenes.length * 100}%`,
          scrub: 1,
          pin: true,
          onUpdate: () => {
             renderFrame(Math.floor(frameIndex.current.current));
          }
        }
      });

      tl.to(frameIndex.current, {
        current: TOTAL_FRAMES - 1,
        ease: 'none',
        duration: 100
      }, 0);

      const sceneDuration = 100 / scenes.length;
      
      captionRefs.current.forEach((caption, index) => {
        if (!caption) return;
        const startTime = index * sceneDuration;
        
        tl.fromTo(caption, 
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: sceneDuration * 0.25, ease: "power3.out" },
          startTime
        );
        
        tl.to(caption, 
          { opacity: 0, y: -40, scale: 1.05, duration: sceneDuration * 0.25, ease: "power3.in" },
          startTime + (sceneDuration * 0.75)
        );
      });

    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsapCtx.revert();
    };
  }, [TOTAL_FRAMES, scenes.length, frames, transitionIndex]);

  if (TOTAL_FRAMES === 0) return null;

  return (
    <motion.div 
      id={id}
      ref={containerRef} 
      className={`w-full h-[100svh] ${bgClassName} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover" 
      />

      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000B18]/30 to-[#000B18]/90" />
      
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-6">
        {scenes.map((scene, i) => (
          <div 
            key={i}
            ref={el => { captionRefs.current[i] = el; }}
            className="absolute flex flex-col items-center text-center opacity-0 will-change-transform"
          >
            {scene.time && (
              <div className="text-amber-500 text-2xl md:text-4xl tracking-[0.3em] uppercase font-extrabold mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                {scene.time}
              </div>
            )}
            <h2 className="text-white font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight drop-shadow-2xl">
              {scene.text}
            </h2>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
