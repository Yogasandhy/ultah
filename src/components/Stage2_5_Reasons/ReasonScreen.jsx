import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REASONS = [
  { emoji: "🔫", text: "dari satu squad PUBGM, kamu jadi squad seumur hidup aku" },
  { emoji: "📱", text: "call tiap malem sampe salah satu ketiduran itu udah kayak kebutuhan" },
  { emoji: "🎮", text: "mabar ML itu seru, walau kebanyakan kalahnya wkwk 😂" },
  { emoji: "🌙", text: "belum mau tidur belum ngantuk pdahal ngantuk banget aslinya" },
  { emoji: "🏔️", text: "naik gunung di Roblox bareng kamu itu adventure terbaik" },
  { emoji: "👻", text: "di map horror Roblox, kamu selalu teriak duluan padahal katanya ga takut" },
  { emoji: "🌈", text: "walau LDR, kamu bikin jarak itu kerasa deket bgt" },
  { emoji: "🎵", text: "suara ketawa kamu di vc itu obat kangen paling ampuh fr" },
  { emoji: "✈️", text: "aku ga sabar bgt nunggu hari dimana kita akhirnya ketemu" },
  { emoji: "❤️", text: "karena kamu itu kamu. player 2 terbaik yg pernah aku punya." },
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

  const progress = ((currentIndex + 1) / REASONS.length) * 100;

  return (
    <div className="reason-container">
      <div className="reason-progress-wrap">
        <motion.div
          className="reason-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <motion.p className="reason-counter" key={`c-${currentIndex}`}>
        {currentIndex + 1} / {REASONS.length}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="reason-card"
          initial={{ x: 80, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <div className="reason-emoji-wrap">
            <span className="reason-emoji">{REASONS[currentIndex].emoji}</span>
          </div>
          <p className="reason-label">alasan #{currentIndex + 1}</p>
          <p className="reason-text">{REASONS[currentIndex].text}</p>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className="reason-btn"
        whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(244,114,182,0.5)' }}
        whileTap={{ scale: 0.94 }}
        onClick={handleNext}
      >
        {isLast ? "udah siap? lanjut! 🎉" : "next →"}
      </motion.button>

      <style>{`
        .reason-container {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100vh; width: 100vw; color: #fff;
          padding: 20px; position: relative;
        }
        .reason-progress-wrap {
          position: absolute; top: 24px; left: 24px; right: 24px;
          height: 4px; background: rgba(255,255,255,0.1);
          border-radius: 10px; overflow: hidden;
        }
        .reason-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f472b6, #a78bfa);
          border-radius: 10px;
        }
        .reason-counter {
          font-size: 0.9rem; opacity: 0.4; margin-bottom: 12px;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
        }
        .reason-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 45px 35px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          max-width: 420px; width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .reason-emoji-wrap {
          width: 72px; height: 72px;
          background: rgba(244,114,182,0.12);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
          box-shadow: 0 0 20px rgba(244,114,182,0.15);
        }
        .reason-emoji { font-size: 2.2rem; }
        .reason-label {
          font-family: var(--font-heading);
          font-size: 0.9rem; opacity: 0.4;
          margin-bottom: 14px;
          text-transform: lowercase;
          letter-spacing: 0.08em;
        }
        .reason-text {
          font-size: 1.35rem; line-height: 1.6;
          font-family: var(--font-heading);
          opacity: 0.95;
        }
        .reason-btn {
          margin-top: 28px;
          padding: 15px 38px; font-size: 1.05rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #f472b6, #a78bfa);
          color: #fff; font-weight: 700;
          box-shadow: 0 8px 25px rgba(244,114,182,0.35);
          font-family: var(--font-heading);
        }
      `}</style>
    </div>
  );
};

export default ReasonScreen;
