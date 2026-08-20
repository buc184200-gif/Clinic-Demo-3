import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-axis-main text-axis-text"
        >
          <div className="w-full max-w-xs flex flex-col items-center space-y-8">
            <div className="relative w-full h-1 bg-axis-secondary rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-axis-green"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-3xl font-serif text-axis-text">
                {Math.min(progress, 100)}%
              </span>
              <span className="text-xs tracking-[0.2em] text-axis-muted uppercase">
                Preparing your movement experience
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
