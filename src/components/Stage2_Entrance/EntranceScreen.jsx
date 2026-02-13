import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NO_RESPONSES = [
  { text: "GAK DEH 😒", size: 1 },
  { text: "Yakin nih? 🤔", size: 1 },
  { text: "Masa sih... 😢", size: 0.9 },
  { text: "Jangan gitu dong 😭", size: 0.85 },
  { text: "Aku sedih lho... 💔", size: 0.8 },
  { text: "Pliss? 🥺🥺🥺", size: 0.75 },
  { text: "TERAKHIR YA? 😤", size: 0.7 },
];

const EntranceScreen = ({ onNext }) => {
  const [rejectionCount, setRejectionCount] = useState(0);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [extraYesButtons, setExtraYesButtons] = useState([]);
  const showYes = rejectionCount >= NO_RESPONSES.length;

  const handleNoClick = () => {
    const next = rejectionCount + 1;
    setRejectionCount(next);

    // Move the NO button
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
    setNoBtnPosition({ x, y });
  };

  // When threshold reached, spawn YES buttons every 300ms
  useEffect(() => {
    if (!showYes) return;
    let count = 0;
    const interval = setInterval(() => {
      const newBtn = {
        id: Date.now() + count,
        top: Math.random() * 70 + 10 + '%',
        left: Math.random() * 70 + 10 + '%',
        rotate: Math.random() * 30 - 15,
        scale: 0.8 + Math.random() * 0.6,
      };
      setExtraYesButtons(prev => [...prev, newBtn]);
      count++;
      if (count >= 15) clearInterval(interval); // Spawn 15 buttons
    }, 200);
    return () => clearInterval(interval);
  }, [showYes]);

  const handleYesClick = () => {
    setIsZooming(true);
    setTimeout(() => onNext(), 1500);
  };

  const getCurrentNoText = () => {
    if (rejectionCount < NO_RESPONSES.length) return NO_RESPONSES[rejectionCount].text;
    return "...";
  };

  const getCurrentNoScale = () => {
    if (rejectionCount < NO_RESPONSES.length) return NO_RESPONSES[rejectionCount].size;
    return 0.5;
  };

  return (
    <motion.div
      className="entrance-container"
      animate={isZooming ? { scale: 50, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="content-wrapper">
        <motion.div
          className="lottie-placeholder"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🐰
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {showYes ? "OKEE OKEE, aku menyerah! Mau masuk kan?? 🥹" : "Mau masuk ke dunia ulang tahun?"}
        </motion.h1>

        {/* Rejection counter */}
        {rejectionCount > 0 && !showYes && (
          <motion.p
            className="counter-text"
            key={rejectionCount}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            Sudah nolak {rejectionCount}x 😭
          </motion.p>
        )}

        <div className="button-group">
          {/* YES button - only shows after enough rejections */}
          {showYes && (
            <motion.button
              className="btn-yes btn-yes-main"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleYesClick}
            >
              MAU BANGET 😍
            </motion.button>
          )}

          {/* NO button - shrinks and changes text */}
          {!showYes && (
            <motion.button
              className="btn-no"
              animate={{
                x: noBtnPosition.x,
                y: noBtnPosition.y,
                scale: getCurrentNoScale()
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={handleNoClick}
              onMouseEnter={() => {
                if (rejectionCount > 2) handleNoClick(); // Also trigger on hover after 3 clicks
              }}
            >
              {getCurrentNoText()}
            </motion.button>
          )}
        </div>
      </div>

      {/* Rain of YES buttons */}
      <AnimatePresence>
        {extraYesButtons.map(btn => (
          <motion.button
            key={btn.id}
            className="btn-yes btn-yes-extra"
            style={{
              top: btn.top, left: btn.left, position: 'absolute',
              transform: `rotate(${btn.rotate}deg) scale(${btn.scale})`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: btn.scale, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={handleYesClick}
            whileHover={{ scale: btn.scale * 1.2 }}
          >
            MAU!! 😍
          </motion.button>
        ))}
      </AnimatePresence>

      <style>{`
        .entrance-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #fff;
          overflow: hidden;
          position: relative;
        }
        .content-wrapper { text-align: center; z-index: 10; }
        .lottie-placeholder {
          width: 150px; height: 150px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          font-size: 4rem;
          margin: 0 auto 1.5rem;
          border: 3px solid rgba(255,255,255,0.3);
        }
        h1 { font-family: var(--font-heading); font-size: 2rem; margin-bottom: 1rem; text-shadow: 2px 2px 10px rgba(0,0,0,0.3); }
        .counter-text { font-size: 1.2rem; opacity: 0.8; margin-bottom: 1.5rem; }
        .button-group { display: flex; gap: 20px; justify-content: center; align-items: center; position: relative; }
        .btn-yes, .btn-yes-extra {
          font-size: 1.2rem; padding: 15px 30px; border-radius: 50px;
          font-weight: bold; box-shadow: 0 5px 20px rgba(255,105,180,0.4);
          border: none; background: linear-gradient(135deg, #FF6B9D, #C44569); color: #fff;
        }
        .btn-yes-main { font-size: 1.5rem; padding: 20px 40px; }
        .btn-yes-extra { padding: 10px 20px; font-size: 1rem; z-index: 5; }
        .btn-no {
          background: rgba(255,255,255,0.2); backdrop-filter: blur(5px);
          color: #fff; border: 2px solid rgba(255,255,255,0.3);
          font-size: 1.1rem; padding: 12px 25px; border-radius: 50px;
        }
      `}</style>
    </motion.div>
  );
};

export default EntranceScreen;
