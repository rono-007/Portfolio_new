import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const AboutPanel: React.FC = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* Photo */}
      <motion.div variants={fadeUp} className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-white/5">
        <img src="assets/me.jpg" alt="Ranajoy Nag" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="font-mono text-xs text-accent tracking-wider">Kolkata, India</p>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div variants={fadeUp} className="space-y-4">
        <p className="text-white/90 text-base leading-relaxed">
          As an AI enthusiast, I explore state-of-the-art models to improve educational and operational tools. My expertise lies deeply rooted in <span className="text-accent font-medium">machine learning</span>, deep learning, and natural language processing.
        </p>
        <p className="text-dim text-base leading-relaxed">
          Renowned for my innovative approach to AI research, I began my career with a strong foundation in computer science, swiftly establishing a distinctive problem-solving style.
        </p>
        <p className="text-dim text-base leading-relaxed">
          My creative drive propelled me to lead projects like <span className="text-accent">Mini-Copilot-HR-Coding-Assistant</span>, driving significant advancements in tech. I continue to innovate with cutting-edge AI models, consistently pushing the boundaries of what is possible.
        </p>
      </motion.div>

      {/* Quick Facts */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        {[
          { label: 'Location', value: 'Kolkata, WB' },
          { label: 'Focus', value: 'AI Research' },
          { label: 'University', value: 'UEM Kolkata' },
          { label: 'Status', value: 'Open to collab' },
        ].map(item => (
          <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-border">
            <p className="font-mono text-[10px] text-dim uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-sm font-medium text-white">{item.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Social */}
      <motion.div variants={fadeUp} className="flex gap-3">
        {[
          { name: 'GitHub', url: 'https://github.com/rono-007' },
          { name: 'LinkedIn', url: 'https://linkedin.com/in/ranajoy-nag' },
          { name: 'Instagram', url: 'https://instagram.com/monoc_/' },
        ].map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 bg-white/5 rounded-xl border border-border text-center text-sm font-medium text-dim hover:text-accent hover:border-accent/30 transition-all duration-300"
          >
            {link.name}
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
};
