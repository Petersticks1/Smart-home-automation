import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
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

function Scene({ frameIndex, frameUrls, transitionIndex = 99999 }: { frameIndex: { current: number }, frameUrls: string[], transitionIndex: number }) {
  const meshA = useRef<THREE.Mesh>(null);
  const materialA = useRef<THREE.MeshBasicMaterial>(null);
  const meshB = useRef<THREE.Mesh>(null);
  const materialB = useRef<THREE.MeshBasicMaterial>(null);
  const { viewport } = useThree();
  const loader = useRef(new THREE.TextureLoader());

  useEffect(() => {
    const cacheKey = `_textureCache_${encodeURIComponent(frameUrls[0] || 'default')}`;
    
    (window as any)[`getScrubTexture_${cacheKey}`] = (index: number) => {
      const cache = (window as any)[cacheKey] || {};
      if (!(window as any)[cacheKey]) (window as any)[cacheKey] = cache;
      if (cache[index]) return cache[index];
      
      const url = frameUrls[index];
      if (!url) return null;

      const texture = loader.current.load(
        url, 
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = false; 
          tex.minFilter = THREE.LinearFilter;
        },
        undefined,
        () => {} 
      );
      
      cache[index] = texture;
      return texture;
    };
    
    return () => {
      const cache = (window as any)[cacheKey] || {};
      Object.values(cache).forEach((t: any) => t.dispose && t.dispose());
      (window as any)[cacheKey] = {};
    }
  }, [frameUrls]);

  useFrame(() => {
    const cacheKey = `_textureCache_${encodeURIComponent(frameUrls[0] || 'default')}`;
    const getTexture = (index: number) => (window as any)[`getScrubTexture_${cacheKey}`]?.(index);

    const idx = Math.floor(frameIndex.current);
    const TRANSITION_FRAMES = 20; // 20 frames of glowing crossfade

    let aIdx = idx;
    if (aIdx >= transitionIndex) aIdx = transitionIndex - 1; // Freeze A on its last frame
    
    let bIdx = idx;
    if (bIdx < transitionIndex) bIdx = transitionIndex; // Freeze B on its first frame
    
    const texA = getTexture(aIdx);
    const texB = getTexture(bIdx);

    const applyScale = (mesh: THREE.Mesh, texture: THREE.Texture) => {
      const img = texture.image as HTMLImageElement;
      const imgAspect = img.width / img.height;
      const viewportAspect = viewport.width / viewport.height;
      let scaleX = viewport.width;
      let scaleY = viewport.height;
      
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (imgAspect > 2.0) {
          scaleY = viewport.width / (16/9);
          scaleX = scaleY * imgAspect;
        } else {
          if (viewportAspect > imgAspect) {
            scaleY = viewport.height;
            scaleX = viewport.height * imgAspect;
          } else {
            scaleX = viewport.width;
            scaleY = viewport.width / imgAspect;
          }
        }
      } else {
        if (viewportAspect > imgAspect) {
          scaleY = viewport.height;
          scaleX = viewport.height * imgAspect;
        } else {
          scaleX = viewport.width;
          scaleY = viewport.width / imgAspect;
        }
      }
      mesh.scale.set(scaleX, scaleY, 1);
    };

    if (materialA.current && texA?.image && meshA.current) {
      materialA.current.map = texA;
      materialA.current.needsUpdate = true;
      applyScale(meshA.current, texA);
      
      if (idx < transitionIndex) {
        materialA.current.opacity = 1.0;
      } else {
        const progress = (idx - transitionIndex) / TRANSITION_FRAMES;
        materialA.current.opacity = Math.max(0, 1.0 - progress);
      }
    }

    if (materialB.current && texB?.image && meshB.current) {
      materialB.current.map = texB;
      materialB.current.needsUpdate = true;
      applyScale(meshB.current, texB);
      
      if (idx >= transitionIndex) {
        materialB.current.opacity = 1.0;
        materialB.current.blending = THREE.NormalBlending;
      } else if (idx >= transitionIndex - TRANSITION_FRAMES) {
        const progress = (idx - (transitionIndex - TRANSITION_FRAMES)) / TRANSITION_FRAMES;
        materialB.current.opacity = progress;
        // Creates a cinematic "glow" effect as it fades in over A
        materialB.current.blending = THREE.AdditiveBlending; 
      } else {
        materialB.current.opacity = 0.0;
      }
    }
  });

  return (
    <group>
      <mesh ref={meshA} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={materialA} color="#ffffff" transparent opacity={1} />
      </mesh>
      <mesh ref={meshB} position={[0, 0, 0.01]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial ref={materialB} color="#ffffff" transparent opacity={0} />
      </mesh>
    </group>
  );
}

export function VideoScrubber({ id, frames, scenes, bgClassName = "bg-[#000B18]", transitionIndex = 99999 }: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIndex = useRef(0);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const TOTAL_FRAMES = frames.length;

  useEffect(() => {
    if (!containerRef.current || TOTAL_FRAMES === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scenes.length * 100}%`,
          scrub: 1,
          pin: true,
        }
      });

      tl.to(frameIndex, {
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

    return () => ctx.revert();
  }, [TOTAL_FRAMES, scenes.length]);

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
      <Canvas 
        className="w-full h-full absolute top-0 left-0" 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: false }} 
      >
        <Scene frameIndex={frameIndex} frameUrls={frames} transitionIndex={transitionIndex} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000B18]/30 to-[#000B18]/90" />
      
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-6">
        {scenes.map((scene, i) => (
          <div 
            key={i}
            ref={el => { captionRefs.current[i] = el; }}
            className="absolute flex flex-col items-center text-center opacity-0 will-change-transform"
          >
            {scene.time && (
              <div className="text-amber-500 text-sm md:text-base tracking-[0.3em] uppercase font-semibold mb-4 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
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
