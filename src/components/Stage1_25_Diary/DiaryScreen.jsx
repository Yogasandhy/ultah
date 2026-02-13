import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTRIES = [
    {
        date: "malem-malem call sambil mabar...",
        text: "ga nyangka dari satu squad random PUBGM bisa sampe sedekat ini ya. dari ngobrol di call sambil looting bareng sampe sekarang kamu jadi orang paling penting buat aku 🔫💕",
        emoji: "🎮"
    },
    {
        date: "mabar tiap malem...",
        text: "kita mabar ML, dan jujur... kebanyakan kalahnya wkwk 😂 tapi gpp sih, kalah menang ga penting. yg penting denger kamu ngomel pas kena kill itu hiburan tersendiri",
        emoji: "🎮"
    },
    {
        date: "petualangan roblox...",
        text: "dari naik gunung bareng sampe lari-lari di map horror, kamu selalu teriak duluan padahal katanya ga takut?? 😂 momen-momen itu yg bikin kangen terus 👻🏔️",
        emoji: "🏔️"
    },
    {
        date: "hari-hari yg berat...",
        text: "kadang LDR bikin kangen ga ketulungan. tapi tiap denger suara kamu di telepon, dunia rasanya baik-baik aja lagi. kamu tuh rumah aku, walau jauh. semoga kita cepet ketemu ya... 🌙",
        emoji: "🌙"
    },
    {
        date: "hari ini, hari spesial kamu...",
        text: "dari jauh aku ga bisa peluk kamu langsung. tapi semua kata-kata di sini full dari hati. semoga bentar lagi kita bisa ketemu beneran ya. happy birthday, my player 2 ❤️",
        emoji: "🎂"
    },
];

const DiaryScreen = ({ onNext }) => {
    const [currentEntry, setCurrentEntry] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [hearts, setHearts] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fullText = ENTRIES[currentEntry].text;
        let charIndex = 0;
        setDisplayedText('');
        setIsTyping(true);

        intervalRef.current = setInterval(() => {
            charIndex++;
            setDisplayedText(fullText.slice(0, charIndex));
            if (charIndex >= fullText.length) {
                clearInterval(intervalRef.current);
                setIsTyping(false);
            }
        }, 30);

        return () => clearInterval(intervalRef.current);
    }, [currentEntry]);

    useEffect(() => {
        const heartInterval = setInterval(() => {
            const newHeart = {
                id: Date.now() + Math.random(),
                x: Math.random() * 100,
                size: 0.5 + Math.random() * 1,
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 2,
                opacity: 0.1 + Math.random() * 0.25,
            };
            setHearts(prev => [...prev.slice(-10), newHeart]);
        }, 700);
        return () => clearInterval(heartInterval);
    }, []);

    const handleNext = () => {
        if (isTyping) {
            clearInterval(intervalRef.current);
            setDisplayedText(ENTRIES[currentEntry].text);
            setIsTyping(false);
            return;
        }
        if (currentEntry < ENTRIES.length - 1) {
            setCurrentEntry(prev => prev + 1);
        } else {
            onNext();
        }
    };

    const entry = ENTRIES[currentEntry];
    const isLast = currentEntry >= ENTRIES.length - 1 && !isTyping;

    return (
        <div className="diary-container">
            {hearts.map(h => (
                <motion.div
                    key={h.id}
                    className="falling-heart"
                    style={{ left: `${h.x}%`, fontSize: `${h.size}rem`, opacity: h.opacity }}
                    initial={{ y: -50 }}
                    animate={{ y: '110vh' }}
                    transition={{ duration: h.duration, delay: h.delay, ease: 'linear' }}
                >
                    💜
                </motion.div>
            ))}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentEntry}
                    className="diary-page"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <div className="diary-header">
                        <span className="diary-emoji">{entry.emoji}</span>
                        <p className="diary-date">{entry.date}</p>
                    </div>
                    <div className="diary-body">
                        <p className="diary-text">
                            {displayedText}
                            {isTyping && <span className="cursor-blink">|</span>}
                        </p>
                    </div>
                    <div className="page-dots">
                        {ENTRIES.map((_, i) => (
                            <span key={i} className={`dot ${i === currentEntry ? 'active' : ''} ${i < currentEntry ? 'done' : ''}`} />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <motion.button
                className="diary-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(167,139,250,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
            >
                {isTyping ? 'skip ⏩' : isLast ? 'lanjut! 🚀' : 'next 📖'}
            </motion.button>

            <style>{`
        .diary-container {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          height: 100vh; width: 100vw;
          position: relative; overflow: hidden;
          color: #fff; padding: 20px;
        }
        .falling-heart {
          position: absolute; top: 0;
          pointer-events: none; z-index: 1;
        }
        .diary-page {
          position: relative;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 35px 30px 25px;
          max-width: 460px; width: 100%;
          color: #fff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 10;
        }
        .diary-header { text-align: center; margin-bottom: 18px; }
        .diary-emoji { font-size: 2.5rem; display: block; margin-bottom: 6px; }
        .diary-date {
          font-style: italic; opacity: 0.5;
          font-size: 0.95rem; font-family: var(--font-heading);
          letter-spacing: 0.03em;
        }
        .diary-body { min-height: 100px; }
        .diary-text {
          font-size: 1.15rem; line-height: 1.7;
          white-space: pre-wrap; opacity: 0.9;
        }
        .cursor-blink {
          animation: blink 0.7s step-end infinite;
          font-weight: bold; color: #a78bfa;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .page-dots {
          display: flex; gap: 6px; justify-content: center;
          margin-top: 20px;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.3s;
        }
        .dot.active { background: #a78bfa; transform: scale(1.3); }
        .dot.done { background: rgba(167,139,250,0.4); }
        .diary-btn {
          margin-top: 25px; z-index: 10;
          padding: 14px 35px; font-size: 1.05rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #a78bfa, #818cf8);
          color: #fff; font-weight: 700;
          box-shadow: 0 8px 25px rgba(167,139,250,0.35);
          font-family: var(--font-heading);
        }
      `}</style>
        </div>
    );
};

export default DiaryScreen;
