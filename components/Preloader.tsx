import React from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="h-[2px] bg-accent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-dim font-mono text-xs tracking-[0.3em] uppercase"
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
};