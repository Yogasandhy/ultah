import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Simplified SVG versions for corners (larger, peeking in)
const CornerRabbit = () => (
  <svg viewBox="0 0 80 60" style={{ width: '100%', height: '100%' }}>
    <motion.ellipse cx="30" cy="5" rx="7" ry="18" fill="#FFB6C1" stroke="#FF8FAA" strokeWidth="1"
      animate={{ ry: [18, 19, 18] }} transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.ellipse cx="50" cy="5" rx="7" ry="18" fill="#FFB6C1" stroke="#FF8FAA" strokeWidth="1"
      animate={{ ry: [18, 19, 18] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
    />
    <ellipse cx="30" cy="7" rx="3.5" ry="10" fill="#FF8FAA" opacity="0.4" />
    <ellipse cx="50" cy="7" rx="3.5" ry="10" fill="#FF8FAA" opacity="0.4" />
    <circle cx="40" cy="35" r="20" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="1.5" />
    <ellipse cx="34" cy="32" rx="2.5" ry="2.5" fill="#333" />
    <ellipse cx="46" cy="32" rx="2.5" ry="2.5" fill="#333" />
    <circle cx="35" cy="30.5" r="1" fill="#fff" />
    <circle cx="47" cy="30.5" r="1" fill="#fff" />
    <ellipse cx="40" cy="37" rx="2" ry="1.5" fill="#FF8FAA" />
    <path d="M37 39 Q40 42 43 39" stroke="#FF8FAA" strokeWidth="1" fill="none" />
    <circle cx="28" cy="38" r="3.5" fill="#FF8FAA" opacity="0.25" />
    <circle cx="52" cy="38" r="3.5" fill="#FF8FAA" opacity="0.25" />
  </svg>
);

const CornerSquirrel = () => {
  const [eating, setEating] = useState(false);

  return (
    <svg viewBox="0 0 80 70" style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setEating(true)}
      onMouseLeave={() => setEating(false)}
    >
      {/* Tail */}
      <motion.path
        d="M60 35 Q72 15 65 5 Q58 -3 52 12 Q48 25 56 33"
        fill="#D4A574" stroke="#C49060" strokeWidth="1"
        animate={{
          d: [
            "M60 35 Q72 15 65 5 Q58 -3 52 12 Q48 25 56 33",
            "M60 35 Q75 12 66 3 Q58 -5 52 12 Q48 25 56 33",
            "M60 35 Q72 15 65 5 Q58 -3 52 12 Q48 25 56 33",
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx="40" cy="35" r="16" fill="#D4A574" stroke="#C49060" strokeWidth="1.5" />
      <circle cx="28" cy="22" r="5" fill="#E8C9A5" stroke="#C49060" strokeWidth="0.8" />
      <circle cx="52" cy="22" r="5" fill="#E8C9A5" stroke="#C49060" strokeWidth="0.8" />
      <ellipse cx="34" cy="33" rx="2.5" ry="2.5" fill="#333" />
      <ellipse cx="46" cy="33" rx="2.5" ry="2.5" fill="#333" />
      <circle cx="35" cy="31.5" r="0.8" fill="#fff" />
      <circle cx="47" cy="31.5" r="0.8" fill="#fff" />
      <circle cx="40" cy="37" r="2" fill="#8B6944" />
      {/* Teeth */}
      <motion.rect x="38" y="39" width="4" height={eating ? 4 : 2.5} rx="0.8" fill="#fff" stroke="#ddd" strokeWidth="0.3"
        transition={{ duration: 0.3 }}
      />
      <circle cx="29" cy="38" r="3" fill="#E8A87C" opacity="0.3" />
      <circle cx="51" cy="38" r="3" fill="#E8A87C" opacity="0.3" />
      {/* Acorn (eating animation) */}
      {eating && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ellipse cx="40" cy="50" rx="3.5" ry="4.5" fill="#8B6944" />
          <rect x="37" y="45" width="6" height="3" rx="1.5" fill="#6B4F30" />
        </motion.g>
      )}
    </svg>
  );
};

const CornerJellyfish = () => (
  <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%' }}>
    <motion.path
      d="M15 40 Q15 10 40 10 Q65 10 65 40 Q55 37 40 40 Q25 37 15 40Z"
      fill="rgba(180, 140, 255, 0.6)" stroke="rgba(150, 100, 255, 0.4)" strokeWidth="1.5"
      animate={{
        d: [
          "M15 40 Q15 10 40 10 Q65 10 65 40 Q55 37 40 40 Q25 37 15 40Z",
          "M17 38 Q17 12 40 12 Q63 12 63 38 Q53 35 40 38 Q27 35 17 38Z",
          "M15 40 Q15 10 40 10 Q65 10 65 40 Q55 37 40 40 Q25 37 15 40Z",
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <ellipse cx="40" cy="25" rx="14" ry="12" fill="rgba(220, 200, 255, 0.25)" />
    <ellipse cx="33" cy="27" rx="2.2" ry="2.2" fill="#6B3FA0" />
    <ellipse cx="47" cy="27" rx="2.2" ry="2.2" fill="#6B3FA0" />
    <circle cx="34" cy="25.5" r="0.8" fill="rgba(255,255,255,0.6)" />
    <circle cx="48" cy="25.5" r="0.8" fill="rgba(255,255,255,0.6)" />
    <path d="M37 33 Q40 35 43 33" stroke="#8B5CF6" strokeWidth="1" fill="none" />
    {[22, 32, 40, 48, 58].map((x, i) => (
      <motion.path
        key={i}
        d={`M${x} 40 Q${x + 5} 52 ${x - 2} 65`}
        stroke={`rgba(${160 + i * 12}, ${120 + i * 18}, 255, 0.4)`}
        strokeWidth="1.8" fill="none" strokeLinecap="round"
        animate={{
          d: [
            `M${x} 40 Q${x + 7} 50 ${x - 3} 65`,
            `M${x} 40 Q${x - 7} 50 ${x + 3} 65`,
            `M${x} 40 Q${x + 7} 50 ${x - 3} 65`,
          ]
        }}
        transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
  </svg>
);

const CornerMascots = () => {
  return (
    <div className="corner-mascots">
      {/* Rabbit: Bottom Right — Peeking up */}
      <motion.div
        className="corner-mascot corner-br"
        animate={{ y: [10, -5, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CornerRabbit />
      </motion.div>

      {/* Squirrel: Top Right — Hanging/Swinging */}
      <motion.div
        className="corner-mascot corner-tr"
        animate={{ rotate: [0, 8, -8, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
      >
        <CornerSquirrel />
      </motion.div>

      {/* Jellyfish: Top Left — Pulsing & floating */}
      <motion.div
        className="corner-mascot corner-tl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.75, 1, 0.75],
          y: [0, -8, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CornerJellyfish />
      </motion.div>

      <style>{`
        .corner-mascots {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 40;
        }
        .corner-mascot {
          position: absolute;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.12));
          opacity: 0.9;
          pointer-events: auto;
        }
        .corner-br {
          bottom: -5px; right: 15px;
          width: 80px; height: 65px;
        }
        .corner-tr {
          top: -5px; right: 75px;
          width: 75px; height: 65px;
        }
        .corner-tl {
          top: 15px; left: 15px;
          width: 70px; height: 70px;
        }
      `}</style>
    </div>
  );
};

export default CornerMascots;
