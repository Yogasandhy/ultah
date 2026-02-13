import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOALS = [
  { text: "ketemu langsung & pelukan pertama 🫂", emoji: "✈️" },
  { text: "push rank ML sampe Mythic bareng 🏆", emoji: "🎮" },
  { text: "taklukkin semua map horror di Roblox 👻", emoji: "🏔️" },
  { text: "call sambil nonton film bareng 🎬", emoji: "📱" },
  { text: "jalan-jalan ke pantai pas ketemu 🏖️", emoji: "🌊" },
  { text: "masak bareng lewat call (pasti chaos) 🍳", emoji: "👨‍🍳" },
  { text: "gaming marathon 24 jam non-stop 🎮", emoji: "⏰" },
  { text: "kirim surat cinta fisik lewat pos 💌", emoji: "📮" },
];

const BucketListScreen = ({ onNext }) => {
  const [checked, setChecked] = useState(new Set());
  const [sparkles, setSparkles] = useState([]);
  const allChecked = checked.size >= GOALS.length;

  const handleCheck = (index) => {
    if (checked.has(index)) return;
    const newChecked = new Set(checked);
    newChecked.add(index);
    setChecked(newChecked);

    const burst = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20,
      emoji: ['✨', '💖', '🌟', '⭐', '💕'][i],
    }));
    setSparkles(prev => [...prev, ...burst]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !burst.find(b => b.id === s.id)));
    }, 1200);
  };

  const progress = (checked.size / GOALS.length) * 100;

  return (
    <div className="bucket-container">
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.div
            key={s.id}
            className="sparkle-item"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.8, 0], opacity: [1, 1, 0], y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.h1
        className="bucket-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✅ couple goals kita
      </motion.h1>
      <p className="bucket-subtitle">centang semua yg mau kita lakuin bareng!</p>

      <div className="progress-ring-wrapper">
        <svg className="progress-ring" viewBox="0 0 120 120">
          <circle className="ring-bg" cx="60" cy="60" r="52" />
          <motion.circle
            className="ring-fill"
            cx="60" cy="60" r="52"
            strokeDasharray={2 * Math.PI * 52}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - progress / 100) }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <span className="progress-text">{checked.size}/{GOALS.length}</span>
      </div>

      <div className="goals-list">
        {GOALS.map((goal, i) => {
          const isChecked = checked.has(i);
          return (
            <motion.div
              key={i}
              className={`goal-item ${isChecked ? 'checked' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleCheck(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="checkbox"
                animate={isChecked ? {
                  backgroundColor: '#a78bfa',
                  borderColor: '#a78bfa',
                  scale: [1, 1.2, 1],
                } : {
                  backgroundColor: 'transparent',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                {isChecked && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
              <span className="goal-emoji">{goal.emoji}</span>
              <span className={`goal-text ${isChecked ? 'done' : ''}`}>{goal.text}</span>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {allChecked && (
          <motion.button
            className="bucket-next-btn"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(167,139,250,0.5)' }}
            whileTap={{ scale: 0.94 }}
            onClick={onNext}
          >
            semua kecapai! lanjut ✨
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .bucket-container {
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-start;
          height: 100vh; width: 100vw;
          color: #fff; padding: 30px 20px;
          position: relative; overflow-y: auto;
          overflow-x: hidden;
        }
        .sparkle-item {
          position: absolute; font-size: 1.3rem;
          pointer-events: none; z-index: 100;
        }
        .bucket-title {
          font-family: var(--font-heading);
          font-size: 1.8rem; margin-bottom: 4px;
          text-shadow: 0 0 20px rgba(167,139,250,0.3);
        }
        .bucket-subtitle {
          opacity: 0.5; margin-bottom: 15px;
          font-size: 0.9rem;
        }
        .progress-ring-wrapper {
          position: relative; width: 75px; height: 75px;
          margin-bottom: 18px;
        }
        .progress-ring {
          width: 100%; height: 100%;
          transform: rotate(-90deg);
        }
        .ring-bg {
          fill: none; stroke: rgba(255,255,255,0.08);
          stroke-width: 8;
        }
        .ring-fill {
          fill: none; stroke: #a78bfa;
          stroke-width: 8; stroke-linecap: round;
        }
        .progress-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1rem; font-weight: bold;
          font-family: var(--font-heading);
        }
        .goals-list {
          display: flex; flex-direction: column;
          gap: 8px; width: 100%; max-width: 420px;
        }
        .goal-item {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          padding: 14px 18px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: all 0.2s;
        }
        .goal-item:hover {
          background: rgba(255,255,255,0.08);
        }
        .goal-item.checked {
          background: rgba(167,139,250,0.1);
          border-color: rgba(167,139,250,0.25);
        }
        .checkbox {
          width: 24px; height: 24px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; color: #fff;
          flex-shrink: 0;
        }
        .goal-emoji { font-size: 1.2rem; }
        .goal-text {
          font-size: 0.95rem; font-family: var(--font-heading);
          transition: opacity 0.3s;
        }
        .goal-text.done { opacity: 0.45; text-decoration: line-through; }
        .bucket-next-btn {
          margin-top: 22px;
          padding: 15px 35px; font-size: 1.05rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #a78bfa, #818cf8);
          color: #fff; font-weight: 700;
          box-shadow: 0 8px 25px rgba(167,139,250,0.35);
          font-family: var(--font-heading);
        }
        @media (max-height: 700px) {
            .bucket-container {
                justify-content: flex-start;
                padding-top: 10px;
            }
            .bucket-title { font-size: 1.5rem; }
            .goal-item { padding: 10px 14px; }
        }
      `}</style>
    </div>
  );
};

export default BucketListScreen;
