import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import useSound from 'use-sound';

// Placeholder sounds
// import bgmRomantis from '../../assets/audio/romantis.mp3';

const CakeScreen = () => {
    const [candleOn, setCandleOn] = useState(true);
    const [showEnvelope, setShowEnvelope] = useState(false);
    const [showLetter, setShowLetter] = useState(false);
    const [isHolding, setIsHolding] = useState(false);

    // const [playMusic] = useSound(bgmRomantis);

    useEffect(() => {
        let timer;
        if (isHolding && candleOn) {
            timer = setTimeout(() => {
                setCandleOn(false);
                setTimeout(() => {
                    setShowEnvelope(true);
                    // playMusic();
                }, 1000);
            }, 2000);
        } else {
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [isHolding, candleOn]);

    const handleOpenEnvelope = () => {
        setShowEnvelope(false);
        setTimeout(() => {
            setShowLetter(true);
        }, 500); // Wait for exit animation
    };

    return (
        <div className={`cake-container ${!candleOn ? 'lights-on' : ''}`}>
            <AnimatePresence mode="wait">
                {/* Phase 1: Cake */}
                {!showEnvelope && !showLetter && (
                    <motion.div
                        key="cake"
                        className="cake-section"
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="instruction">Tahan tombol buat tiup lilin... 🕯️</h2>
                        <div className="cake-wrapper">
                            <div className="cake-body">
                                <div className="icing"></div>
                                <div className="cherry">🍒</div>
                            </div>
                            {candleOn && (
                                <div className="candle">
                                    <div className="flame"></div>
                                </div>
                            )}
                        </div>

                        <button
                            className="blow-btn"
                            onMouseDown={() => setIsHolding(true)}
                            onMouseUp={() => setIsHolding(false)}
                            onTouchStart={() => setIsHolding(true)}
                            onTouchEnd={() => setIsHolding(false)}
                        >
                            {isHolding ? "Fuuuhhh... 💨" : "Tiup Lilin"}
                        </button>
                    </motion.div>
                )}

                {/* Phase 2: Envelope */}
                {showEnvelope && (
                    <motion.div
                        key="envelope"
                        className="envelope-container"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        onClick={handleOpenEnvelope}
                    >
                        <div className="envelope">
                            <div className="wax-seal">❤️</div>
                            <p className="tap-hint">Klik untuk membuka</p>
                        </div>
                    </motion.div>
                )}

                {/* Phase 3: Letter */}
                {showLetter && (
                    <motion.div
                        key="letter"
                        className="letter-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <Confetti numberOfPieces={50} gravity={0.05} />
                        <div className="letter-content">
                            <h1>Happy Birthday Sayang! ❤️</h1>
                            <p>
                                Hai kamu! Selamat ulang tahun yaa... <br /><br />
                                Dari squad random di PUBGM sampai jadi orang paling penting di hidup aku.
                                Walaupun kita dipisahkan jarak, tapi perasaan aku ke kamu gak pernah berkurang sedikitpun.
                                Setiap vc bareng, setiap mabar ML (walau kebanyakan kalah wkwk), setiap teriak-teriak di map horror Roblox —
                                itu semua jadi momen yang paling aku tunggu setiap harinya.<br /><br />
                                Kamu itu player 2 terbaik yang pernah aku punya.
                                Bukan cuma di game, tapi di kehidupan nyata juga.
                                Makasih udah sabar nunggu, sabar ngadepin aku, dan tetep di sini walau jauh.<br /><br />
                                Semoga di umur yang baru ini, kita cepet ketemu ya.
                                Aku udah gak sabar pengen peluk kamu langsung, bukan cuma lewat layar.
                                Tunggu aku ya, jarak ini cuma sementara. ✈️<br /><br />
                                I Love You 3000, from a distance that will soon be zero! 🚀<br /><br />
                                - Your Player 1 💕
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .cake-container {
            width: 100vw;
            height: 100vh;
            background-color: #222;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 2s;
            position: relative;
        }
        .lights-on {
            background-color: var(--color-pastel-pink);
            color: #333;
        }
        .instruction { margin-bottom: 50px; opacity: 0.7; }
        .cake-section { display: flex; flex-direction: column; align-items: center; }
        .cake-wrapper { position: relative; margin-bottom: 50px; }
        .cake-body { width: 200px; height: 150px; background: #DCA3A3; border-radius: 10px 10px 0 0; position: relative; }
        .icing { position: absolute; top: 0; width: 100%; height: 40px; background: #FFE4E1; border-radius: 10px 10px 20px 20px; }
        .cherry { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 2rem; }
        .candle { width: 20px; height: 60px; background: #FFF; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); border-radius: 5px 5px 0 0; }
        .flame { width: 20px; height: 30px; background: orange; border-radius: 50% 50% 20% 20%; position: absolute; top: -30px; left: 0; animation: flicker 0.5s infinite; }
        @keyframes flicker {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(0.9) rotate(2deg); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        .blow-btn { padding: 15px 30px; font-size: 1.2rem; border-radius: 30px; border: none; background: #444; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        
        /* Envelope Styles */
        .envelope-container { cursor: pointer; perspective: 1000px; }
        .envelope {
            width: 300px;
            height: 200px;
            background: #FF6B6B;
            border-radius: 10px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .envelope::before {
            content: '';
            position: absolute;
            top: 0;
            width: 0;
            height: 0;
            border-left: 150px solid transparent;
            border-right: 150px solid transparent;
            border-top: 100px solid #FF8787; /* Flap */
            transform-origin: top;
        }
        .wax-seal {
            width: 60px;
            height: 60px;
            background: #C0392B;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            color: rgba(255,255,255,0.8);
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            z-index: 10;
        }
        .tap-hint {
            position: absolute;
            bottom: -40px;
            color: #555;
            font-weight: bold;
            animation: bounce 1s infinite;
        }
        
        /* Letter Styles */
        .letter-section { text-align: center; padding: 20px; max-width: 600px; line-height: 1.6; }
        .letter-content { background: rgba(255,255,255,0.9); padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .letter-content h1 { color: var(--color-pastel-pink); margin-bottom: 20px; }
      `}</style>
        </div>
    );
};

export default CakeScreen;
