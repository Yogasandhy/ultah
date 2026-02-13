import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPEECH_BUBBLES = [
    "Hai! 💕",
    "Lucu deh~",
    "Kamu manis!",
    "Semangat!",
    "Sayang~ 💖",
    "Yeay! ✨",
    "Hehe 😆",
    "I 💜 U!",
];

// SVG Mascot Components
const RabbitSVG = ({ isHovered, isClicked }) => (
    <svg viewBox="0 0 80 80" className="mascot-svg">
        {/* Ears */}
        <motion.ellipse
            cx="28" cy="12" rx="8" ry="20"
            fill="#FFB6C1" stroke="#FF8FAA" strokeWidth="1.5"
            animate={isHovered ? { ry: 22, fill: '#FFC0CB' } : isClicked ? { ry: 18 } : { ry: [20, 21, 20] }}
            transition={isClicked ? { duration: 0.2 } : { duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
            cx="52" cy="12" rx="8" ry="20"
            fill="#FFB6C1" stroke="#FF8FAA" strokeWidth="1.5"
            animate={isHovered ? { ry: 22, fill: '#FFC0CB' } : isClicked ? { ry: 18 } : { ry: [20, 21, 20] }}
            transition={isClicked ? { duration: 0.2 } : { duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        {/* Inner ears */}
        <ellipse cx="28" cy="14" rx="4" ry="12" fill="#FF8FAA" opacity="0.5" />
        <ellipse cx="52" cy="14" rx="4" ry="12" fill="#FF8FAA" opacity="0.5" />
        {/* Head */}
        <circle cx="40" cy="45" r="22" fill="#FFD1DC" stroke="#FFB6C1" strokeWidth="2" />
        {/* Eyes */}
        <motion.ellipse
            cx="33" cy="42" rx={isHovered ? 4 : 3} ry={isHovered ? 4.5 : 3}
            fill="#333"
            animate={isClicked ? { ry: 0.5 } : {}}
            transition={{ duration: 0.15 }}
        />
        <motion.ellipse
            cx="47" cy="42" rx={isHovered ? 4 : 3} ry={isHovered ? 4.5 : 3}
            fill="#333"
            animate={isClicked ? { ry: 0.5 } : {}}
            transition={{ duration: 0.15 }}
        />
        {/* Eye shine */}
        <circle cx="34.5" cy="40.5" r="1.2" fill="#fff" />
        <circle cx="48.5" cy="40.5" r="1.2" fill="#fff" />
        {/* Nose */}
        <ellipse cx="40" cy="48" rx="2.5" ry="1.8" fill="#FF8FAA" />
        {/* Mouth */}
        <path d="M37 51 Q40 54 43 51" stroke="#FF8FAA" strokeWidth="1.2" fill="none" />
        {/* Cheeks */}
        <circle cx="27" cy="49" r="4" fill="#FF8FAA" opacity="0.3" />
        <circle cx="53" cy="49" r="4" fill="#FF8FAA" opacity="0.3" />
    </svg>
);

const SquirrelSVG = ({ isHovered, isClicked }) => (
    <svg viewBox="0 0 80 80" className="mascot-svg">
        {/* Tail */}
        <motion.path
            d="M62 40 Q75 20 68 10 Q60 0 55 15 Q50 30 58 38"
            fill="#D4A574" stroke="#C49060" strokeWidth="1.5"
            animate={isHovered ? { d: "M62 40 Q80 15 70 5 Q62 -2 55 15 Q50 30 58 38" } : {}}
            transition={{ duration: 0.3 }}
        />
        {/* Body */}
        <ellipse cx="40" cy="55" rx="18" ry="16" fill="#D4A574" stroke="#C49060" strokeWidth="1.5" />
        {/* Belly */}
        <ellipse cx="40" cy="58" rx="11" ry="10" fill="#F5E6D3" />
        {/* Head */}
        <circle cx="40" cy="35" r="18" fill="#D4A574" stroke="#C49060" strokeWidth="1.5" />
        {/* Ears */}
        <motion.circle cx="26" cy="22" r="6" fill="#E8C9A5" stroke="#C49060" strokeWidth="1"
            animate={isHovered ? { r: 7 } : {}}
        />
        <motion.circle cx="54" cy="22" r="6" fill="#E8C9A5" stroke="#C49060" strokeWidth="1"
            animate={isHovered ? { r: 7 } : {}}
        />
        {/* Eyes */}
        <motion.ellipse
            cx="34" cy="33" rx={isHovered ? 3.5 : 2.8} ry={isHovered ? 4 : 2.8}
            fill="#333"
            animate={isClicked ? { ry: 0.5 } : {}}
        />
        <motion.ellipse
            cx="46" cy="33" rx={isHovered ? 3.5 : 2.8} ry={isHovered ? 4 : 2.8}
            fill="#333"
            animate={isClicked ? { ry: 0.5 } : {}}
        />
        <circle cx="35" cy="31.5" r="1" fill="#fff" />
        <circle cx="47" cy="31.5" r="1" fill="#fff" />
        {/* Nose */}
        <circle cx="40" cy="38" r="2.5" fill="#8B6944" />
        {/* Mouth/teeth */}
        <rect x="38" y="40" width="4" height="3" rx="1" fill="#fff" stroke="#ddd" strokeWidth="0.5" />
        {/* Cheeks */}
        <circle cx="28" cy="38" r="3.5" fill="#E8A87C" opacity="0.4" />
        <circle cx="52" cy="38" r="3.5" fill="#E8A87C" opacity="0.4" />
        {/* Acorn (when hovered) */}
        {isHovered && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ellipse cx="40" cy="68" rx="4" ry="5" fill="#8B6944" />
                <rect x="36" y="63" width="8" height="4" rx="2" fill="#6B4F30" />
            </motion.g>
        )}
    </svg>
);

const JellyfishSVG = ({ isHovered, isClicked }) => (
    <svg viewBox="0 0 80 80" className="mascot-svg">
        {/* Body/bell */}
        <motion.path
            d="M15 45 Q15 10 40 10 Q65 10 65 45 Q55 42 40 45 Q25 42 15 45Z"
            fill="rgba(180, 140, 255, 0.7)" stroke="rgba(150, 100, 255, 0.5)" strokeWidth="1.5"
            animate={isHovered ? { fill: 'rgba(200, 160, 255, 0.8)' } : {
                d: [
                    "M15 45 Q15 10 40 10 Q65 10 65 45 Q55 42 40 45 Q25 42 15 45Z",
                    "M17 43 Q17 12 40 12 Q63 12 63 43 Q53 40 40 43 Q27 40 17 43Z",
                    "M15 45 Q15 10 40 10 Q65 10 65 45 Q55 42 40 45 Q25 42 15 45Z",
                ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner glow */}
        <ellipse cx="40" cy="28" rx="16" ry="14" fill="rgba(220, 200, 255, 0.3)" />
        {/* Eyes */}
        <motion.ellipse
            cx="33" cy="30" rx={isHovered ? 3 : 2.5} ry={isHovered ? 3.5 : 2.5}
            fill="#6B3FA0"
            animate={isClicked ? { ry: 0.5 } : {}}
        />
        <motion.ellipse
            cx="47" cy="30" rx={isHovered ? 3 : 2.5} ry={isHovered ? 3.5 : 2.5}
            fill="#6B3FA0"
            animate={isClicked ? { ry: 0.5 } : {}}
        />
        <circle cx="34" cy="28.5" r="1" fill="rgba(255,255,255,0.7)" />
        <circle cx="48" cy="28.5" r="1" fill="rgba(255,255,255,0.7)" />
        {/* Mouth */}
        <path d="M36 36 Q40 39 44 36" stroke="#8B5CF6" strokeWidth="1.2" fill="none" />
        {/* Tentacles */}
        {[20, 30, 40, 50, 60].map((x, i) => (
            <motion.path
                key={i}
                d={`M${x} 45 Q${x + (i % 2 ? 5 : -5)} 58 ${x} 70`}
                stroke={`rgba(${160 + i * 10}, ${120 + i * 15}, 255, 0.5)`}
                strokeWidth="2" fill="none" strokeLinecap="round"
                animate={{
                    d: [
                        `M${x} 45 Q${x + 8} 55 ${x - 3} 70`,
                        `M${x} 45 Q${x - 8} 55 ${x + 3} 70`,
                        `M${x} 45 Q${x + 8} 55 ${x - 3} 70`,
                    ]
                }}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
        ))}
    </svg>
);

const MASCOT_COMPONENTS = {
    rabbit: RabbitSVG,
    squirrel: SquirrelSVG,
    jellyfish: JellyfishSVG,
};

const FloatingMascots = () => {
    const [activeMascots, setActiveMascots] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const types = [
                { type: 'rabbit', movement: 'hop' },
                { type: 'squirrel', movement: 'dash' },
                { type: 'jellyfish', movement: 'float' },
            ];
            const chosen = types[Math.floor(Math.random() * types.length)];
            const newMascot = {
                id: Date.now(),
                ...chosen,
                startY: Math.random() * (window.innerHeight - 200) + 100,
                speechBubble: Math.random() > 0.5 ? SPEECH_BUBBLES[Math.floor(Math.random() * SPEECH_BUBBLES.length)] : null,
            };
            setActiveMascots(prev => [...prev.slice(-3), newMascot]);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="floating-mascot-layer">
            <AnimatePresence>
                {activeMascots.map(m => (
                    <MascotSprite key={m.id} mascot={m} />
                ))}
            </AnimatePresence>
            <style>{`
        .floating-mascot-layer {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 50;
        }
        .mascot-svg { width: 100%; height: 100%; }
        .mascot-sprite {
          position: absolute;
          width: 70px; height: 70px;
          cursor: pointer;
          pointer-events: auto;
          user-select: none;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
        }
        .speech-bubble {
          position: absolute;
          top: -30px; left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.9);
          color: #333;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          pointer-events: none;
        }
        .speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -5px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid rgba(255,255,255,0.9);
        }
      `}</style>
        </div>
    );
};

const MascotSprite = ({ mascot }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [heartBurst, setHeartBurst] = useState(false);
    const w = window.innerWidth;
    const MascotSVG = MASCOT_COMPONENTS[mascot.type];

    const animations = {
        hop: {
            x: [-80, w + 80],
            y: [mascot.startY, mascot.startY - 60, mascot.startY, mascot.startY - 60, mascot.startY, mascot.startY - 60, mascot.startY],
            transition: { duration: 12, ease: 'linear' }
        },
        dash: {
            x: [-80, w * 0.3, w * 0.3, w * 0.7, w * 0.7, w + 80],
            transition: { duration: 8, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'easeInOut' }
        },
        float: {
            x: [-80, w + 80],
            y: [mascot.startY, mascot.startY - 40, mascot.startY + 40, mascot.startY - 20, mascot.startY],
            rotate: [0, 10, -10, 5, 0],
            transition: { duration: 16, ease: 'linear' }
        }
    };

    const handleClick = () => {
        setIsClicked(true);
        setHeartBurst(true);
        setTimeout(() => setIsClicked(false), 300);
        setTimeout(() => setHeartBurst(false), 1200);
    };

    return (
        <motion.div
            className="mascot-sprite"
            initial={{ x: -80, y: mascot.startY, opacity: 0.9 }}
            animate={animations[mascot.movement]}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.2 }}
        >
            {/* Speech bubble */}
            {mascot.speechBubble && (
                <motion.div
                    className="speech-bubble"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1, 1, 0], y: 0 }}
                    transition={{ duration: 4, times: [0, 0.1, 0.8, 1] }}
                >
                    {mascot.speechBubble}
                </motion.div>
            )}

            <MascotSVG isHovered={isHovered} isClicked={isClicked} />

            {/* Heart burst on click */}
            {heartBurst && (
                <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                    {[0, 60, 120, 180, 240, 300].map(angle => (
                        <motion.span
                            key={angle}
                            style={{ position: 'absolute', fontSize: '1rem' }}
                            initial={{ opacity: 1, x: 0, y: 0 }}
                            animate={{
                                opacity: 0,
                                x: Math.cos(angle * Math.PI / 180) * 35,
                                y: Math.sin(angle * Math.PI / 180) * 35,
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            ❤️
                        </motion.span>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default FloatingMascots;
