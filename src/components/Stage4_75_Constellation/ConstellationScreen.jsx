import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const HEART_STARS = [
    { x: 0.50, y: 0.30 }, { x: 0.35, y: 0.18 }, { x: 0.20, y: 0.25 },
    { x: 0.15, y: 0.40 }, { x: 0.25, y: 0.58 }, { x: 0.38, y: 0.72 },
    { x: 0.50, y: 0.82 }, { x: 0.62, y: 0.72 }, { x: 0.75, y: 0.58 },
    { x: 0.85, y: 0.40 }, { x: 0.80, y: 0.25 }, { x: 0.65, y: 0.18 },
];

const HEART_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0],
];

function generateBgStars(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        twinkleDelay: Math.random() * 5,
        twinkleDuration: 2 + Math.random() * 3,
    }));
}

const ConstellationScreen = ({ onNext }) => {
    const [selectedStars, setSelectedStars] = useState([]);
    const [connections, setConnections] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [bgStars] = useState(() => generateBgStars(60));
    const [showFireworks, setShowFireworks] = useState(false);

    const handleStarClick = (index) => {
        if (completed || selectedStars.includes(index)) return;

        const newSelected = [...selectedStars, index];
        setSelectedStars(newSelected);

        if (newSelected.length >= 2) {
            const lastTwo = [newSelected[newSelected.length - 2], newSelected[newSelected.length - 1]];
            const isValid = HEART_CONNECTIONS.some(
                ([a, b]) => (a === lastTwo[0] && b === lastTwo[1]) || (a === lastTwo[1] && b === lastTwo[0])
            );
            if (isValid) setConnections(prev => [...prev, lastTwo]);
        }

        if (newSelected.length >= HEART_STARS.length) {
            const finalConn = [newSelected[newSelected.length - 1], newSelected[0]];
            setConnections(prev => [...prev, finalConn]);
            setCompleted(true);
            setTimeout(() => setShowFireworks(true), 500);
        }
    };

    return (
        <div className="constellation-container">
            {showFireworks && <Confetti numberOfPieces={200} gravity={0.04} colors={['#FFD700', '#f472b6', '#a78bfa']} />}

            {bgStars.map(star => (
                <motion.div
                    key={`bg-${star.id}`}
                    className="bg-star"
                    style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: star.twinkleDuration, delay: star.twinkleDelay, repeat: Infinity }}
                />
            ))}

            <motion.div className="header-content" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="constellation-title">⭐ rasi bintangmu ⭐</h1>
                <p className="constellation-subtitle">
                    {completed ? '✨ rasi bintang cinta terbentuk! ✨' : `tap bintang berurutan ya! (${selectedStars.length}/${HEART_STARS.length})`}
                </p>
            </motion.div>

            <div className="star-field">
                <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {connections.map(([a, b], i) => (
                        <motion.line
                            key={`line-${i}`}
                            x1={HEART_STARS[a].x * 100} y1={HEART_STARS[a].y * 100}
                            x2={HEART_STARS[b].x * 100} y2={HEART_STARS[b].y * 100}
                            stroke="rgba(251,191,36,0.6)" strokeWidth="0.6"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    ))}
                </svg>

                {HEART_STARS.map((star, i) => {
                    const isSelected = selectedStars.includes(i);
                    const isNext = !completed && (selectedStars.length === 0 || HEART_CONNECTIONS.some(([a, b]) => (a === selectedStars[selectedStars.length - 1] && b === i) || (b === selectedStars[selectedStars.length - 1] && a === i))) && !isSelected;

                    return (
                        <motion.div
                            key={`star-${i}`}
                            className={`constellation-star ${isSelected ? 'selected' : ''} ${isNext ? 'hint' : ''}`}
                            style={{ left: `${star.x * 100}%`, top: `${star.y * 100}%` }}
                            onClick={() => handleStarClick(i)}
                            whileTap={{ scale: 0.8 }}
                            animate={isSelected ? { scale: [1, 1.3, 1], boxShadow: '0 0 15px rgba(251,191,36,0.8)' } : isNext ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}}
                            transition={isNext ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
                        >
                            {isSelected && <motion.span style={{ fontSize: '0.8rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✨</motion.span>}
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
                        transition={{ delay: 0.5, type: 'spring' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                    >
                        menuju grand finale! 🎂
                    </motion.button>
                )}
            </AnimatePresence>

            <style>{`
                .constellation-container {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    height: 100vh; width: 100vw;
                    color: #fff; position: relative;
                    overflow: hidden; padding: 20px;
                }
                .bg-star {
                    position: absolute; background: #fff;
                    border-radius: 50%; pointer-events: none;
                }
                .header-content { z-index: 10; text-align: center; margin-bottom: 20px; }
                .constellation-title {
                    font-family: var(--font-heading);
                    font-size: 1.8rem; margin-bottom: 8px;
                    text-shadow: 0 0 20px rgba(251,191,36,0.5);
                }
                .constellation-subtitle {
                    opacity: 0.7; font-size: 0.95rem;
                }
                .star-field {
                    position: relative;
                    width: min(100vw - 40px, 400px);
                    height: min(100vw - 40px, 400px);
                    z-index: 10;
                }
                .connection-svg {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%; z-index: 1;
                }
                .constellation-star {
                    position: absolute; width: 24px; height: 24px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    border: 2px solid rgba(255,255,255,0.3);
                    transform: translate(-50%, -50%);
                    cursor: pointer; z-index: 5;
                    display: flex; align-items: center; justify-content: center;
                }
                .constellation-star.selected {
                    background: #fbbf24; border-color: #fbbf24;
                }
                .constellation-star.hint {
                    border-color: rgba(251,191,36,0.6);
                    background: rgba(251,191,36,0.2);
                }
                .constellation-btn {
                    margin-top: 30px; z-index: 10;
                    padding: 15px 35px; font-size: 1.1rem;
                    border-radius: 50px; border: none;
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    color: #1a1a2e; font-weight: 700;
                    box-shadow: 0 8px 25px rgba(251,191,36,0.3);
                    font-family: var(--font-heading);
                }
            `}</style>
        </div>
    );
};

export default ConstellationScreen;
