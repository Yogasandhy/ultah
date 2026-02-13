import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const GRID_SIZE = 3;
const CELL_SIZE = 90;
const GAP = 4;

// Shuffled indices for puzzle pieces (excluding solved state)
function generateShuffledPieces() {
    const pieces = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    // Fisher-Yates shuffle, ensuring it's not already solved
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    return pieces;
}

const PIECE_LABELS = [
    "Ka", "mu", " Se",
    "ga", "la", "nya",
    "  ❤", "️ ", " ❤️"
];

const PIECE_COLORS = [
    '#FF6B9D', '#FF8FA3', '#FFB3C1',
    '#C44569', '#FF6B9D', '#FF8FA3',
    '#FFB3C1', '#C44569', '#FF6B9D',
];

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
            // Swap pieces
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
            {solved && <Confetti numberOfPieces={120} gravity={0.06} />}

            <motion.h1
                className="puzzle-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                🧩 Puzzle Hati
            </motion.h1>

            <p className="puzzle-subtitle">
                {solved ? '✨ Kamu berhasil! ✨' : 'Tap 2 piece untuk tuker posisinya!'}
            </p>

            <div
                className="puzzle-grid"
                style={{
                    width: GRID_SIZE * (CELL_SIZE + GAP) + GAP,
                    height: GRID_SIZE * (CELL_SIZE + GAP) + GAP,
                }}
            >
                {pieces.map((pieceIdx, slotIdx) => {
                    const isSelected = selected === slotIdx;
                    const isCorrect = pieceIdx === slotIdx;

                    return (
                        <motion.div
                            key={`piece-${slotIdx}`}
                            className={`puzzle-piece ${isSelected ? 'selected' : ''} ${isCorrect && !solved ? 'correct' : ''}`}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                background: solved
                                    ? `linear-gradient(135deg, ${PIECE_COLORS[pieceIdx]}, ${PIECE_COLORS[(pieceIdx + 1) % 9]})`
                                    : isSelected
                                        ? 'rgba(255,255,255,0.3)'
                                        : `linear-gradient(135deg, ${PIECE_COLORS[pieceIdx]}aa, ${PIECE_COLORS[pieceIdx]}66)`,
                                gridRow: getRow(slotIdx) + 1,
                                gridColumn: getCol(slotIdx) + 1,
                            }}
                            layout
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePieceClick(slotIdx)}
                            animate={isSelected ? {
                                boxShadow: '0 0 25px rgba(255,107,157,0.6)',
                                scale: 1.05,
                            } : {
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                scale: 1,
                            }}
                        >
                            <span className="piece-label">{PIECE_LABELS[pieceIdx]}</span>
                        </motion.div>
                    );
                })}
            </div>

            <p className="move-counter">Langkah: {moveCount}</p>

            <AnimatePresence>
                {solved && (
                    <motion.div
                        className="solved-message"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', delay: 0.5 }}
                    >
                        <h2>Kamu Segalanya ❤️</h2>
                        <motion.button
                            className="puzzle-next-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                        >
                            Lanjut! 🚀
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
          font-size: 2.2rem;
          margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(255,107,157,0.4);
        }
        .puzzle-subtitle {
          opacity: 0.7; margin-bottom: 25px;
          font-size: 1rem;
        }
        .puzzle-grid {
          display: grid;
          grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
          grid-template-rows: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
          gap: ${GAP}px;
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: ${GAP}px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .puzzle-piece {
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(5px);
          border: 2px solid rgba(255,255,255,0.15);
          user-select: none;
          transition: border-color 0.2s;
        }
        .puzzle-piece.selected {
          border-color: rgba(255,255,255,0.8);
        }
        .puzzle-piece.correct {
          border-color: rgba(100,255,100,0.4);
        }
        .piece-label {
          font-size: 1.4rem;
          font-weight: bold;
          font-family: var(--font-heading);
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .move-counter {
          margin-top: 15px; opacity: 0.5;
          font-size: 0.9rem;
        }
        .solved-message {
          margin-top: 25px;
          text-align: center;
        }
        .solved-message h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: #FF6B9D;
          text-shadow: 0 0 20px rgba(255,107,157,0.5);
          margin-bottom: 15px;
        }
        .puzzle-next-btn {
          padding: 16px 35px; font-size: 1.1rem;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #FF6B9D, #C44569);
          color: #fff; font-weight: bold;
          box-shadow: 0 8px 25px rgba(196,69,105,0.4);
          font-family: var(--font-heading);
        }
      `}</style>
        </div>
    );
};

export default PuzzleScreen;
