import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useSound from 'use-sound';

// Placeholder sounds
// import spinSfx from '../../assets/audio/spin.mp3';
// import winSfx from '../../assets/audio/win.mp3';
// import loseSfx from '../../assets/audio/lose.mp3';

const PRIZES = [
    "ZONK",
    "Piring Cantik",
    "Seperangkat Alat Sholat",
    "MY HEART & SURPRISE 🎁"
];

const GachaScreen = ({ onNext }) => {
    const [spinCount, setSpinCount] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentPrize, setCurrentPrize] = useState("❓");
    const [showConfetti, setShowConfetti] = useState(false);

    // const [playSpin] = useSound(spinSfx);
    // const [playWin] = useSound(winSfx);
    // const [playLose] = useSound(loseSfx);

    const handleSpin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        // playSpin();

        // Fake spinning effect by cycling random emojis/text
        let counter = 0;
        const interval = setInterval(() => {
            const randomItems = ["🍭", "🍦", "👗", "👜", "💍", "👓"];
            setCurrentPrize(randomItems[Math.floor(Math.random() * randomItems.length)]);
            counter++;
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setIsSpinning(false);

            const nextCount = spinCount + 1;
            setSpinCount(nextCount);

            if (nextCount === 1) {
                setCurrentPrize(PRIZES[1]); // Piring Cantik
                // playLose();
            } else if (nextCount === 2) {
                setCurrentPrize(PRIZES[2]); // Alat Sholat
                // playLose();
            } else if (nextCount >= 3) {
                setCurrentPrize(PRIZES[3]); // JACKPOT
                setShowConfetti(true);
                // playWin();
            }
        }, 2000); // 2 seconds spin duration
    };

    const getButtonText = () => {
        if (isSpinning) return "Spinning...";
        if (spinCount === 0) return "SPIN 🎰";
        if (spinCount === 1) return "Coba Lagi 😅";
        if (spinCount === 2) return "Sekali Lagi deh 🥺";
        return "LANJUT KE KUE 🎂";
    };

    return (
        <div className="gacha-container">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            <h1 className="gacha-title">Mesin Pengabul Permintaan</h1>

            <div className="slot-machine">
                <div className="slot-window">
                    <motion.div
                        className="prize-display"
                        key={currentPrize}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {currentPrize}
                    </motion.div>
                </div>
                <div className="slot-deco"></div>
            </div>

            <motion.button
                className="spin-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={spinCount >= 3 && !isSpinning ? onNext : handleSpin}
                disabled={isSpinning}
            >
                {getButtonText()}
            </motion.button>

            <style>{`
        .gacha-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: var(--color-pastel-blue);
          color: white;
          overflow: hidden;
        }
        .gacha-title {
          font-family: var(--font-heading);
          margin-bottom: 30px;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
        }
        .slot-machine {
          width: 300px;
          height: 200px;
          background: #FF6B6B;
          border-radius: 20px;
          border: 10px solid #EE5253;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          position: relative;
          margin-bottom: 40px;
        }
        .slot-window {
          width: 200px;
          height: 100px;
          background: white;
          border-radius: 10px;
          border: 4px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .prize-display {
          font-size: 1.5rem;
          color: #333;
          font-weight: bold;
          text-align: center;
          padding: 10px;
        }
        .spin-btn {
          padding: 15px 40px;
          font-size: 1.5rem;
          border-radius: 50px;
          background: #FFD93D;
          color: #333;
          border: 4px solid #FFC93C;
          box-shadow: 0 5px 0 #E5B218;
          transition: all 0.1s;
        }
        .spin-btn:active {
          transform: translateY(5px);
          box-shadow: 0 0 0 #E5B218;
        }
        .spin-btn:disabled {
          background: #ccc;
          border-color: #bbb;
          box-shadow: none;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
};

export default GachaScreen;
