import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WISHES = [
    "sehat terus biar bisa ketemu nanti 🌿",
    "semoga jarak kita makin deket 📍",
    "makin jago ML biar bisa carry aku 🎮",
    "selalu happy walau kita jauh 🌈",
    "semoga tahun ini kita bisa ketemu! ✈️",
];

const WishScreen = ({ onNext }) => {
    const [currentWish, setCurrentWish] = useState(0);
    const [stars, setStars] = useState([]);
    const allDone = currentWish >= WISHES.length;

    const handleTap = () => {
        if (allDone) {
            onNext();
            return;
        }

        const newStar = {
            id: Date.now(),
            x: 15 + Math.random() * 70 + '%',
            y: 8 + Math.random() * 45 + '%',
            size: 1.2 + Math.random() * 1.5 + 'rem',
        };
        setStars(prev => [...prev, newStar]);
        setCurrentWish(prev => prev + 1);
    };

    return (
        <div className="wish-container">
            {stars.map(star => (
                <motion.div
                    key={star.id}
                    className="wish-star"
                    style={{ left: star.x, top: star.y, fontSize: star.size }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.6], scale: [0, 1.5, 1] }}
                    transition={{ duration: 0.8 }}
                >
                    ⭐
                </motion.div>
            ))}

            <div className="wish-content">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="wish-title"
                >
                    ✨ bintang harapan ✨
                </motion.h1>

                <p className="wish-subtitle">
                    {allDone
                        ? "semua harapan udah terkirim ke bintang! 🌟"
                        : "tap buat kirim harapan ke bintang..."}
                </p>

                <AnimatePresence mode="wait">
                    {!allDone ? (
                        <motion.div
                            key={currentWish}
                            className="wish-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -25 }}
                        >
                            <p>{WISHES[currentWish]}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="done"
                            className="wish-text wish-done"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <p>🎂 waktunya tiup lilin! 🎂</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    className="wish-btn"
                    whileHover={{ scale: 1.08, boxShadow: '0 0 35px rgba(251,191,36,0.5)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleTap}
                >
                    {allDone ? "lanjut ke kue! 🎂" : `kirim harapan ${currentWish + 1}/${WISHES.length} ⭐`}
                </motion.button>
            </div>

            <style>{`
                .wish-container {
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                    height: 100vh; width: 100vw;
                    color: #fff; overflow: hidden;
                }
                .wish-star {
                    position: absolute; z-index: 5;
                    filter: drop-shadow(0 0 8px rgba(251,191,36,0.6));
                }
                .wish-content {
                    text-align: center; z-index: 10;
                    padding: 20px;
                }
                .wish-title {
                    font-family: var(--font-heading);
                    font-size: 2.2rem; margin-bottom: 8px;
                    text-shadow: 0 0 25px rgba(251,191,36,0.3);
                }
                .wish-subtitle {
                    opacity: 0.5; margin-bottom: 25px;
                    font-size: 1rem;
                }
                .wish-text {
                    background: rgba(255,255,255,0.06);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    padding: 28px 35px;
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.1);
                    margin-bottom: 25px;
                    font-size: 1.4rem;
                    font-family: var(--font-heading);
                    min-height: 90px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
                }
                .wish-done {
                    border-color: rgba(251,191,36,0.25);
                    box-shadow: 0 0 30px rgba(251,191,36,0.15);
                }
                .wish-btn {
                    padding: 15px 35px; font-size: 1.05rem;
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

export default WishScreen;
