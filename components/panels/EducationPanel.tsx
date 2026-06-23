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

const educationData = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "University of Engineering & Management",
    logo: "https://img.logo.dev/uem.edu.in?token=pk_PEzUIRNTScaVBfae7LqPUw&retina=true",
    period: "2022 – Present",
    current: true,
  },
  {
    degree: "Higher Secondary Education (WBCHSE)",
    institution: "Sanskrit Collegiate School",
    logo: "https://img.logo.dev/en.wikipedia.org?token=pk_PEzUIRNTScaVBfae7LqPUw&retina=true",
    period: "2021",
    current: false,
  }
];

export const EducationPanel: React.FC = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {educationData.map((edu) => (
        <motion.div
          key={edu.institution}
          variants={fadeUp}
          className="bg-white/[0.03] rounded-xl border border-border p-6 hover:border-accent/20 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src={edu.logo} alt={edu.institution} className="w-8 h-8 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                {edu.current && (
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-accent/20 text-accent rounded-full uppercase tracking-wider">Ongoing</span>
                )}
              </div>
              <p className="text-dim text-sm mt-1">{edu.institution}</p>
              <p className="font-mono text-xs text-accent/70 mt-2">{edu.period}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div variants={fadeUp} className="text-center py-6">
        <div className="w-px h-10 bg-border mx-auto mb-3" />
        <p className="text-dim text-xs font-mono">Foundation</p>
      </motion.div>
    </motion.div>
  );
};
