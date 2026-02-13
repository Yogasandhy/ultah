import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

// Heart-shaped constellation points (normalized 0-1 coordinates)
const HEART_STARS = [
    { x: 0.50, y: 0.30 },  // 0: top center dip
    { x: 0.35, y: 0.18 },  // 1: left hump
    { x: 0.20, y: 0.25 },  // 2: left side
    { x: 0.15, y: 0.40 },  // 3: left bottom curve
    { x: 0.25, y: 0.58 },  // 4: lower left
    { x: 0.38, y: 0.72 },  // 5: bottom left
    { x: 0.50, y: 0.82 },  // 6: bottom point
    { x: 0.62, y: 0.72 },  // 7: bottom right
    { x: 0.75, y: 0.58 },  // 8: lower right
    { x: 0.85, y: 0.40 },  // 9: right bottom curve
    { x: 0.80, y: 0.25 },  // 10: right side
    { x: 0.65, y: 0.18 },  // 11: right hump
];

// Connections that form the heart
const HEART_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0],
];

// Background decorative stars
function generateBgStars(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        twinkleDelay: Math.random() * 3,
        twinkleDuration: 2 + Math.random() * 2,
    }));
}

const ConstellationScreen = ({ onNext }) => {
    const [selectedStars, setSelectedStars] = useState([]);
    const [connections, setConnections] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [bgStars] = useState(() => generateBgStars(80));
    const [showFireworks, setShowFireworks] = useState(false);
    const canvasRef = useRef(null);

    const handleStarClick = (index) => {
        if (completed) return;
        if (selectedStars.includes(index)) return;

        const newSelected = [...selectedStars, index];
        setSelectedStars(newSelected);

        // Check if this creates a valid connection
        if (newSelected.length >= 2) {
            const lastTwo = [newSelected[newSelected.length - 2], newSelected[newSelected.length - 1]];
            const isValid = HEART_CONNECTIONS.some(
                ([a, b]) => (a === lastTwo[0] && b === lastTwo[1]) || (a === lastTwo[1] && b === lastTwo[0])
            );
            if (isValid) {
                setConnections(prev => [...prev, lastTwo]);
            }
        }

        // Check completion (all stars selected)
        if (newSelected.length >= HEART_STARS.length) {
            // Add final connection
            const finalConn = [newSelected[newSelected.length - 1], newSelected[0]];
            setConnections(prev => [...prev, finalConn]);
            setCompleted(true);
            setTimeout(() => setShowFireworks(true), 500);
        }
    };

    return (
        <div className="constellation-container">
            {showFireworks && <Confetti numberOfPieces={200} gravity={0.04} colors={['#FFD700', '#FF6B9D', '#667eea', '#ffd200', '#fff']} />}

            {/* Background stars */}
            {bgStars.map(star => (
                <motion.div
                    key={`bg-${star.id}`}
                    className="bg-star"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                        duration: star.twinkleDuration,
                        delay: star.twinkleDelay,
                        repeat: Infinity,
                    }}
                />
            ))}

            <motion.h1
                className="constellation-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                ⭐ Gambar Rasi Bintangmu ⭐
            </motion.h1>
            <p className="constellation-subtitle">
                {completed
                    ? '✨ Rasi Bintang Cinta telah terbentuk! ✨'
                    : `Tap bintang berurutan untuk menghubungkan! (${selectedStars.length}/${HEART_STARS.length})`}
            </p>

            {/* Interactive star area */}
            <div className="star-field" ref={canvasRef}>
                {/* Connection lines */}
                <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {connections.map(([a, b], i) => (
                        <motion.line
                            key={`line-${i}`}
                            x1={HEART_STARS[a].x * 100}
                            y1={HEART_STARS[a].y * 100}
                            x2={HEART_STARS[b].x * 100}
                            y2={HEART_STARS[b].y * 100}
                            stroke="rgba(255,215,0,0.7)"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            filter="url(#glow)"
                        />
                    ))}
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* Constellation stars */}
                {HEART_STARS.map((star, i) => {
                    const isSelected = selectedStars.includes(i);
                    const isNext = !completed && (
                        selectedStars.length === 0 ||
                        HEART_CONNECTIONS.some(
                            ([a, b]) =>
                                (a === selectedStars[selectedStars.length - 1] && b === i) ||
                                (b === selectedStars[selectedStars.length - 1] && a === i)
                        )
                    ) && !isSelected;

                    return (
                        <motion.div
                            key={`star-${i}`}
                            className={`constellation-star ${isSelected ? 'selected' : ''} ${isNext ? 'hint' : ''}`}
                            style={{
                                left: `${star.x * 100}%`,
                                top: `${star.y * 100}%`,
                            }}
                            onClick={() => handleStarClick(i)}
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.8 }}
                            animate={isSelected ? {
                                scale: [1, 1.4, 1],
                                boxShadow: '0 0 20px rgba(255,215,0,0.8)',
                            } : isNext ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                            } : {}}
                            transition={isNext ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
                        >
                            {isSelected && (
                                <motion.span
                                    className="star-label"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    ⭐
                                </motion.span>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {completed && (
                    <motion.button
                        className="constellation-btn"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: 'spring' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                    >
                        Menuju Grand Finale! 🎂
                    </motion.button>
                )}
            </AnimatePresence>

            <style>{`
        .constellation-container {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100vh; width: 100vw;
          background: radial-gradient(ellipse at center, #0d1b2a 0%, #070d15 100%);
          color: #fff; position: relative;
          overflow: hidden; padding: 20px;
        }
        .bg-star {
          position: absolute;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
        }
        .constellation-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          margin-bottom: 6px;
          text-shadow: 0 0 20px rgba(255,215,0,0.5);
          z-index: 10;
        }
        .constellation-subtitle {
          opacity: 0.7; font-size: 0.95rem;
          margin-bottom: 15px; z-index: 10;
        }
        .star-field {
          position: relative;
          width: min(400px, 85vw);
          height: min(400px, 85vw);
          z-index: 10;
        }
        .connection-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
        }
        .constellation-star {
          position: absolute;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          border: 2px solid rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          cursor: pointer; z-index: 5;
          display: flex; align-items: center; justify-content: center;
        }
        .constellation-star.selected {
          background: #FFD700;
          border-color: #FFD700;
        }
        .constellation-star.hint {
          background: rgba(255,215,0,0.3);
          border-color: rgba(255,215,0,0.5);
        }
        .star-label { font-size: 0.9rem; }
        .constellation-btn {
          margin-top: 20px; z-index: 10;
          padding: 16px 35px; font-size: 1.1rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #FFD700, #f7971e);
          color: #333; font-weight: bold;
          box-shadow: 0 8px 25px rgba(255,215,0,0.3);
          font-family: var(--font-heading);
        }
      `}</style>
        </div>
    );
};

export default ConstellationScreen;
