import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const CakeScreen = () => {
    const [candleOn, setCandleOn] = useState(true);
    const [showEnvelope, setShowEnvelope] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [isHolding, setIsHolding] = useState(false);

    useEffect(() => {
        let timer;
        if (isHolding && candleOn) {
            timer = setTimeout(() => {
                setCandleOn(false);
                setTimeout(() => setShowEnvelope(true), 800);
            }, 2000);
        } else {
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [isHolding, candleOn]);

    const handleOpenEnvelope = () => {
        setShowEnvelope(false);
        setTimeout(() => setShowLetter(true), 400);
    };

    return (
        <div className={`cake-container ${!candleOn ? 'blown' : ''}`}>
            <AnimatePresence mode="wait">
                {!showEnvelope && !showLetter && (
                    <motion.div
                        key="cake"
                        className="cake-section"
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="blow-instruction">
                            {candleOn ? "tahan tombol buat tiup lilin... 🕯️" : "🎉 yayy!!"}
                        </h2>
                        <div className="cake-wrapper">
                            <div className="cake-body">
                                <div className="cake-icing"></div>
                                <div className="cake-drip d1"></div>
                                <div className="cake-drip d2"></div>
                                <div className="cake-drip d3"></div>
                                <div className="cake-cherry">🍒</div>
                            </div>
                            {candleOn && (
                                <div className="candle">
                                    <div className="flame-wrap">
                                        <div className="flame"></div>
                                        <div className="flame-glow"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {candleOn && (
                            <motion.button
                                className="blow-btn"
                                whileTap={{ scale: 0.95 }}
                                onMouseDown={() => setIsHolding(true)}
                                onMouseUp={() => setIsHolding(false)}
                                onTouchStart={() => setIsHolding(true)}
                                onTouchEnd={() => setIsHolding(false)}
                            >
                                {isHolding ? "fuuuhhh... 💨" : "tiup lilin 🕯️"}
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {showEnvelope && (
                    <motion.div
                        key="envelope"
                        className="envelope-section"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        onClick={handleOpenEnvelope}
                    >
                        <div className="envelope">
                            <div className="envelope-flap"></div>
                            <div className="wax-seal">❤️</div>
                        </div>
                        <p className="tap-hint">tap buat buka 💌</p>
                    </motion.div>
                )}

                {showLetter && (
                    <motion.div
                        key="letter"
                        className="letter-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <Confetti numberOfPieces={60} gravity={0.04} />
                        <div className="letter-card">
                            <h1 className="letter-title">happy birthday sayang! ❤️</h1>
                            <div className="letter-body">
                                <p>
                                    hai kamu! selamat ulang tahun yaa... <br /><br />
                                    dari squad random di PUBGM sampe jadi orang paling penting di hidup aku.
                                    walau kita dipisahin jarak, tapi feeling aku ke kamu ga pernah berkurang sedikitpun.
                                    tiap call bareng, tiap mabar ML (walau kebanyakan kalah wkwk), tiap teriak-teriak di map horror Roblox —
                                    itu semua jadi momen yg paling aku tunggu tiap harinya.<br /><br />
                                    kamu itu player 2 terbaik yg pernah aku punya.
                                    bukan cuma di game, tapi di real life juga.
                                    makasih udah sabar, sabar ngadepin aku, dan tetep di sini walau jauh.<br /><br />
                                    semoga di umur yg baru ini, kita cepet ketemu ya.
                                    aku udah ga sabar pengen peluk kamu langsung bukan cuma lewat layar.
                                    tunggu aku ya, jarak ini cuma sementara. ✈️<br /><br />
                                    I Love You 3000, from a distance that will soon be zero! 🚀<br /><br />
                                    — your player 1 💕
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .cake-container {
                    width: 100vw; height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    position: relative; color: #fff;
                    transition: all 1.5s ease;
                }
                .cake-container.blown {
                    background: radial-gradient(circle at 50% 40%, rgba(167,139,250,0.15), transparent 70%);
                }
                .cake-section {
                    display: flex; flex-direction: column;
                    align-items: center; text-align: center;
                }
                .blow-instruction {
                    font-family: var(--font-heading);
                    font-size: 1.3rem; opacity: 0.6;
                    margin-bottom: 40px;
                }
                .cake-wrapper {
                    position: relative; margin-bottom: 40px;
                }
                .cake-body {
                    width: 180px; height: 130px;
                    background: linear-gradient(180deg, #e8a0bf, #c77dba);
                    border-radius: 12px 12px 20px 20px;
                    position: relative;
                    box-shadow: 0 15px 40px rgba(200,125,186,0.3);
                }
                .cake-icing {
                    position: absolute; top: 0; width: 100%; height: 35px;
                    background: linear-gradient(180deg, #f5e6ff, #e8d0f5);
                    border-radius: 12px 12px 0 0;
                }
                .cake-drip {
                    position: absolute; top: 30px;
                    width: 14px; height: 20px;
                    background: #f5e6ff;
                    border-radius: 0 0 50% 50%;
                }
                .d1 { left: 25%; }
                .d2 { left: 50%; height: 28px; }
                .d3 { left: 72%; height: 16px; }
                .cake-cherry {
                    position: absolute; top: -18px;
                    left: 50%; transform: translateX(-50%);
                    font-size: 1.8rem;
                }
                .candle {
                    width: 14px; height: 50px;
                    background: linear-gradient(180deg, #fff, #e2e2e2);
                    position: absolute;
                    top: -50px; left: 50%; transform: translateX(-50%);
                    border-radius: 4px;
                }
                .flame-wrap {
                    position: absolute; top: -28px;
                    left: 50%; transform: translateX(-50%);
                }
                .flame {
                    width: 14px; height: 22px;
                    background: linear-gradient(180deg, #ffd700, #ff6b00);
                    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    animation: flicker 0.4s infinite alternate;
                }
                .flame-glow {
                    position: absolute; top: -8px; left: -12px;
                    width: 38px; height: 38px;
                    background: radial-gradient(circle, rgba(255,215,0,0.35), transparent);
                    border-radius: 50%;
                    animation: flicker 0.4s infinite alternate;
                }
                @keyframes flicker {
                    0% { transform: scale(1) rotate(-1deg); }
                    100% { transform: scale(0.92) rotate(1deg); }
                }
                .blow-btn {
                    padding: 16px 40px; font-size: 1.1rem;
                    border-radius: 50px; border: none;
                    background: rgba(255,255,255,0.08);
                    backdrop-filter: blur(10px);
                    color: #fff; font-weight: 600;
                    border: 1px solid rgba(255,255,255,0.15);
                    font-family: var(--font-heading);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                }

                .envelope-section {
                    display: flex; flex-direction: column;
                    align-items: center; cursor: pointer;
                }
                .envelope {
                    width: 260px; height: 170px;
                    background: linear-gradient(145deg, #f472b6, #e11d74);
                    border-radius: 12px;
                    position: relative;
                    display: flex; justify-content: center; align-items: center;
                    box-shadow: 0 20px 50px rgba(228,29,116,0.25);
                }
                .envelope-flap {
                    position: absolute; top: 0; left: 0; right: 0;
                    height: 0;
                    border-left: 130px solid transparent;
                    border-right: 130px solid transparent;
                    border-top: 85px solid #f9a8d4;
                }
                .wax-seal {
                    width: 55px; height: 55px;
                    background: radial-gradient(circle, #dc2626, #991b1b);
                    border-radius: 50%;
                    display: flex; justify-content: center; align-items: center;
                    font-size: 1.4rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    z-index: 10;
                }
                .tap-hint {
                    margin-top: 20px; opacity: 0.5;
                    font-family: var(--font-heading);
                    animation: float 2s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }

                .letter-section {
                    text-align: center; padding: 20px;
                    max-width: 520px; width: 100%;
                }
                .letter-card {
                    background: rgba(255,255,255,0.06);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    padding: 40px 30px;
                    border-radius: 28px;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    color: #fff;
                }
                .letter-title {
                    font-family: var(--font-heading);
                    font-size: 1.8rem;
                    margin-bottom: 20px;
                    background: linear-gradient(135deg, #f472b6, #a78bfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .letter-body {
                    line-height: 1.8; font-size: 1rem;
                    opacity: 0.9;
                }
                @media (max-width: 400px) {
                    .letter-card { padding: 30px 20px; }
                    .letter-title { font-size: 1.5rem; }
                    .letter-body { font-size: 0.95rem; }
                    .cake-body { transform: scale(0.9); }
                }
            `}</style>
        </div>
    );
};

export default CakeScreen;
