import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const GRID_SIZE = 3;
const CELL_SIZE = 90;
const GAP = 8;

const PIECE_LABELS = [
    "ka", "mu", "se",
    "ga", "la", "nya",
    "❤️", "✨", "❤️"
];

// Gradient pairs for each piece (solved state)
const PIECE_GRADIENTS = [
    ['#f472b6', '#db2777'], // ka - pink
    ['#a78bfa', '#7c3aed'], // mu - purple
    ['#f472b6', '#db2777'], // se - pink
    ['#a78bfa', '#7c3aed'], // ga - purple
    ['#f472b6', '#db2777'], // la - pink
    ['#a78bfa', '#7c3aed'], // nya - purple
    ['#ef4444', '#b91c1c'], // heart - red
    ['#fbbf24', '#d97706'], // star - gold
    ['#ef4444', '#b91c1c'], // heart - red
];

function generateShuffledPieces() {
    const pieces = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    return pieces;
}

const PuzzleScreen = ({ onNext }) => {
    const [pieces, setPieces] = useState(() => generateShuffledPieces());
    const [selected, setSelected] = useState(null);
    const [solved, setSolved] = useState(false);
    const [moveCount, setMoveCount] = useState(0);

    const isSolved = useCallback((p) => {
        return p.every((val, idx) => val === idx);
    }, []);

    const handlePieceClick = (index) => {
        if (solved) return;

        if (selected === null) {
            setSelected(index);
        } else {
            const newPieces = [...pieces];
            [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
            setPieces(newPieces);
            setSelected(null);
            setMoveCount(prev => prev + 1);

            if (isSolved(newPieces)) {
                setSolved(true);
            }
        }
    };

    const getRow = (idx) => Math.floor(idx / GRID_SIZE);
    const getCol = (idx) => idx % GRID_SIZE;

    return (
        <div className="puzzle-container">
            {solved && <Confetti numberOfPieces={150} gravity={0.08} />}

            <motion.h1
                className="puzzle-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                🧩 puzzle hati
            </motion.h1>

            <p className="puzzle-subtitle">
                {solved ? '✨ yeay berhasil! ✨' : 'tap 2 kotak buat tuker posisi!'}
            </p>

            <div
                className="puzzle-grid"
                style={{
                    width: GRID_SIZE * (CELL_SIZE + GAP) + GAP + 40, // +40 for padding
                    height: GRID_SIZE * (CELL_SIZE + GAP) + GAP + 40,
                }}
            >
                {pieces.map((pieceIdx, slotIdx) => {
                    const isSelected = selected === slotIdx;
                    const isCorrect = pieceIdx === slotIdx;

                    return (
                        <motion.div
                            key={`piece-${pieceIdx}`} // Use pieceIdx for key to track element
                            className={`puzzle-piece ${isSelected ? 'selected' : ''}`}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                background: `linear-gradient(135deg, ${PIECE_GRADIENTS[pieceIdx][0]}, ${PIECE_GRADIENTS[pieceIdx][1]})`,
                                gridRow: getRow(slotIdx) + 1,
                                gridColumn: getCol(slotIdx) + 1,
                            }}
                            layout
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePieceClick(slotIdx)}
                            animate={isSelected ? {
                                boxShadow: '0 0 20px rgba(255,255,255,0.6)',
                                scale: 1.1,
                                zIndex: 20
                            } : {
                                boxShadow: solved ? '0 4px 10px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.3)',
                                scale: 1,
                                zIndex: 1
                            }}
                        >
                            <span className="piece-label">{PIECE_LABELS[pieceIdx]}</span>
                        </motion.div>
                    );
                })}
            </div>

            <p className="move-counter">langkah: {moveCount}</p>

            <AnimatePresence>
                {solved && (
                    <motion.div
                        className="solved-overlay"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="solved-text">"kamu segalanya" ❤️</h2>
                        <motion.button
                            className="puzzle-next-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                        >
                            lanjut! 🚀
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .puzzle-container {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    height: 100vh; width: 100vw;
                    color: #fff; padding: 20px;
                    position: relative;
                }
                .puzzle-title {
                    font-family: var(--font-heading);
                    font-size: 2rem; margin-bottom: 8px;
                    text-shadow: 0 0 20px rgba(244,114,182,0.4);
                }
                .puzzle-subtitle {
                    opacity: 0.7; margin-bottom: 25px;
                    font-size: 1rem; letter-spacing: 0.03em;
                }
                .puzzle-grid {
                    display: grid;
                    grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
                    grid-template-rows: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
                    gap: ${GAP}px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 24px;
                    padding: 20px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                    position: relative;
                }
                .puzzle-piece {
                    border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    user-select: none;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .piece-label {
                    font-size: 1.5rem; font-weight: bold;
                    font-family: var(--font-heading);
                    color: #fff;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .move-counter {
                    font-family: var(--font-heading);
                    margin-top: 20px; opacity: 0.4;
                    font-size: 0.9rem; letter-spacing: 0.05em;
                }
                .solved-overlay {
                    position: absolute; bottom: 40px;
                    display: flex; flex-direction: column; align-items: center;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(10px);
                    padding: 20px 40px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .solved-text {
                    font-family: var(--font-heading);
                    font-size: 1.5rem; color: #f472b6;
                    margin-bottom: 15px;
                    text-shadow: 0 0 20px rgba(244,114,182,0.5);
                }
                .puzzle-next-btn {
                    padding: 14px 35px; font-size: 1.1rem;
                    border-radius: 50px; border: none;
                    background: linear-gradient(135deg, #f472b6, #a78bfa);
                    color: #fff; font-weight: 700;
                    box-shadow: 0 8px 25px rgba(244,114,182,0.4);
                    font-family: var(--font-heading);
                }
                @media (max-width: 380px) {
                    .puzzle-grid {
                        transform: scale(0.85);
                    }
                }
            `}</style>
        </div>
    );
};

export default PuzzleScreen;
