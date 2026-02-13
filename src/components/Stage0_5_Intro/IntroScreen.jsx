import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onNext }) => {
    const [step, setStep] = useState(0);

    const LINES = [
        "Hai... 👋",
        "Walaupun kita jauh...",
        "Tapi hari ini ada yang spesial...",
        "Aku udah siapin sesuatu buat kamu 🎁",
        "Dari jauh, tapi penuh cinta ❤️",
        "Siap?",
    ];

    useEffect(() => {
        if (step < LINES.length) {
            const timer = setTimeout(() => setStep(prev => prev + 1), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="intro-container">
            <div className="intro-lines">
                {LINES.slice(0, step).map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="intro-line"
                    >
                        {line}
                    </motion.p>
                ))}
            </div>

            {step >= LINES.length && (
                <motion.button
                    className="intro-btn"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onNext}
                >
                    Ayo Mulai! 🚀
                </motion.button>
            )}

            <style>{`
        .intro-container {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100vh; color: #fff;
          text-align: center; padding: 20px;
        }
        .intro-lines {
          display: flex; flex-direction: column;
          gap: 15px; margin-bottom: 40px;
        }
        .intro-line {
          font-size: 2rem;
          font-family: var(--font-heading);
          text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
          opacity: 0.9;
        }
        .intro-btn {
          padding: 18px 40px; font-size: 1.3rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff; font-weight: bold;
          box-shadow: 0 8px 25px rgba(102,126,234,0.4);
        }
      `}</style>
        </div>
    );
};

export default IntroScreen;
