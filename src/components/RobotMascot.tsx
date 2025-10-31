import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MessageCircle } from 'lucide-react';

interface RobotMascotProps {
  onChatOpen?: () => void;
}

export const RobotMascot = ({ onChatOpen }: RobotMascotProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Wave periodically
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate rotation based on mouse position
  const centerX = typeof window !== 'undefined' ? window.innerWidth - 100 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight - 100 : 0;
  const angle = Math.atan2(mousePosition.y - centerY, mousePosition.x - centerX);
  const rotation = (angle * 180) / Math.PI;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
    >
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        onClick={onChatOpen}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00CFFF] blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Robot body */}
        <motion.div
          className="relative w-20 h-20 bg-gradient-to-br from-[#6C63FF] to-[#00CFFF] rounded-2xl shadow-2xl flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{
              rotate: isWaving ? [0, -20, 20, -20, 20, 0] : rotation / 10,
            }}
            transition={{
              duration: isWaving ? 0.5 : 0.3,
            }}
          >
            <Bot className="w-10 h-10 text-white" />
          </motion.div>

          {/* Eyes */}
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </div>

          {/* Notification badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            <MessageCircle className="w-2.5 h-2.5 text-white" />
          </motion.div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 whitespace-nowrap"
            >
              <p className="text-sm">Hi! I'm your AI assistant 👋</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Click to chat with me!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
