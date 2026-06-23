import React from 'react';
import { Reveal } from './ui/Reveal';

export const Contact: React.FC = () => {
  return (
    <section className="bg-background py-32 md:py-48 relative overflow-hidden border-t border-muted/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24 text-center relative z-10">
        <Reveal width="100%">
            <p className="text-xs sm:text-sm text-accent mb-6 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">
                Collaboration
            </p>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif text-primary tracking-tight leading-[0.9] mb-8">
            Let's <span className="italic text-muted">Connect.</span>
            </h2>
            <p className="text-muted text-lg md:text-xl font-light mb-16 max-w-2xl mx-auto text-balance">
            Always open to discussing AI research, new technology initiatives, and creative collaborations.
            </p>
            <a 
            href="mailto:iemrono2022@gmail.com" 
            className="group relative inline-flex items-center gap-4 px-10 py-5 border border-primary text-primary hover:bg-primary hover:text-white rounded-full overflow-hidden text-sm uppercase tracking-widest font-medium transition-all duration-500"
            >
            <span>Start a conversation</span>
            <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
        </Reveal>
      </div>
    </section>
  );
};