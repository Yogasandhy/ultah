import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QUESTIONS = [
    {
        question: "Siapa yang paling sering AFK pas lagi mabar ML? 😴",
        answers: ["Aku (Cowok)", "Kamu (Cewek)", "Kita Berdua 😂"],
        correct: 1 // Adjust as needed
    },
    {
        question: "Game Roblox favorit kita buat main bareng?",
        answers: ["Adopt Me", "Blox Fruits", "Semua seru asal bareng kamu! 🎮"],
        correct: 2 // Trick answer
    },
    {
        question: "Apa yang paling sering kita lakuin pas LDR?",
        answers: ["Video Call sambil diem-dieman 📱", "Mabar sampai subuh 🎮", "Dua-duanya! 💕"],
        correct: 2
    },
    {
        question: "Hero ML favorit pasangan kamu?",
        answers: ["Carry yang katanya jago padahal feeder 😂", "Tank setia yang selalu protect", "Support yang healing terus"],
        correct: 1 // Adjust!
    },
];

const QuizScreen = ({ onNext }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [isShake, setIsShake] = useState(false);

    const handleAnswer = (index) => {
        if (index === QUESTIONS[currentQ].correct) {
            if (currentQ < QUESTIONS.length - 1) {
                setCurrentQ(prev => prev + 1);
            } else {
                onNext();
            }
        } else {
            setIsShake(true);
            setTimeout(() => setIsShake(false), 500);
        }
    };

    return (
        <div className="quiz-container">
            <motion.div
                className="quiz-card"
                key={currentQ}
                initial={{ x: 100, opacity: 0 }}
                animate={isShake ? { x: [-10, 10, -10, 10, 0] } : { x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring" }}
            >
                <div className="question-number">Question {currentQ + 1}/{QUESTIONS.length}</div>
                <h2>{QUESTIONS[currentQ].question}</h2>

                <div className="answers-grid">
                    {QUESTIONS[currentQ].answers.map((ans, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05, backgroundColor: "#FFC0CB" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAnswer(idx)}
                        >
                            {ans}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <style>{`
        .quiz-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          padding: 20px;
        }
        .quiz-card {
          background: rgba(255,255,255,0.9);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 500px;
          text-align: center;
          color: #333;
        }
        .question-number {
          color: #888;
          font-weight: bold;
          margin-bottom: 10px;
        }
        h2 {
          font-family: var(--font-heading);
          margin-bottom: 30px;
          font-size: 1.5rem;
        }
        .answers-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        button {
          padding: 15px;
          border-radius: 10px;
          border: 2px solid #eee;
          background: #fff;
          font-size: 1.1rem;
          color: #555;
          transition: all 0.2s;
        }
      `}</style>
        </div>
    );
};

export default QuizScreen;
