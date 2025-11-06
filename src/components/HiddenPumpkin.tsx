import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Thanksgiving colors
const fallColors = [
  '#D2691E', // Chocolate
  '#8B4513', // SaddleBrown
  '#A0522D', // Sienna
  '#CD853F', // Peru
  '#DAA520', // GoldenRod
];

const getRandomFallColor = () => {
  return fallColors[Math.floor(Math.random() * fallColors.length)];
};

export const HiddenPumpkin = () => {
  const [showPumpkin, setShowPumpkin] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Set random position
  useEffect(() => {
    const maxX = window.innerWidth - 40; // Account for pumpkin size
    const maxY = window.innerHeight - 40;
    
    setPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY
    });
  }, []);

  const handlePumpkinClick = () => {
    setShowPumpkin(!showPumpkin);
  };

  if (!showPumpkin) {
    return (
      <motion.div
        className="fixed cursor-pointer z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        }}
        onClick={handlePumpkinClick}
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <span 
          className="text-4xl opacity-70 hover:opacity-100 transition-all duration-300"
          style={{
            display: 'inline-block',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          🦃
        </span>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handlePumpkinClick}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20,
            rotate: {
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut'
            }
          }}
          className="text-center p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, #8B4513, #D2691E)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            border: '2px solid #F5DEB3',
          }}
        >
          <span 
            className="text-9xl block mb-6"
            style={{
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
              animation: 'bounce 2s infinite',
            }}
          >
            🦃
          </span>
          <p className="text-amber-100 text-2xl font-bold mb-2">Happy Thanksgiving! 🍁</p>
          <p className="text-amber-50 mb-4">Wishing you a wonderful holiday season!</p>
          <p className="text-amber-100 text-sm mt-2">Click anywhere to close</p>
          
          {/* Animated falling leaves */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                top: -50,
                left: `${Math.random() * 100}%`,
                opacity: 0.8,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: '100vh',
                x: `${Math.random() * 100 - 50}px`,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
              style={{
                position: 'absolute',
                zIndex: -1,
                color: getRandomFallColor(),
              }}
            >
              {['🍁', '🍂', '🌾'][Math.floor(Math.random() * 3)]}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HiddenPumpkin;
