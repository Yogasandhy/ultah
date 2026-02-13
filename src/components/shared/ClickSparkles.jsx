import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickSparkles = () => {
    const [bursts, setBursts] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const hearts = Array.from({ length: 8 }, (_, i) => ({
                id: Date.now() + i,
                x: e.clientX,
                y: e.clientY,
                angle: (360 / 8) * i,
                emoji: i % 3 === 0 ? '💖' : i % 3 === 1 ? '✨' : '💕',
                distance: 40 + Math.random() * 40,
                size: 0.7 + Math.random() * 0.6,
            }));
            setBursts(prev => [...prev.slice(-24), ...hearts]);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Cleanup old bursts
    useEffect(() => {
        if (bursts.length === 0) return;
        const cleanup = setTimeout(() => {
            setBursts(prev => prev.slice(8));
        }, 1200);
        return () => clearTimeout(cleanup);
    }, [bursts.length]);

    return (
        <div className="sparkle-layer">
            <AnimatePresence>
                {bursts.map(heart => {
                    const rad = (heart.angle * Math.PI) / 180;
                    const dx = Math.cos(rad) * heart.distance;
                    const dy = Math.sin(rad) * heart.distance;

                    return (
                        <motion.div
                            key={heart.id}
                            className="heart-particle"
                            style={{
                                left: heart.x,
                                top: heart.y,
                                fontSize: `${heart.size}rem`,
                            }}
                            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                            animate={{
                                opacity: [1, 1, 0],
                                x: dx,
                                y: dy,
                                scale: [0, 1.2, 0.5],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            {heart.emoji}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            <style>{`
        .sparkle-layer {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        .heart-particle {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          user-select: none;
        }
      `}</style>
        </div>
    );
};

export default ClickSparkles;
