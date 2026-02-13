import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onNext }) => {
    const [step, setStep] = useState(0);

    const LINES = [
        "halo... 👋",
        "iya kamu, yg lagi baca ini",
        "walaupun kita jauh...",
        "tapi hari ini spesial bgt",
        "aku siapin sesuatu buat kamu 🎁",
        "dari jauh, tapi full cinta ❤️",
        "ready?",
    ];

    useEffect(() => {
        if (step < LINES.length) {
            const timer = setTimeout(() => setStep(prev => prev + 1), 1800);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="intro-container">
            <div className="intro-glow" />
            <div className="intro-lines">
                {LINES.slice(0, step).map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="intro-line"
                        style={{ opacity: i < step - 2 ? 0.4 : 1 }}
                    >
                        {line}
                    </motion.p>
                ))}
            </div>

            {step >= LINES.length && (
                <motion.button
                    className="intro-btn"
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(167,139,250,0.6)' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={onNext}
                >
                    yuk mulai! 🚀
                </motion.button>
            )}

            <style>{`
                .intro-container {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    height: 100vh; width: 100vw;
                    color: #fff; text-align: center;
                    padding: 20px; position: relative;
                }
                .intro-glow {
                    position: absolute;
                    width: 300px; height: 300px;
                    background: radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: pulse-glow 3s ease-in-out infinite;
                }
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.3); opacity: 0.8; }
                }
                .intro-lines {
                    display: flex; flex-direction: column;
                    gap: 12px; margin-bottom: 40px;
                    z-index: 2;
                }
                .intro-line {
                    font-size: 1.8rem;
                    font-family: var(--font-heading);
                    text-shadow: 0 0 30px rgba(167,139,250,0.3);
                    transition: opacity 0.5s;
                    letter-spacing: -0.02em;
                }
                .intro-btn {
                    padding: 18px 45px; font-size: 1.2rem;
                    border-radius: 60px; border: none;
                    background: linear-gradient(135deg, #a78bfa, #818cf8);
                    color: #fff; font-weight: 700;
                    box-shadow: 0 8px 30px rgba(167,139,250,0.4);
                    z-index: 2;
                    letter-spacing: 0.02em;
                }
            `}</style>
        </div>
    );
};

export default IntroScreen;
