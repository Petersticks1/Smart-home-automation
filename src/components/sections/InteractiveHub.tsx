import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

export const InteractiveHub = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Core Elements
  const deviceWrapperRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const sensorRef = useRef<HTMLDivElement>(null);
  const motherboardRef = useRef<HTMLDivElement>(null);
  const chassisRef = useRef<HTMLDivElement>(null);

  // Labels
  const label1Ref = useRef<HTMLDivElement>(null);
  const label2Ref = useRef<HTMLDivElement>(null);
  const label3Ref = useRef<HTMLDivElement>(null);
  const label4Ref = useRef<HTMLDivElement>(null);
  const scrolldownRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial hiding states
    gsap.set([label1Ref.current, label2Ref.current, label3Ref.current, label4Ref.current], { opacity: 0, scale: 0.8 });

    let mm = gsap.matchMedia();

    // ── DESKTOP: SENIOR DEVELOPER SEQUENTIAL SCRUB ──
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=350%',
          scrub: 1.5,
        }
      });

      // 1. Enter Isometric 3D
      tl.to(deviceWrapperRef.current, { rotateX: 55, rotateZ: -30, scale: 0.85, duration: 2, ease: 'power2.inOut' });

      // 2. Chassis base slide
      tl.to(chassisRef.current, { xPercent: 70, yPercent: 35, z: 0, duration: 2, ease: 'power2.inOut' }, "<");
      tl.to(scrolldownRef.current, { opacity: 0, duration: 0.5 }, 0);

      // 3. Display peels off first
      tl.to(displayRef.current, { xPercent: -140, yPercent: -70, z: 40, duration: 2, ease: 'power3.inOut' }, "+=0.2");
      tl.to(label1Ref.current, { x: -100, y: -150, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.5)' }, "<0.5");

      // 4. Sensor Plate peels off second
      tl.to(sensorRef.current, { xPercent: -70, yPercent: -35, z: 20, duration: 2, ease: 'power3.inOut' }, "+=0.3");
      tl.to(label2Ref.current, { x: -50, y: -40, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.5)' }, "<0.5");

      // 5. Motherboard
      tl.to(motherboardRef.current, { xPercent: 120, yPercent: -40, z: 15, duration: 2, ease: 'power3.inOut' }, "+=0.3");
      tl.to(label3Ref.current, { x: 100, y: 150, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.5)' }, "<0.2");

      tl.to(label4Ref.current, { x: 140, y: 250, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.5)' }, "<0.2");

      // Hold the final frame beautifully
      tl.to({}, { duration: 2 });
    });

    // ── MOBILE: TIGHTER SEQUENTIAL SCRUB ──
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=250%',
          scrub: 1.5,
        }
      });

      tl.to(deviceWrapperRef.current, { rotateX: 55, rotateZ: -20, scale: 0.65, duration: 2, ease: 'power2.inOut' });
      tl.to(chassisRef.current, { xPercent: 15, yPercent: 60, z: 0, duration: 2, ease: 'power2.inOut' }, "<");
      tl.to(scrolldownRef.current, { opacity: 0, duration: 0.5 }, 0);

      tl.to(displayRef.current, { xPercent: -30, yPercent: -120, z: 30, duration: 2, ease: 'power3.inOut' }, "+=0.2");
      tl.to(label1Ref.current, { y: -200, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.2)' }, "<0.5");

      tl.to(sensorRef.current, { xPercent: -15, yPercent: -60, z: 15, duration: 2, ease: 'power3.inOut' }, "+=0.3");
      tl.to(label2Ref.current, { y: -80, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.2)' }, "<0.5");

      tl.to(motherboardRef.current, { xPercent: 50, yPercent: -30, z: 15, duration: 2, ease: 'power3.inOut' }, "+=0.3");
      tl.to(label3Ref.current, { y: 150, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.2)' }, "<0.2");

      tl.to(label4Ref.current, { y: 240, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.2)' }, "<0.2");

      tl.to({}, { duration: 1.5 });
    });

  }, { scope: sectionRef });

  // ── 3D PARALLAX MOUSE TRACKING ──
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const { left, top, width, height } = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2); // -1 to 1
    const y = (e.clientY - top - height / 2) / (height / 2); // -1 to 1
    
    gsap.to(canvasRef.current, {
      rotationY: x * 8, // subtle rotation
      rotationX: y * -8,
      duration: 1,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    if (!canvasRef.current) return;
    gsap.to(canvasRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  return (
    <section ref={sectionRef} className="relative bg-surface-light dark:bg-black overflow-hidden">
      <div className="h-screen w-full flex flex-col justify-center items-center pt-24 pb-12">
        
        {/* Technical Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-20 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #0066CC 1.5px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Blueprint Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[80vw] h-[80vh] border border-[#0066CC] rounded-full blur-[100px]" />
          <div className="absolute w-[500px] h-[500px] border border-dashed border-[#0066CC]/40 rounded-full animate-[spin_120s_linear_infinite]" />
        </div>

        {/* Section Title */}
        <div className="relative z-20 text-center px-4 mb-8 md:mb-12 mt-4 pointer-events-none">
          <span className="inline-block text-brand-primary font-bold text-xs tracking-widest uppercase mb-2">
            Altair Central Hub
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-black dark:text-white mb-2">
            The Brain of Your Smart Home
          </h2>
          <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-sm md:text-base max-w-xl mx-auto">
            Scroll down to deconstruct the Altair Central Hub and explore the cutting-edge hardware that makes your home intelligent.
          </p>
        </div>

        {/* Interactive 3D Canvas Container */}
        <div 
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full max-w-6xl flex-grow max-h-[60vh] flex items-center justify-center perspective-[1200px]"
        >
          
          {/* Main 3D Device Wrapper */}
          <div
            ref={deviceWrapperRef}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-[180px] md:w-[240px] h-[180px] md:h-[240px] transition-shadow"
          >
            
            {/* ── LAYER 1: TOUCH DISPLAY ── */}
            <div
              ref={displayRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute inset-0 w-full h-full rounded-[30px] md:rounded-[40px] bg-white dark:bg-[#0A0A0A] border-4 border-slate-200 dark:border-slate-800 shadow-[0_0_40px_rgba(0,102,204,0.3)] flex flex-col justify-center items-center p-4 hover:shadow-[0_0_60px_rgba(0,102,204,0.5)] transition-shadow duration-500 cursor-crosshair z-40"
            >
              {/* Screen UI */}
              <div className="w-full h-full border border-[#0066CC]/30 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0066CC]/10 to-transparent">
                <Icon icon="ph:house-line-duotone" className="text-[#0066CC] text-4xl md:text-6xl mb-2" />
                <div className="text-xl md:text-3xl font-display font-light text-black dark:text-white">22°C</div>
                <div className="absolute top-3 right-4 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066CC] animate-pulse" />
                </div>
              </div>
            </div>

            {/* ── LAYER 2: SENSORS & LED RING ── */}
            <div
              ref={sensorRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute inset-0 w-full h-full rounded-[30px] md:rounded-[40px] bg-slate-900 border border-slate-700 shadow-lg flex items-center justify-center z-30"
            >
              <div className="w-[85%] h-[85%] rounded-full border-[6px] border-[#0066CC]/40 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,102,204,0.5)_inset]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-slate-700">
                    <Icon icon="ph:thermometer-bold" className="text-amber-500 text-sm" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-slate-700">
                    <Icon icon="ph:waves-bold" className="text-teal-400 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── LAYER 3: MOTHERBOARD / CPU ── */}
            <div
              ref={motherboardRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-xl bg-[#090D1A] border border-[#0066CC]/40 shadow-md p-3 flex flex-col justify-between z-20"
            >
              <div className="w-full h-12 md:h-16 bg-gradient-to-tr from-[#0066CC]/20 to-[#0066CC]/10 border border-[#0066CC] rounded-lg flex flex-col items-center justify-center p-1 shadow-lg shadow-[#0066CC]/20">
                <Icon icon="ph:cpu-fill" className="text-[#0066CC] mb-1 text-lg md:text-xl" />
                <span className="text-[6px] md:text-[8px] text-[#0066CC] font-mono font-bold tracking-widest">ALTAIR AI CORE</span>
              </div>
              
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-slate-800 rounded-sm border border-slate-700 flex items-center justify-center">
                  <Icon icon="ph:wifi-high-bold" className="text-slate-500 text-[10px]" />
                </div>
                <div className="w-10 h-6 bg-slate-800 rounded-sm border border-slate-700 flex items-center justify-center">
                  <Icon icon="ph:bluetooth-bold" className="text-slate-500 text-[10px]" />
                </div>
              </div>
            </div>

            {/* ── LAYER 4: MOUNTING CHASSIS ── */}
            <div
              ref={chassisRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute inset-0 w-full h-full rounded-[30px] md:rounded-[40px] bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-[8px] border-slate-800 shadow-2xl flex flex-col justify-between p-4 z-10"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-slate-700 flex items-center justify-center opacity-50">
                <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-dashed" />
              </div>

              <div className="flex justify-between items-end h-full opacity-40">
                <div className="w-3 h-3 rounded-full bg-black border border-slate-600" />
                <div className="w-3 h-3 rounded-full bg-black border border-slate-600" />
              </div>
            </div>

          </div>

          {/* ── FLOAT LABELS ── */}
          
          <div
            ref={label1Ref}
            className="absolute left-0 sm:left-4 md:left-[40px] lg:left-[100px] w-[130px] sm:w-[160px] md:w-[220px] bg-white dark:bg-[#0A0A0A]/95 border border-[#0066CC]/40 p-3 md:p-4 rounded-xl shadow-xl z-50 opacity-0 pointer-events-none sm:pointer-events-auto hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,102,204,0.2)] transition-all duration-300"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 text-[#0066CC]">
              <Icon icon="ph:monitor-bold" className="text-lg md:text-xl" />
              <h4 className="font-bold text-xs md:text-sm font-heading leading-tight">Edge-to-Edge Glass</h4>
            </div>
            <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-[9px] md:text-xs leading-relaxed hidden sm:block">
              Capacitive touch interface with anti-fingerprint coating. Instantly displays home status and controls.
            </p>
            <div className="absolute right-[-20px] sm:right-[-30px] md:right-[-60px] top-1/2 w-[20px] sm:w-[30px] md:w-[60px] h-[1px] bg-gradient-to-r from-[#0066CC] to-transparent border-t border-dashed border-[#0066CC]/50" />
          </div>

          <div
            ref={label2Ref}
            className="absolute right-0 sm:right-4 md:right-[40px] lg:right-[100px] w-[130px] sm:w-[160px] md:w-[220px] bg-white dark:bg-[#0A0A0A]/95 border border-amber-500/40 p-3 md:p-4 rounded-xl shadow-xl z-50 opacity-0 pointer-events-none sm:pointer-events-auto hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] transition-all duration-300"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 text-amber-500">
              <Icon icon="ph:radar-bold" className="text-lg md:text-xl" />
              <h4 className="font-bold text-xs md:text-sm font-heading leading-tight">Sensor Array</h4>
            </div>
            <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-[9px] md:text-xs leading-relaxed hidden sm:block">
              Millimeter-wave presence detection, ambient light mapping, and precision climate sensors.
            </p>
            <div className="absolute left-[-20px] sm:left-[-30px] md:left-[-60px] top-1/2 w-[20px] sm:w-[30px] md:w-[60px] h-[1px] bg-gradient-to-l from-amber-500 to-transparent border-t border-dashed border-amber-500/50" />
          </div>

          <div
            ref={label3Ref}
            className="absolute left-0 sm:left-4 md:left-[40px] lg:left-[100px] w-[130px] sm:w-[160px] md:w-[220px] bg-white dark:bg-[#0A0A0A]/95 border border-[#0066CC]/40 p-3 md:p-4 rounded-xl shadow-xl z-50 opacity-0 pointer-events-none sm:pointer-events-auto hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,102,204,0.2)] transition-all duration-300"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 text-[#0066CC]">
              <Icon icon="ph:cpu-bold" className="text-lg md:text-xl" />
              <h4 className="font-bold text-xs md:text-sm font-heading leading-tight">Altair AI Core</h4>
            </div>
            <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-[9px] md:text-xs leading-relaxed hidden sm:block">
              On-device machine learning for secure, lightning-fast automation without relying on the cloud.
            </p>
            <div className="absolute right-[-20px] sm:right-[-30px] md:right-[-60px] top-1/2 w-[20px] sm:w-[30px] md:w-[60px] h-[1px] bg-gradient-to-r from-[#0066CC] to-transparent border-t border-dashed border-[#0066CC]/50" />
          </div>

          <div
            ref={label4Ref}
            className="absolute right-0 sm:right-4 md:right-[40px] lg:right-[100px] w-[130px] sm:w-[160px] md:w-[220px] bg-white dark:bg-[#0A0A0A]/95 border border-slate-500/40 p-3 md:p-4 rounded-xl shadow-xl z-50 opacity-0 pointer-events-none sm:pointer-events-auto hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(148,163,184,0.1)] transition-all duration-300"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 text-slate-700 dark:text-slate-300">
              <Icon icon="ph:wall-bold" className="text-lg md:text-xl" />
              <h4 className="font-bold text-xs md:text-sm font-heading leading-tight">Aluminum Chassis</h4>
            </div>
            <p className="text-[#6B6B6B] dark:text-[#9E9E9E] text-[9px] md:text-xs leading-relaxed hidden sm:block">
              Aircraft-grade aluminum acts as a thermal heat sink and provides flush wall mounting.
            </p>
            <div className="absolute left-[-20px] sm:left-[-30px] md:left-[-60px] top-1/2 w-[20px] sm:w-[30px] md:w-[60px] h-[1px] bg-gradient-to-l from-slate-500 to-transparent border-t border-dashed border-slate-500/50" />
          </div>

        </div>

        {/* Scroll Indicator Dot */}
        <div ref={scrolldownRef} className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-[10px] text-black dark:text-white/40 uppercase tracking-widest font-mono">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-slate-400 dark:border-white/20 rounded-full flex justify-center p-1">
            <div 
              className="w-1.5 h-1.5 bg-[#0066CC] rounded-full animate-bounce" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};
