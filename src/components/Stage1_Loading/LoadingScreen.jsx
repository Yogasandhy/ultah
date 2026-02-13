import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
// Note: Placeholders for sounds. Ensure these exist or code will fail silently/log errors
// import glitchSfx from '../../assets/audio/glitch.mp3'; 
// import explodeSfx from '../../assets/audio/pop.mp3';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isExploding, setIsExploding] = useState(false);

    // const [playGlitch] = useSound(glitchSfx);
    // const [playExplode] = useSound(explodeSfx);

    useEffect(() => {
        // Phase 1: Fast loading to 99%
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99) {
                    clearInterval(interval);
                    startGlitchPhase();
                    return 99;
                }
                // Random increment for realistic feel
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const startGlitchPhase = () => {
        // Phase 2: Stuck at 99% for a moment
        setTimeout(() => {
            // Phase 3: Glitch Trigger
            setIsGlitching(true);
            setShowError(true);
            // playGlitch();

            // Phase 4: Explosion after reading the error
            setTimeout(() => {
                handleExplosion();
            }, 3000);
        }, 1500);
    };

    const handleExplosion = () => {
        setIsExploding(true);
        // playExplode();
        setTimeout(() => {
            onComplete();
        }, 800);
    };

    return (
        <div className="loading-container">
            {!isExploding && (
                <div className="loading-content">
                    <div className="loading-bar-container">
                        <motion.div
                            className={`loading-bar ${isGlitching ? 'glitch-bar' : ''}`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    <h2 className="loading-text">
                        {isGlitching ? "SYSTEM ERROR..." : `Loading... ${progress}%`}
                    </h2>

                    <AnimatePresence>
                        {showError && (
                            <motion.div
                                className="error-popup"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                            >
                                <p className="error-msg">⚠️ CRITICAL ERROR ⚠️</p>
                                <p>Terlalu cantik, server tidak kuat menahan beban...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {isExploding && (
                <div className="explosion-particles">
                    {/* Simple CSS particles can be added here or via library */}
                    <motion.div
                        className="boom-circle"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 20, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
            )}

            <style>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #000;
          color: #fff;
          font-family: 'Courier New', monospace; /* Tech vibes */
        }
        .loading-bar-container {
          width: 300px;
          height: 20px;
          border: 2px solid #fff;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
          position: relative;
        }
        .loading-bar {
          height: 100%;
          background-color: #0f0; /* Hacker green */
          box-shadow: 0 0 10px #0f0;
        }
        .glitch-bar {
          background-color: #f00;
          box-shadow: 0 0 15px #f00;
          animation: glitchShimmy 0.2s infinite;
        }
        .loading-text {
          font-size: 1.2rem;
          letter-spacing: 2px;
        }
        .error-popup {
          margin-top: 30px;
          padding: 20px;
          border: 2px solid #f00;
          background-color: rgba(255, 0, 0, 0.1);
          color: #f00;
          text-align: center;
          font-weight: bold;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        }
        .error-msg {
          font-size: 1.5rem;
          margin-bottom: 10px;
          animation: blink 0.5s infinite;
        }
        .boom-circle {
          width: 50px;
          height: 50px;
          background-color: var(--color-pastel-pink);
          border-radius: 50%;
        }
        @keyframes glitchShimmy {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
