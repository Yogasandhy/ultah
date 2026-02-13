import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REASONS = [
  { emoji: "🔫", text: "Karena dari satu squad PUBGM, kamu jadi squad seumur hidup aku" },
  { emoji: "📱", text: "Karena vc sampai subuh itu udah jadi kebutuhan, bukan kemauan" },
  { emoji: "🎮", text: "Karena main ML bareng itu seru, walau kebanyakan kalahnya wkwk 😂" },
  { emoji: "🌙", text: "Karena kamu selalu bilang 'jangan tidur dulu' padahal udah ngantuk" },
  { emoji: "🏔️", text: "Karena naik gunung di Roblox bareng kamu itu petualangan terbaik" },
  { emoji: "👻", text: "Karena di map horror Roblox, kamu selalu teriak duluan padahal bilangnya gak takut" },
  { emoji: "🌈", text: "Karena walaupun LDR, kamu bikin jarak itu berasa deket" },
  { emoji: "🎵", text: "Karena suara ketawa kamu di voice chat itu obat segala rindu" },
  { emoji: "✈️", text: "Karena aku gak sabar nunggu hari dimana kita akhirnya ketemu" },
  { emoji: "❤️", text: "Karena kamu itu kamu. Player 2 terbaik yang pernah aku punya." },
];

const ReasonScreen = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLast = currentIndex >= REASONS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onNext();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="reason-container">
      {/* Progress bar */}
      <div className="progress-bar-wrapper">
        <motion.div
          className="progress-bar-fill"
          animate={{ width: `${((currentIndex + 1) / REASONS.length) * 100}% ` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.p className="reason-counter" key={`counter - ${currentIndex} `}>
        {currentIndex + 1} / {REASONS.length}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="reason-card"
          initial={{ x: 100, opacity: 0, rotateY: 30 }}
          animate={{ x: 0, opacity: 1, rotateY: 0 }}
          exit={{ x: -100, opacity: 0, rotateY: -30 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="reason-emoji">{REASONS[currentIndex].emoji}</div>
          <h2 className="reason-title">Alasan #{currentIndex + 1}</h2>
          <p className="reason-text">{REASONS[currentIndex].text}</p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className="reason-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
      >
        {isLast ? "Udah siap? Lanjut! 🎉" : "Selanjutnya →"}
      </motion.button>

      <style>{`
  .reason - container {
  display: flex; flex - direction: column;
  align - items: center; justify - content: center;
  height: 100vh; width: 100vw; color: #fff;
  padding: 20px;
}
        .progress - bar - wrapper {
  position: absolute; top: 20px; left: 20px; right: 20px;
  height: 6px; background: rgba(255, 255, 255, 0.2);
  border - radius: 10px; overflow: hidden;
}
        .progress - bar - fill {
  height: 100 %;
  background: linear - gradient(90deg, #FF6B9D, #C44569);
  border - radius: 10px;
}
        .reason - counter {
  font - size: 1rem; opacity: 0.6; margin - bottom: 10px;
}
        .reason - card {
  background: rgba(255, 255, 255, 0.1);
  backdrop - filter: blur(15px);
  padding: 50px 40px;
  border - radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text - align: center;
  max - width: 450px; width: 100 %;
  box - shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}
        .reason - emoji {
  font - size: 4rem; margin - bottom: 15px;
}
        .reason - title {
  font - family: var(--font - heading);
  font - size: 1.3rem; opacity: 0.7;
  margin - bottom: 15px;
}
        .reason - text {
  font - size: 1.5rem; line - height: 1.5;
  font - family: var(--font - heading);
}
        .reason - btn {
  margin - top: 30px;
  padding: 16px 35px; font - size: 1.1rem;
  border - radius: 50px; border: none;
  background: linear - gradient(135deg, #FF6B9D, #C44569);
  color: #fff; font - weight: bold;
  box - shadow: 0 8px 25px rgba(196, 69, 105, 0.4);
}
`}</style>
    </div>
  );
};

export default ReasonScreen;
