import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
// import bgm from '../../assets/audio/bgm.mp3';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player">
            <audio ref={audioRef} loop>
                {/* <source src={bgm} type="audio/mp3" /> */}
            </audio>

            <motion.button
                className="control-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
            >
                {isPlaying ? "🎵 Pause" : "🔇 Play Music"}
            </motion.button>

            <style>{`
                .music-player {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                .control-btn {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(5px);
                    padding: 10px 20px;
                    border-radius: 30px;
                    border: 1px solid rgba(0,0,0,0.1);
                    color: #333;
                    font-size: 0.9rem;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default MusicPlayer;
