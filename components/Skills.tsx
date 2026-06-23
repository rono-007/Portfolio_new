import React from 'react';
import { Reveal } from './ui/Reveal';

const skillCategories = [
  {
    title: "AI & Machine Learning",
    description: "Architecting intelligent systems using state-of-the-art neural architectures and advanced deep learning paradigms.",
    tags: ["Deep Learning", "NLP", "Computer Vision", "Transformers", "LLMs"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
      </svg>
    ),
  },
  {
    title: "Programming & Development",
    description: "Building robust, scalable backends and logic-heavy applications with a focus on performance and maintainability.",
    tags: ["Python", "Java", "C++", "OOP", "MySQL", "Data Structures"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Tools & Technologies",
    description: "Utilizing modern research frameworks and development tools to streamline the machine learning lifecycle.",
    tags: ["Hugging Face", "PyTorch", "TensorFlow", "Jupyter", "Git", "LangChain"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    ),
  }
];

export const Skills: React.FC = () => {
  return (
    <section className="bg-background py-24 md:py-32 relative border-t border-muted/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div>
              <p className="text-xs sm:text-sm text-accent mb-4 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">Expertise</p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[1.1]">
                Technical <span className="italic text-muted">Mastery.</span>
              </h2>
            </div>
            <div className="md:max-w-md">
              <p className="text-muted font-light leading-relaxed">
                A carefully curated stack of technologies empowering the creation of robust, intelligent solutions.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((cat, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="group relative h-full bg-white border border-muted/20 p-8 md:p-10 transition-all duration-500 hover:border-primary/40 hover:shadow-xl">
                
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-surface flex items-center justify-center text-primary rounded-none border border-muted/20">
                    {cat.icon}
                  </div>
                  <div className="text-xs font-serif text-muted italic">0{index + 1}</div>
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-primary mb-4">
                  {cat.title}
                </h3>
                
                <p className="text-muted text-sm md:text-base leading-relaxed mb-10 font-light flex-grow">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-muted/10 mt-auto">
                  {cat.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-surface text-primary text-[11px] md:text-xs font-medium tracking-wide uppercase border border-muted/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};