import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { GithubPreview } from './GithubPreview';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const photographyUrl = "https://rono-007.github.io/my_portfolio.github.io/";

  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center bg-background px-6 sm:px-12 md:px-24 overflow-hidden pt-20 pb-10">
        
        {/* Subtle noise texture or background accent could go here, but keeping it clean for editorial */}

        <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 md:gap-8">
          
          <div className="flex-1">
            <Reveal width="100%">
              <div className="inline-block border-b border-accent pb-1 mb-10 text-xs sm:text-sm text-accent tracking-[0.2em] uppercase font-medium">
                Available for Research Collaborations
              </div>
            </Reveal>

            <Reveal width="100%" delay={200}>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] tracking-tight text-primary mb-6">
                Ranajoy<br/>
                <span className="italic font-light text-accent ml-8 sm:ml-16 md:ml-24">Nag.</span>
              </h1>
            </Reveal>
            
            <Reveal width="100%" delay={300}>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-muted mt-4 md:mt-8 tracking-tight">
                AI Researcher <span className="italic text-primary">&</span> Developer.
              </h2>
            </Reveal>
          </div>

          <div className="w-full md:w-[400px] lg:w-[500px] flex flex-col items-start md:items-end text-left md:text-right">
            <Reveal width="100%" delay={400}>
              <p className="text-base sm:text-lg text-muted font-light leading-relaxed mb-10 text-balance">
                Exploring the frontiers of <strong className="font-normal text-primary">Deep Learning</strong> and <strong className="font-normal text-primary">NLP</strong> to architect the intelligent tools of tomorrow. Merging code with a <a href={photographyUrl} target="_blank" rel="noopener noreferrer" className="italic text-accent hover:opacity-70 transition-opacity border-b border-accent/30 pb-0.5">cinematic vision</a>.
              </p>
            </Reveal>

            <Reveal width="100%" delay={500}>
              <div className="flex flex-col sm:flex-row gap-6 w-full justify-start md:justify-end">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 rounded-full text-sm font-medium tracking-wide"
                >
                  <span>View Tech Work</span>
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
                <a 
                  href="mailto:iemrono2022@gmail.com" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent text-white hover:bg-primary transition-colors duration-500 rounded-full text-sm font-medium tracking-wide"
                >
                  Get In Touch
                </a>
              </div>
            </Reveal>
          </div>
          
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-6 sm:left-12 md:left-24 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
          <div className="w-16 h-[1px] bg-muted/30 overflow-hidden">
            <motion.div 
              className="w-full h-full bg-accent origin-left"
              animate={{ 
                scaleX: [0, 1, 0],
                x: ["-100%", "0%", "100%"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </section>

      <GithubPreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        url="https://github.com/rono-007" 
      />
    </>
  );
};