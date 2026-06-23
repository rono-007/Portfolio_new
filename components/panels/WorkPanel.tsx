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

const experiences = [
  {
    role: "AI Research",
    company: "Coding Jr",
    logo: "https://img.logo.dev/codingjr.school?token=pk_PEzUIRNTScaVBfae7LqPUw&retina=true",
    period: "06/2025 – Present",
    description: "Explore state-of-the-art AI models (like LLMs, transformers, vision models). Conduct literature reviews on recent advancements (e.g., ChatGPT, Gemini, CodeBERT). Propose novel ideas to improve educational tools, automate code explanations, or generate tutorials.",
    tags: ["AI", "LLMs", "Transformers", "Vision Models", "ChatGPT", "Gemini", "CodeBERT"],
    current: true,
  }
];

export const WorkPanel: React.FC = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {experiences.map((exp) => (
        <motion.div
          key={exp.company}
          variants={fadeUp}
          className="bg-white/[0.03] rounded-xl border border-border p-6 space-y-5 hover:border-accent/20 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                {exp.current && (
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-accent/20 text-accent rounded-full uppercase tracking-wider">Current</span>
                )}
              </div>
              <p className="text-dim text-sm">{exp.company}</p>
              <p className="font-mono text-xs text-accent/70 mt-1">{exp.period}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-dim text-sm leading-relaxed">{exp.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-accent/10 text-accent rounded-md border border-accent/10 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Timeline hint */}
      <motion.div variants={fadeUp} className="text-center py-8">
        <div className="w-px h-12 bg-border mx-auto mb-4" />
        <p className="text-dim text-xs font-mono">Beginning of career timeline</p>
      </motion.div>
    </motion.div>
  );
};
