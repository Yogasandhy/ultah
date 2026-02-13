import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTRIES = [
    {
        date: "Awal kita kenal di PUBGM...",
        text: "Gak nyangka dari satu squad random di PUBGM bisa jadi sedekat ini. Dari ngobrol di voice chat sambil loot bareng, sampai sekarang kamu jadi orang paling penting di hidup aku. 🔫💕",
        emoji: "🎮"
    },
    {
        date: "Malem-malem vc sambil mabar...",
        text: "Kita main ML bareng, dan jujur... kebanyakan kalahnya wkwk 😂 Tapi gapapa, kalah menang gak penting. Yang penting denger kamu marah-marah pas kena kill itu hiburan tersendiri. 🎮",
        emoji: "🎮"
    },
    {
        date: "Petualangan di Roblox...",
        text: "Dari naik gunung bareng sampai lari-lari di map horror, kamu selalu teriak duluan padahal bilangnya gak takut. Momen-momen itu yang bikin aku kangen terus. 👻🏔️",
        emoji: "🏔️"
    },
    {
        date: "Hari-hari yang berat...",
        text: "Kadang LDR bikin rindu gak ketulungan. Tapi setiap denger suara kamu di telepon, dunia rasanya baik-baik aja lagi. Kamu itu rumah aku, walau jauh. Semoga kita cepat ketemu ya... 🌙",
        emoji: "🌙"
    },
    {
        date: "Sekarang, di hari spesial kamu...",
        text: "Dari jauh aku gak bisa peluk kamu langsung. Tapi semua kata-kata di sini aku tulis pakai cinta beneran. Semoga sebentar lagi kita bisa ketemu beneran. Happy Birthday, my player 2. ❤️",
        emoji: "🎂"
    },
];

const DiaryScreen = ({ onNext }) => {
    const [currentEntry, setCurrentEntry] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [hearts, setHearts] = useState([]);
    const intervalRef = useRef(null);

    // Typewriter effect
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
        }, 35);

        return () => clearInterval(intervalRef.current);
    }, [currentEntry]);

    // Parallax heart rain
    useEffect(() => {
        const heartInterval = setInterval(() => {
            const newHeart = {
                id: Date.now() + Math.random(),
                x: Math.random() * 100,
                size: 0.6 + Math.random() * 1.2,
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 2,
                opacity: 0.15 + Math.random() * 0.35,
            };
            setHearts(prev => [...prev.slice(-12), newHeart]);
        }, 600);
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
                    ❤️
                </motion.div>
            ))}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentEntry}
                    className="diary-page"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className="page-corner" />
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
                    <div className="page-number">{currentEntry + 1} / {ENTRIES.length}</div>
                </motion.div>
            </AnimatePresence>

            <motion.button
                className="diary-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
            >
                {isTyping ? 'Skip ⏩' : isLast ? 'Lanjut Petualangan! 🚀' : 'Halaman Berikutnya 📖'}
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
          background: linear-gradient(145deg, #fdf6e3, #f5e6c8);
          border-radius: 12px;
          padding: 40px 35px 30px;
          max-width: 480px; width: 100%;
          color: #4a3728;
          box-shadow:
            0 15px 40px rgba(0,0,0,0.25),
            inset 0 0 60px rgba(139,90,43,0.08);
          border: 1px solid rgba(139,90,43,0.15);
          z-index: 10;
          perspective: 1000px;
          font-family: 'Comic Neue', cursive;
        }
        .page-corner {
          position: absolute; top: 0; right: 0;
          width: 0; height: 0;
          border-top: 40px solid rgba(0,0,0,0.06);
          border-left: 40px solid transparent;
          border-radius: 0 12px 0 0;
        }
        .diary-header { text-align: center; margin-bottom: 20px; }
        .diary-emoji { font-size: 3rem; display: block; margin-bottom: 8px; }
        .diary-date {
          font-style: italic; opacity: 0.65;
          font-size: 1rem; font-family: var(--font-heading);
        }
        .diary-body { min-height: 120px; }
        .diary-text {
          font-size: 1.2rem; line-height: 1.7;
          white-space: pre-wrap;
        }
        .cursor-blink {
          animation: blink 0.7s step-end infinite;
          font-weight: bold; color: #8b5a2b;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .page-number {
          text-align: right; margin-top: 20px;
          font-size: 0.85rem; opacity: 0.4;
        }
        .diary-btn {
          margin-top: 30px; z-index: 10;
          padding: 16px 35px; font-size: 1.1rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #d4a373, #8b5a2b);
          color: #fff; font-weight: bold;
          box-shadow: 0 8px 25px rgba(139,90,43,0.35);
          font-family: var(--font-heading);
        }
      `}</style>
        </div>
    );
};

export default DiaryScreen;
