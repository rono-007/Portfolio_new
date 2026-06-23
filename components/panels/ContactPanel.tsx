import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ContactPanel: React.FC = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* CTA */}
      <motion.div variants={fadeUp} className="text-center py-6">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Let's build something <span className="text-accent">intelligent</span>.
        </h3>
        <p className="text-dim text-sm max-w-sm mx-auto leading-relaxed">
          Always open to discussing AI research, new technology initiatives, and creative collaborations.
        </p>
      </motion.div>

      {/* Email CTA */}
      <motion.div variants={fadeUp}>
        <a
          href="mailto:iemrono2022@gmail.com"
          className="block w-full py-4 bg-accent text-bg font-semibold text-center rounded-xl hover:bg-accent/90 transition-colors duration-300 text-sm tracking-wide"
        >
          iemrono2022@gmail.com
        </a>
      </motion.div>

      {/* Social Links */}
      <motion.div variants={fadeUp} className="space-y-3">
        <p className="font-mono text-[10px] text-dim uppercase tracking-widest">Connect elsewhere</p>
        {[
          { name: 'GitHub', url: 'https://github.com/rono-007', handle: '@rono-007' },
          { name: 'LinkedIn', url: 'https://linkedin.com/in/ranajoy-nag', handle: '/in/ranajoy-nag' },
          { name: 'Instagram', url: 'https://instagram.com/monoc_/', handle: '@monoc_' },
        ].map(link => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-4 px-5 bg-white/[0.03] rounded-xl border border-border hover:border-accent/20 group transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium">{link.name}</span>
              <span className="text-dim font-mono text-xs">{link.handle}</span>
            </div>
            <svg className="w-4 h-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        ))}
      </motion.div>

      {/* Availability indicator */}
      <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 pt-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <p className="text-dim text-xs font-mono">Currently available for new opportunities</p>
      </motion.div>
    </motion.div>
  );
};
