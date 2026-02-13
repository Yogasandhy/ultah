import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WISHES = [
    "Sehat selalu biar bisa ketemu nanti 🌿",
    "Semoga jarak kita makin deket 📍",
    "Makin jago ML biar bisa carry aku 🎮",
    "Selalu bahagia walau kita jauh 🌈",
    "Semoga tahun ini kita bisa ketemu! ✈️",
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

        // Add a star to the sky
        const newStar = {
            id: Date.now(),
            x: 20 + Math.random() * 60 + '%',
            y: 10 + Math.random() * 40 + '%',
            size: 1.5 + Math.random() * 2 + 'rem',
        };
        setStars(prev => [...prev, newStar]);
        setCurrentWish(prev => prev + 1);
    };

    return (
        <div className="wish-container">
            {/* Stars in the sky */}
            {stars.map(star => (
                <motion.div
                    key={star.id}
                    className="wish-star"
                    style={{ left: star.x, top: star.y, fontSize: star.size }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.7], scale: [0, 1.5, 1] }}
                    transition={{ duration: 1 }}
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
                    ✨ Bintang Harapan ✨
                </motion.h1>

                <p className="wish-subtitle">
                    {allDone
                        ? "Semua harapan sudah terkirim ke bintang! 🌟"
                        : "Tap buat kirim harapan ke bintang..."}
                </p>

                <AnimatePresence mode="wait">
                    {!allDone ? (
                        <motion.div
                            key={currentWish}
                            className="wish-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                        >
                            <p>{WISHES[currentWish]}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="done"
                            className="wish-text done"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <p>🎂 Waktunya tiup lilin! 🎂</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    className="wish-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handleTap}
                >
                    {allDone ? "Lanjut ke Kue! 🎂" : `Kirim Harapan ${currentWish + 1}/${WISHES.length} ⭐`}
                </motion.button>
            </div>

            <style>{`
        .wish-container {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          height: 100vh; width: 100vw;
          background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          color: #fff; overflow: hidden;
        }
        .wish-star {
          position: absolute;
          z-index: 5;
        }
        .wish-content {
          text-align: center; z-index: 10;
          padding: 20px;
        }
        .wish-title {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          margin-bottom: 10px;
          text-shadow: 0 0 20px rgba(255,215,0,0.5);
        }
        .wish-subtitle {
          opacity: 0.6; margin-bottom: 30px;
          font-size: 1.1rem;
        }
        .wish-text {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px 40px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.15);
          margin-bottom: 30px;
          font-size: 1.6rem;
          font-family: var(--font-heading);
          min-height: 100px;
          display: flex; align-items: center; justify-content: center;
        }
        .wish-text.done {
          border-color: rgba(255,215,0,0.3);
          box-shadow: 0 0 30px rgba(255,215,0,0.2);
        }
        .wish-btn {
          padding: 16px 35px; font-size: 1.1rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #f7971e, #ffd200);
          color: #333; font-weight: bold;
          box-shadow: 0 8px 25px rgba(247,151,30,0.3);
        }
      `}</style>
        </div>
    );
};

export default WishScreen;
