import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1140; 
const FRAME_PREFIX = '/frames/frame_';
const FRAME_EXT = '.jpg';

const pad = (num: number, size: number) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const SCENES = [
  { time: "05:30 AM", text: "Dawn Exterior Awakening" },
  { time: "06:15 AM", text: "Automated Curtains Opening" },
  { time: "07:00 AM", text: "Smart Lighting Activating" },
  { time: "07:45 AM", text: "Kitchen Systems Powering On" },
  { time: "08:30 AM", text: "Security Automation Engaged" },
  { time: "06:45 PM", text: "Sunset Return Sequence" },
  { time: "08:15 PM", text: "Evening Ambient Lighting" },
  { time: "11:00 PM", text: "Night Security Mode Active" }
];

function Scene({ frameIndex }: { frameIndex: { current: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { viewport } = useThree();
  const loader = useRef(new THREE.TextureLoader());

  useEffect(() => {
    (window as any).getScrubTexture = (index: number) => {
      const cache = (window as any)._textureCache || {};
      if (!(window as any)._textureCache) (window as any)._textureCache = cache;

      if (cache[index]) return cache[index];
      
      const url = `${FRAME_PREFIX}${pad(index, 4)}${FRAME_EXT}`;
      const texture = loader.current.load(
        url, 
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = false; 
          tex.minFilter = THREE.LinearFilter;
        },
        undefined,
        () => {} // suppress errors if frames are missing
      );
      
      cache[index] = texture;
      return texture;
    };
    
    return () => {
      const cache = (window as any)._textureCache || {};
      Object.values(cache).forEach((t: any) => t.dispose());
      (window as any)._textureCache = {};
    }
  }, []);

  useFrame(() => {
    if (materialRef.current && (window as any).getScrubTexture) {
      const idx = Math.floor(frameIndex.current);
      const texture = (window as any).getScrubTexture(idx);
      if (texture && texture.image) {
        materialRef.current.map = texture;
        materialRef.current.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={materialRef} color="#000b18" transparent opacity={1} />
    </mesh>
  );
}

export function FrameScrubber({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIndex = useRef(0);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=800%', // Long scroll duration for buttery smoothness
          scrub: 1, // Smooth interpolation (1 second lag)
          pin: true,
        }
      });

      // Animate frame index across entire scroll range
      tl.to(frameIndex, {
        current: TOTAL_FRAMES - 1,
        ease: 'none',
        duration: 100
      }, 0);

      // Animate cinematic captions
      const sceneDuration = 100 / SCENES.length;
      
      captionRefs.current.forEach((caption, index) => {
        if (!caption) return;
        const startTime = index * sceneDuration;
        
        // Apple-style fade up and in
        tl.fromTo(caption, 
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: sceneDuration * 0.25, ease: "power3.out" },
          startTime
        );
        
        // Hold, then fade up and out
        tl.to(caption, 
          { opacity: 0, y: -40, scale: 1.05, duration: sceneDuration * 0.25, ease: "power3.in" },
          startTime + (sceneDuration * 0.75)
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      className="w-full h-screen bg-[#000B18] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <Canvas 
        className="w-full h-full absolute top-0 left-0" 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: false }} 
      >
        <Scene frameIndex={frameIndex} />
      </Canvas>

      {/* Cinematic Deep Navy Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000B18]/30 to-[#000B18]/90" />
      
      {/* Cinematic Captions */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-6">
        {SCENES.map((scene, i) => (
          <div 
            key={i}
            ref={el => { captionRefs.current[i] = el; }}
            className="absolute flex flex-col items-center text-center opacity-0 will-change-transform"
          >
            <div className="text-amber-500 text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              {scene.time}
            </div>
            <h2 className="text-white font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight drop-shadow-2xl">
              {scene.text}
            </h2>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-40">
        {children}
      </div>

      {/* Fallback Display if no frames exist yet */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-20 mix-blend-overlay pb-12">
        <div className="text-center opacity-40">
          <p className="text-amber-500/50 text-xs tracking-[0.3em] uppercase font-mono mb-2">
            Awaiting Video Sequence
          </p>
          <p className="text-white/30 text-[10px] font-mono">
            Requires {TOTAL_FRAMES} frames in /public/frames/
          </p>
        </div>
      </div>
    </motion.div>
  );
}
