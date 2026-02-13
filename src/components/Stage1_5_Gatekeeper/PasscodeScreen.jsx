import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CORRECT_CODE = "lopyuuu";

const PasscodeScreen = ({ onNext }) => {
    const [input, setInput] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.toLowerCase().trim() === CORRECT_CODE) {
            onNext();
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
            setInput("");
        }
    };

    return (
        <div className="gatekeeper-container">
            <div className="gatekeeper-glow" />

            <motion.div
                className="card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="lock-icon">🔒</div>
                <h2>security check</h2>
                <p className="subtitle">ketik password buat masuk ke hati aku... uhuk</p>
                <p className="hint-text">(hint: {CORRECT_CODE})</p>

                <form onSubmit={handleSubmit}>
                    <motion.input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="ketik di sini..."
                        className={isError ? "error" : ""}
                        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        autoFocus
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        unlock 🔓
                    </motion.button>
                </form>
            </motion.div>

            <style>{`
                .gatekeeper-container {
                    display: flex; align-items: center; justify-content: center;
                    height: 100vh; width: 100vw;
                    color: white; position: relative;
                    padding: 20px;
                }
                .gatekeeper-glow {
                    position: absolute; width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(167,139,250,0.15), transparent 70%);
                    z-index: 1; pointer-events: none;
                }
                .card {
                    background: rgba(255, 255, 255, 0.06);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    padding: 40px 30px;
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.1);
                    text-align: center;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                    width: 100%; max-width: 400px;
                    z-index: 10;
                }
                .lock-icon {
                    font-size: 3rem; margin-bottom: 20px;
                }
                h2 {
                    margin-bottom: 10px; font-family: var(--font-heading);
                    font-size: 1.8rem;
                    background: linear-gradient(135deg, #a78bfa, #f472b6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .subtitle {
                    opacity: 0.8; font-size: 1rem; margin-bottom: 8px;
                    line-height: 1.5;
                }
                .hint-text {
                    opacity: 0.5; font-size: 0.9rem; margin-bottom: 30px;
                    font-family: monospace; letter-spacing: 0.05em;
                }
                input {
                    padding: 16px 20px;
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.2);
                    background: rgba(0,0,0,0.2);
                    color: #fff; font-size: 1.1rem;
                    width: 100%; text-align: center;
                    outline: none; transition: all 0.3s;
                    font-family: var(--font-heading);
                }
                input::placeholder { color: rgba(255,255,255,0.3); }
                input:focus {
                    border-color: #a78bfa;
                    background: rgba(0,0,0,0.3);
                    box-shadow: 0 0 0 4px rgba(167,139,250,0.15);
                }
                input.error {
                    border-color: #ef4444;
                    box-shadow: 0 0 0 4px rgba(239,68,68,0.15);
                }
                button {
                    margin-top: 25px; width: 100%;
                    padding: 16px; border-radius: 50px;
                    background: linear-gradient(135deg, #a78bfa, #818cf8);
                    color: white; font-weight: bold; font-size: 1.1rem;
                    border: none; cursor: pointer;
                    box-shadow: 0 8px 25px rgba(167,139,250,0.4);
                    font-family: var(--font-heading);
                }
            `}</style>
        </div>
    );
};

export default PasscodeScreen;
