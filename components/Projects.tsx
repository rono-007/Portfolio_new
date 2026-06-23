import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from './ui/Reveal';
import { Project } from '../types';

const projects: Project[] = [
  {
    title: "Mini-Copilot-HR-Coding-Assistant",
    description: "A smart, interactive assistant designed to help with: HR tasks like interview tips, email writing, and candidate screening. Python coding help, debugging, and code explanations.",
    tags: ["Streamlit", "Hugging Face", "Python", "NLP", "HR Automation"],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "JobSense",
    description: "This project leverages a custom Transformer-based model to analyze historical job data and predict emerging job roles along with their estimated base salaries.",
    tags: ["Jupyter Notebook", "Transformer Model", "Machine Learning", "Data Analysis", "Salary Prediction"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "MoodTune",
    description: "This project is a Python-based application that recommends music in real time by analyzing the user's facial expressions through webcam input.",
    tags: ["Jupyter Notebook", "Computer Vision", "OpenCV", "Music Recommendation", "Real-time Analysis"],
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const Projects: React.FC = () => {
  return (
    <section className="bg-background py-24 md:py-32 relative border-t border-muted/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        <Reveal>
          <div className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-xs sm:text-sm text-accent mb-4 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">
                Selected Works
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[1.1]">
                Featured <span className="italic text-muted">Projects.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className={`flex flex-col gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <motion.div variants={itemVariants}>
                    <div className="text-xs font-serif text-muted italic mb-4">0{index + 1}</div>
                    <h3 className="text-3xl md:text-5xl font-serif text-primary mb-6 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted leading-relaxed text-lg font-light">
                      {project.description}
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-surface text-primary text-[11px] font-medium border border-muted/10 uppercase tracking-wide cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-6">
                    <button className="flex items-center gap-3 text-sm font-bold text-accent uppercase tracking-widest group-hover:text-primary transition-colors duration-500">
                      View Case Study
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-2 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </motion.div>
                </div>

                <div className="w-full lg:w-1/2">
                  <motion.div 
                    variants={itemVariants}
                    className="relative w-full aspect-[4/3] bg-surface overflow-hidden group/image cursor-pointer shadow-lg"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000 ease-in-out group-hover/image:scale-105 group-hover/image:grayscale-0 group-hover/image:opacity-100" 
                    />
                    
                    {/* Subtle Overlay to match editorial vibe */}
                    <div className="absolute inset-0 mix-blend-multiply bg-primary/5 group-hover/image:bg-transparent transition-colors duration-700 pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};