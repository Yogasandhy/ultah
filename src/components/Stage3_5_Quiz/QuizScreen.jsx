import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QUESTIONS = [
    {
        question: "siapa yg paling sering AFK pas lagi mabar ML? 😴",
        answers: ["aku (cowok)", "kamu (cewek)", "dua-duanya wkwk 😂"],
        correct: 1
    },
    {
        question: "game Roblox favorit kita buat main bareng?",
        answers: ["Adopt Me", "Blox Fruits", "semua seru asal bareng kamu! 🎮"],
        correct: 2
    },
    {
        question: "apa yg paling sering kita lakuin pas LDR?",
        answers: ["vc sambil diem-dieman 📱", "mabar sampe ngantuk 🎮", "dua-duanya! 💕"],
        correct: 2
    },
    {
        question: "hero ML favorit pasangan kamu?",
        answers: ["carry yg katanya jago padahal feeder 😂", "tank setia yg selalu protect", "support yg healing terus"],
        correct: 1
    },
];

const QuizScreen = ({ onNext }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [isShake, setIsShake] = useState(false);
    const [selectedWrong, setSelectedWrong] = useState(null);

    const handleAnswer = (index) => {
        if (index === QUESTIONS[currentQ].correct) {
            if (currentQ < QUESTIONS.length - 1) {
                setCurrentQ(prev => prev + 1);
                setSelectedWrong(null);
            } else {
                onNext();
            }
        } else {
            setSelectedWrong(index);
            setIsShake(true);
            setTimeout(() => { setIsShake(false); setSelectedWrong(null); }, 600);
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-progress-wrap">
                <motion.div
                    className="quiz-progress-fill"
                    animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                />
            </div>

            <motion.div
                className="quiz-card"
                key={currentQ}
                initial={{ x: 80, opacity: 0 }}
                animate={isShake ? { x: [-8, 8, -8, 8, 0] } : { x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <p className="quiz-step">question {currentQ + 1}/{QUESTIONS.length}</p>
                <h2 className="quiz-question">{QUESTIONS[currentQ].question}</h2>

                <div className="quiz-answers">
                    {QUESTIONS[currentQ].answers.map((ans, idx) => (
                        <motion.button
                            key={idx}
                            className={`quiz-answer-btn ${selectedWrong === idx ? 'wrong' : ''}`}
                            whileHover={{ scale: 1.03, borderColor: 'rgba(167,139,250,0.5)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleAnswer(idx)}
                        >
                            <span className="answer-letter">{String.fromCharCode(65 + idx)}</span>
                            {ans}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <style>{`
        .quiz-container {
          display: flex; align-items: center; justify-content: center;
          height: 100vh; width: 100vw; padding: 20px;
          position: relative;
        }
        .quiz-progress-wrap {
          position: absolute; top: 24px; left: 24px; right: 24px;
          height: 4px; background: rgba(255,255,255,0.1);
          border-radius: 10px; overflow: hidden;
        }
        .quiz-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #fbbf24, #f472b6);
          border-radius: 10px;
        }
        .quiz-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 40px 30px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
          width: 100%; max-width: 460px;
          text-align: center; color: #fff;
        }
        .quiz-step {
          font-size: 0.85rem; opacity: 0.4;
          font-family: var(--font-heading);
          margin-bottom: 12px;
          letter-spacing: 0.06em;
        }
        .quiz-question {
          font-family: var(--font-heading);
          font-size: 1.4rem; margin-bottom: 28px;
          line-height: 1.4; font-weight: 600;
        }
        .quiz-answers {
          display: flex; flex-direction: column; gap: 12px;
        }
        .quiz-answer-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 20px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          font-size: 1.05rem; color: #fff;
          text-align: left;
          font-family: var(--font-heading);
          transition: all 0.2s;
        }
        .quiz-answer-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        .quiz-answer-btn.wrong {
          border-color: rgba(239,68,68,0.5);
          background: rgba(239,68,68,0.1);
        }
        .answer-letter {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: rgba(167,139,250,0.15);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.85rem;
          flex-shrink: 0;
          color: #a78bfa;
        }
      `}</style>
        </div>
    );
};

export default QuizScreen;
