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

const skillCategories = [
  {
    title: "AI & Machine Learning",
    description: "Architecting intelligent systems using state-of-the-art neural architectures and advanced deep learning paradigms.",
    tags: ["Deep Learning", "NLP", "Computer Vision", "Transformers", "LLMs"],
    icon: "🧠"
  },
  {
    title: "Programming & Development",
    description: "Building robust, scalable backends and logic-heavy applications with a focus on performance.",
    tags: ["Python", "Java", "C++", "OOP", "MySQL", "Data Structures"],
    icon: "⚡"
  },
  {
    title: "Tools & Technologies",
    description: "Utilizing modern research frameworks and development tools to streamline the ML lifecycle.",
    tags: ["Hugging Face", "PyTorch", "TensorFlow", "Jupyter", "Git", "LangChain"],
    icon: "🔧"
  }
];

const allTechStack = [
  "PyTorch", "TensorFlow", "Hugging Face", "LLMs", "NLP", "Computer Vision",
  "LangChain", "Transformers", "Python", "MySQL", "Deep Learning", "OpenCV"
];

export const SkillsPanel: React.FC = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
      {/* Skill Categories */}
      {skillCategories.map((cat, index) => (
        <motion.div
          key={cat.title}
          variants={fadeUp}
          className="bg-white/[0.03] rounded-xl border border-border p-5 space-y-4 hover:border-accent/20 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{cat.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">{cat.title}</h3>
                <span className="font-mono text-accent/50 text-xs">0{index + 1}</span>
              </div>
              <p className="text-dim text-sm leading-relaxed mt-1">{cat.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cat.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-accent/10 text-accent rounded-md border border-accent/10 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Full Tech Stack */}
      <motion.div variants={fadeUp}>
        <p className="font-mono text-[10px] text-dim uppercase tracking-widest mb-3">Full Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {allTechStack.map(tech => (
            <span key={tech} className="px-3 py-2 bg-white/5 rounded-lg border border-border text-sm text-white/80 hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
