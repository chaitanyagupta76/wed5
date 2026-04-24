'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Light {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
  xOffset: number;
}

export default function FallingLights() {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    const newLights = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      initialY: Math.random() * 120 - 10, // -10vh to 110vh
      duration: Math.random() * 15 + 15, // 15 to 30 seconds
      delay: Math.random() * 5, // 0 to 5 seconds
      size: Math.random() * 4 + 2, // 2px to 6px
      opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6
      xOffset: Math.random() * 100 - 50, // -50px to 50px drift
    }));
    setLights(newLights as any);
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (lights.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {lights.map((light: any) => (
        <motion.div
          key={light.id}
          className="absolute rounded-full"
          style={{
            left: `${light.left}%`,
            width: light.size,
            height: light.size,
            background: '#FAF0DC',
            boxShadow: `0 0 ${light.size * 3}px ${light.size}px rgba(212,168,87,0.5)`,
          }}
          initial={{ y: `${light.initialY}vh`, x: 0, opacity: 0 }}
          animate={{ 
            y: '110vh', 
            x: [0, light.xOffset, -light.xOffset, 0],
            opacity: [0, light.opacity, light.opacity, 0]
          }}
          transition={{
            y: { duration: light.duration, repeat: Infinity, ease: 'linear', delay: light.delay },
            x: { duration: light.duration / 2, repeat: Infinity, ease: 'easeInOut', delay: light.delay },
            opacity: { duration: light.duration, repeat: Infinity, ease: 'easeInOut', delay: light.delay }
          }}
        />
      ))}
    </div>
  );
}
