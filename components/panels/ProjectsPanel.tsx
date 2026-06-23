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

const projects = [
  {
    title: "Mini-Copilot-HR-Coding-Assistant",
    description: "A smart, interactive assistant designed to help with: HR tasks like interview tips, email writing, and candidate screening. Python coding help, debugging, and code explanations.",
    tags: ["Streamlit", "Hugging Face", "Python", "NLP", "HR Automation"],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
    index: "01"
  },
  {
    title: "JobSense",
    description: "This project leverages a custom Transformer-based model to analyze historical job data and predict emerging job roles along with their estimated base salaries.",
    tags: ["Jupyter Notebook", "Transformer Model", "Machine Learning", "Salary Prediction"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    index: "02"
  },
  {
    title: "MoodTune",
    description: "A Python-based application that recommends music in real time by analyzing the user's facial expressions through webcam input.",
    tags: ["Computer Vision", "OpenCV", "Music Recommendation", "Real-time Analysis"],
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    index: "03"
  }
];

export const ProjectsPanel: React.FC = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {projects.map((project) => (
        <motion.div
          key={project.title}
          variants={fadeUp}
          className="group bg-white/[0.03] rounded-xl border border-border hover:border-accent/20 transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="relative w-full aspect-[2/1] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="font-mono text-accent text-xs bg-bg/80 backdrop-blur-sm px-2 py-1 rounded-md border border-accent/20">{project.index}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">{project.title}</h3>
            <p className="text-dim text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-accent/10 text-accent rounded-md border border-accent/10 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
