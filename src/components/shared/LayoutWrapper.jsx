import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClickSparkles from './ClickSparkles';
import MusicPlayer from './MusicPlayer';
import FloatingMascots from './FloatingMascots';
import CornerMascots from './CornerMascots';

// Generate static background stars once
function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
  }));
}

const LayoutWrapper = ({ children }) => {
  const [stars] = useState(() => generateStars(100));
  const [shootingStars, setShootingStars] = useState([]);

  // Spawn shooting stars periodically
  useEffect(() => {
    const spawn = () => {
      const star = {
        id: Date.now(),
        startX: Math.random() * 60,
        startY: Math.random() * 30,
        angle: 25 + Math.random() * 20,
        duration: 0.8 + Math.random() * 0.6,
      };
      setShootingStars(prev => [...prev.slice(-2), star]);
    };

    const interval = setInterval(spawn, 8000 + Math.random() * 4000);
    // First one after 3s
    const firstTimeout = setTimeout(spawn, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(firstTimeout);
    };
  }, []);

  return (
    <div className="layout-wrapper">
      <FloatingMascots />
      <CornerMascots />
      <MusicPlayer />
      <ClickSparkles />

      {/* Animated Starfield */}
      <div className="starfield-layer">
        {stars.map(star => (
          <div
            key={star.id}
            className="star-dot"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <AnimatePresence>
        {shootingStars.map(ss => (
          <motion.div
            key={ss.id}
            className="shooting-star"
            style={{
              left: `${ss.startX}%`,
              top: `${ss.startY}%`,
              transform: `rotate(${ss.angle}deg)`,
            }}
            initial={{ opacity: 0, x: 0, y: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 1, 0], x: 300, y: 200, scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ss.duration, ease: 'easeIn' }}
          />
        ))}
      </AnimatePresence>

      {/* Aurora Gradient Overlay */}
      <div className="aurora-layer" />

      <div className="content-layer">
        {children}
      </div>

      <style>{`
        .layout-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: linear-gradient(135deg, #0a0a1a 0%, #0d1b2e 30%, #1a0a2e 60%, #0f1922 100%);
        }

        /* Starfield */
        .starfield-layer {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        .star-dot {
          position: absolute;
          background: #fff;
          border-radius: 50%;
          animation: twinkle var(--dur, 3s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          opacity: 0.3;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Shooting Stars */
        .shooting-star {
          position: absolute;
          width: 80px; height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.9), rgba(255,255,255,0));
          border-radius: 2px;
          z-index: 2;
          pointer-events: none;
          box-shadow: 0 0 6px rgba(255,255,255,0.5);
        }

        /* Aurora */
        .aurora-layer {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          pointer-events: none;
          background: 
            radial-gradient(ellipse at 20% 0%, rgba(102, 126, 234, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 10%, rgba(196, 69, 105, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 90%, rgba(118, 75, 162, 0.08) 0%, transparent 50%);
          animation: auroraShift 20s ease-in-out infinite alternate;
        }
        @keyframes auroraShift {
          0% {
            background: 
              radial-gradient(ellipse at 20% 0%, rgba(102, 126, 234, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 10%, rgba(196, 69, 105, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 90%, rgba(118, 75, 162, 0.08) 0%, transparent 50%);
          }
          33% {
            background: 
              radial-gradient(ellipse at 60% 5%, rgba(255, 107, 157, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(247, 151, 30, 0.06) 0%, transparent 50%);
          }
          66% {
            background: 
              radial-gradient(ellipse at 40% 10%, rgba(118, 75, 162, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 30%, rgba(255, 107, 157, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
          }
          100% {
            background: 
              radial-gradient(ellipse at 70% 0%, rgba(102, 126, 234, 0.14) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 15%, rgba(196, 69, 105, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 85%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
          }
        }

        .content-layer {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default LayoutWrapper;
