import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import correctSfx from '../../assets/audio/success.mp3';
// import wrongSfx from '../../assets/audio/wrong.mp3';
// import useSound from 'use-sound';

const CORRECT_CODE = "jadian"; // Example passcode (lowercase)

const PasscodeScreen = ({ onNext }) => {
    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false);

    // const [playCorrect] = useSound(correctSfx);
    // const [playWrong] = useSound(wrongSfx);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.toLowerCase() === CORRECT_CODE) {
            // playCorrect();
            onNext();
        } else {
            // playWrong();
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
            setInput("");
        }
    };

    return (
        <div className="gatekeeper-container">
            <motion.div
                className="card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring" }}
            >
                <h2>🔒 Security Check</h2>
                <p>Sebutkan kata sandi untuk masuk! (Hint: 'jadian')</p>

                <form onSubmit={handleSubmit}>
                    <motion.input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ketik di sini..."
                        className={isError ? "error" : ""}
                        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        autoFocus
                    />
                    <button type="submit">UNLOCK 🔓</button>
                </form>
            </motion.div>

            <style>{`
            .gatekeeper-container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                color: white;
            }
            .card {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 40px;
                border-radius: 20px;
                border: 2px solid rgba(255,255,255,0.2);
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            h2 {
                margin-bottom: 10px;
                font-family: var(--font-heading);
            }
            input {
                padding: 15px;
                border-radius: 10px;
                border: 2px solid #fff;
                background: transparent;
                color: #fff;
                font-size: 1.2rem;
                margin-top: 20px;
                width: 100%;
                text-align: center;
                outline: none;
            }
            input.error {
                border-color: #ff6b6b;
                box-shadow: 0 0 10px #ff6b6b;
            }
            button {
                margin-top: 20px;
                width: 100%;
                padding: 15px;
                border-radius: 10px;
                background: #fff;
                color: var(--color-bg-dark);
                font-weight: bold;
                border: none;
                transition: transform 0.2s;
            }
            button:active {
                transform: scale(0.95);
            }
        `}</style>
        </div>
    );
};

export default PasscodeScreen;
