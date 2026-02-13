import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock Data for Photos
const PHOTOS = [
    { id: 1, text: "Kenangan 1", color: "#FFB7B2" },
    { id: 2, text: "Kenangan 2", color: "#B5EAD7" },
    { id: 3, text: "Kenangan 3", color: "#E2F0CB" },
    { id: 4, text: "Kenangan 4", color: "#FFDAC1" },
    { id: 5, text: "Aib Lucu 🤪", color: "#C7CEEA" },
    { id: 6, text: "First Date", color: "#F7C5CC" },
];

const SECRET_MESSAGE = "I Love You! 💖";

const Polaroid = ({ photo, index, constraintsRef }) => {
    // Randomize rotation and position
    const randomRotate = Math.random() * 20 - 10;
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;

    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, zIndex: 100, rotate: 0 }}
            whileTap={{ scale: 1.05, zIndex: 100 }}
            initial={{ x: randomX, y: randomY, rotate: randomRotate, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="polaroid"
            style={{ backgroundColor: '#fff', transform: `rotate(${randomRotate}deg)` }}
        >
            <div className="photo-inner" style={{ backgroundColor: photo.color }}>
                {/* Placeholder for real image */}
                <span className="photo-text">{photo.text}</span>
            </div>
            <div className="caption">
                <p>{photo.text}</p>
            </div>

            <style>{`
        .polaroid {
          width: 200px;
          height: 240px;
          padding: 10px 10px 30px 10px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
          position: absolute;
          cursor: grab;
          display: flex;
          flex-direction: column;
        }
        .photo-inner {
          width: 100%;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          font-weight: bold;
        }
        .caption {
          text-align: center;
          font-family: 'Comic Neue', cursive;
          margin-top: 10px;
          color: #333;
        }
      `}</style>
        </motion.div>
    );
};

const GalleryScreen = ({ onNext }) => {
    const containerRef = useRef(null);
    const [photos, setPhotos] = useState(PHOTOS);

    return (
        <div className="gallery-container" ref={containerRef}>
            <h2 className="instruction-text">Geser fotonya dong... Ada rahasia lho!</h2>

            {/* Secret Message Background */}
            <div className="secret-layer">
                <h1>{SECRET_MESSAGE}</h1>
            </div>

            <div className="polaroid-area">
                {photos.map((photo, index) => (
                    <Polaroid
                        key={photo.id}
                        photo={photo}
                        index={index}
                        constraintsRef={containerRef}
                    />
                ))}
            </div>

            <motion.button
                className="next-btn"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 3, type: "spring" }}
                onClick={onNext}
            >
                LANJUT KE KADO 🎁
            </motion.button>

            <style>{`
        .gallery-container {
          width: 100vw;
          height: 100vh;
          background-color: var(--color-pastel-yellow);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .instruction-text {
          position: absolute;
          top: 20px;
          z-index: 5;
          color: #555;
          font-family: var(--font-heading);
          background: rgba(255,255,255,0.8);
          padding: 10px 20px;
          border-radius: 20px;
        }
        .secret-layer {
          position: absolute;
          z-index: 0;
          opacity: 0.5;
          transform: rotate(-10deg);
        }
        .secret-layer h1 {
          font-size: 5rem;
          color: #E6E6FA; /* Lavender */
        }
        .polaroid-area {
          width: 80%;
          height: 60%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .next-btn {
          position: absolute;
          bottom: 30px;
          padding: 15px 30px;
          font-size: 1.2rem;
          background-color: var(--color-pastel-pink);
          color: white;
          border: none;
          border-radius: 30px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          z-index: 200;
        }
      `}</style>
        </div>
    );
};

export default GalleryScreen;
