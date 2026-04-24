'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Transition } from 'framer-motion';

interface SplashProps {
  translations: any;
  onFinish?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sky Lantern Component (copied from Hero.tsx)
// ─────────────────────────────────────────────────────────────────────────────
function SkyLantern({ size = 48, uid }: { size?: number; uid: string }) {
  const id = uid;
  const w = size;
  const h = Math.round(size * 1.35);
  return (
    <svg width={w} height={h} viewBox="0 0 48 65" fill="none">
      <ellipse cx="24" cy="36" rx="22" ry="26" fill={`url(#og${id})`} />
      <rect x="7" y="12" width="34" height="40" rx="17" fill={`url(#body${id})`} />
      <rect x="11" y="8" width="26" height="8" rx="4" fill="#BE5E0A" />
      <rect x="11" y="50" width="26" height="8" rx="4" fill="#BE5E0A" />
      <ellipse cx="24" cy="34" rx="13" ry="18" fill={`url(#inner${id})`} />
      <ellipse cx="18" cy="28" rx="4" ry="9" fill="rgba(255,240,180,0.35)" />
      <line x1="24" y1="0" x2="24" y2="8" stroke="#BE5E0A" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <radialGradient id={`og${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="#FFD060" stopOpacity="0.55" />
          <stop offset="70%"  stopColor="#FF8C1A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`body${id}`} x1="7" y1="12" x2="41" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FFC14D" />
          <stop offset="50%"  stopColor="#FF8C1A" />
          <stop offset="100%" stopColor="#C85A00" />
        </linearGradient>
        <radialGradient id={`inner${id}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%"   stopColor="#FFF0B0" stopOpacity="1" />
          <stop offset="50%"  stopColor="#FFD060" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFAA33" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

interface LanternConfig {
  size: number;
  style: React.CSSProperties;
  animate: { y?: number[]; rotate?: number[]; opacity?: number[]; scale?: number[] };
  transition: Transition;
}

const LANTERNS: LanternConfig[] = [
  { size: 100, style: { left: '-1%',  top: '12%' }, animate: { y:[0,-22,0], rotate:[-5,5,-5],  opacity:[0.85,1,0.85] }, transition:{ duration:7,   delay:0,   repeat:Infinity, ease:'easeInOut' } },
  { size: 76,  style: { left: '4%',   top: '42%' }, animate: { y:[0,-18,0], rotate:[-4,4,-4],  opacity:[0.8,1,0.8]   }, transition:{ duration:8.5, delay:1.2, repeat:Infinity, ease:'easeInOut' } },
  { size: 56,  style: { left: '2%',   top: '68%' }, animate: { y:[0,-14,0], rotate:[-3,3,-3],  opacity:[0.75,1,0.75] }, transition:{ duration:6.5, delay:0.4, repeat:Infinity, ease:'easeInOut' } },
  { size: 44,  style: { left: '10%',  top: '28%' }, animate: { y:[0,-12,0], rotate:[-3,2,-3],  opacity:[0.7,0.9,0.7] }, transition:{ duration:7.5, delay:2.1, repeat:Infinity, ease:'easeInOut' } },
  { size: 32,  style: { left: '14%',  top: '6%'  }, animate: { y:[0,-10,0], rotate:[-2,2,-2],  opacity:[0.6,0.85,0.6]}, transition:{ duration:9,   delay:1.5, repeat:Infinity, ease:'easeInOut' } },
  { size: 26,  style: { left: '18%',  top: '54%' }, animate: { y:[0,-8,0],  rotate:[-2,2,-2],  opacity:[0.55,0.8,0.55]},transition:{ duration:7,   delay:3,   repeat:Infinity, ease:'easeInOut' } },
  { size: 88,  style: { right:'-1%',  top: '8%'  }, animate: { y:[0,-20,0], rotate:[5,-5,5],   opacity:[0.9,1,0.9]   }, transition:{ duration:8,   delay:0.7, repeat:Infinity, ease:'easeInOut' } },
  { size: 70,  style: { right:'3%',   top: '38%' }, animate: { y:[0,-16,0], rotate:[4,-4,4],   opacity:[0.8,1,0.8]   }, transition:{ duration:9,   delay:1.8, repeat:Infinity, ease:'easeInOut' } },
  { size: 50,  style: { right:'1%',   top: '65%' }, animate: { y:[0,-13,0], rotate:[3,-3,3],   opacity:[0.75,0.95,0.75]},transition:{ duration:6,  delay:0.2, repeat:Infinity, ease:'easeInOut' } },
  { size: 38,  style: { right:'9%',   top: '22%' }, animate: { y:[0,-11,0], rotate:[2,-2,2],   opacity:[0.65,0.9,0.65]},transition:{ duration:7,  delay:2.5, repeat:Infinity, ease:'easeInOut' } },
  { size: 28,  style: { right:'16%',  top: '4%'  }, animate: { y:[0,-9,0],  rotate:[2,-2,2],   opacity:[0.6,0.8,0.6] }, transition:{ duration:8.5, delay:1,   repeat:Infinity, ease:'easeInOut' } },
  { size: 22,  style: { right:'20%',  top: '58%' }, animate: { y:[0,-7,0],  rotate:[1,-1,1],   opacity:[0.5,0.75,0.5]}, transition:{ duration:7,  delay:3.5, repeat:Infinity, ease:'easeInOut' } },
  { size: 18,  style: { left:'30%',   top: '3%'  }, animate: { y:[0,-6,0],  opacity:[0.4,0.65,0.4] },                    transition:{ duration:6,   delay:0.5, repeat:Infinity, ease:'easeInOut' } },
  { size: 16,  style: { left:'42%',   top: '88%' }, animate: { y:[0,-5,0],  opacity:[0.4,0.6,0.4]  },                    transition:{ duration:7.5, delay:2,   repeat:Infinity, ease:'easeInOut' } },
  { size: 20,  style: { right:'32%',  top: '2%'  }, animate: { y:[0,-6,0],  opacity:[0.45,0.65,0.45]},                   transition:{ duration:8,   delay:1.2, repeat:Infinity, ease:'easeInOut' } },
  { size: 14,  style: { right:'40%',  top: '92%' }, animate: { y:[0,-5,0],  opacity:[0.35,0.55,0.35]},                   transition:{ duration:6.5, delay:0.8, repeat:Infinity, ease:'easeInOut' } },
];

export default function Splash({ translations, onFinish }: SplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';

    // Hide splash after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      if (onFinish) {
        setTimeout(onFinish, 1000); // Wait for fade out animation before unmounting
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  // Extract first letter for splash logo safely for unicode
  const groomInitial = translations.brideGroom?.groom ? Array.from(translations.brideGroom.groom as string)[0] : 'G';
  const brideInitial = translations.brideGroom?.bride ? Array.from(translations.brideGroom.bride as string)[0] : 'B';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background gradient matching Hero */}
          <div className="absolute inset-0 z-0"
            style={{ background: 'linear-gradient(170deg, #6E8FA3 0%, #3A5A6F 35%, #4A6A7F 55%, #D4904A 80%, #C0703A 100%)' }}
          />

          {/* Warm ground glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-[55%]"
              style={{ background: 'linear-gradient(to top, rgba(212,144,74,0.65) 0%, rgba(192,112,58,0.35) 40%, transparent 100%)' }}
            />
            <div className="absolute bottom-[15%] left-0 right-0 h-32 blur-3xl"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,200,80,0.3) 0%, transparent 70%)' }}
            />
          </div>

          {/* Animated Sky Lanterns */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {LANTERNS.map((l, i) => (
              <motion.div key={i} className="absolute" style={l.style}
                animate={l.animate} transition={l.transition}>
                <SkyLantern size={l.size} uid={`splash-l${i}`} />
              </motion.div>
            ))}
          </div>

          {/* Overlay to dim the background slightly for text readability */}
          <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="relative z-20 text-center px-4"
          >
            <div className="relative w-16 h-16 mx-auto mb-6 opacity-90 drop-shadow-[0_0_15px_rgba(212,168,87,0.8)]">
              <Image src="/site_images/flower2.png" alt="logo" fill className="object-contain" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-[#FDFBF7] mb-6 tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              {groomInitial} &amp; {brideInitial}
            </h1>
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#D4A857] to-transparent mx-auto mb-8 shadow-[0_0_10px_rgba(212,168,87,0.8)]" />
            <p className="text-white/90 font-sans text-xs md:text-sm tracking-[0.3em] uppercase max-w-sm mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold">
              {translations.common?.welcome || 'Welcome to our beautiful beginning'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
