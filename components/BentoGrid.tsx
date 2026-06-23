import React from 'react';
import { motion } from 'framer-motion';
import type { PanelId } from '../App';

interface BentoGridProps {
  activePanel: PanelId;
  onOpenPanel: (id: PanelId) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  }
};

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenPanel }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-screen w-screen p-3 md:p-4 lg:p-5"
    >
      {/* 
        Grid Layout:
        Desktop: 4 columns x 3 rows
        ┌──────────────┬────────┬────────────┐
        │  Hero (2c,2r)│ About  │  Skills    │
        │              │        │            │
        ├──────────────┤────────┼────────────┤
        │  Projects    │Work    │  Education │
        │              │        │            │
        ├──────────────┴────────┴────────────┤
        │            Contact (full width)     │
        └─────────────────────────────────────┘
      */}
      <div className="h-full grid grid-cols-2 lg:grid-cols-4 grid-rows-[1fr_1fr_auto] lg:grid-rows-[1fr_1fr_80px] gap-2 md:gap-3">

        {/* Hero Card — spans 2 columns, 2 rows on large, 2 cols 1 row on small */}
        <motion.div
          variants={itemVariants}
          className="col-span-2 row-span-1 lg:row-span-2 bg-card rounded-2xl border border-border p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Decorative accent dot */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 w-3 h-3 rounded-full bg-accent animate-pulse" />
          
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />

          <div className="relative z-10">
            <p className="font-mono text-xs text-dim tracking-[0.2em] uppercase mb-4 md:mb-6">Portfolio / 2025</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
              Ranajoy<br />
              <span className="text-accent">Nag</span>
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <p className="text-dim text-sm md:text-base max-w-md leading-relaxed">
              AI Researcher & Tech Innovator — building intelligent systems at the intersection of deep learning, NLP, and computer vision.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/rono-007" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-dim hover:text-accent hover:border-accent/30 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/ranajoy-nag" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-dim hover:text-accent hover:border-accent/30 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://instagram.com/monoc_/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-dim hover:text-accent hover:border-accent/30 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608C4.516 2.567 5.783 2.297 7.15 2.233 8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.618.138 4.326.43 3.252 1.504 2.178 2.578 1.886 3.87 1.82 5.305 1.762 6.585 1.748 6.993 1.748 12s.014 5.415.072 6.695c.066 1.435.358 2.727 1.432 3.801 1.074 1.074 2.366 1.366 3.801 1.432C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.435-.066 2.727-.358 3.801-1.432 1.074-1.074 1.366-2.366 1.432-3.801.058-1.28.072-1.688.072-6.695s-.014-5.415-.072-6.695c-.066-1.435-.358-2.727-1.432-3.801C19.674.43 18.382.138 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* About Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => onOpenPanel('about')}
          className="col-span-1 row-span-1 bg-card rounded-2xl border border-border p-5 md:p-6 flex flex-col justify-between cursor-pointer hover:bg-cardHover hover:border-borderHover transition-all duration-300 group relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
            </div>
            <svg className="w-4 h-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-accent transition-colors">About</h2>
            <p className="text-dim text-xs md:text-sm leading-relaxed">AI enthusiast exploring deep learning & NLP</p>
          </div>
          {/* Photo peek */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
            <img src="assets/me.jpg" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => onOpenPanel('skills')}
          className="col-span-1 row-span-1 bg-card rounded-2xl border border-border p-5 md:p-6 flex flex-col justify-between cursor-pointer hover:bg-cardHover hover:border-borderHover transition-all duration-300 group overflow-hidden relative"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
            </div>
            <svg className="w-4 h-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-accent transition-colors">Skills</h2>
            <p className="text-dim text-xs md:text-sm leading-relaxed">ML · DL · NLP · Python · PyTorch</p>
          </div>
          {/* Decorative floating tags */}
          <div className="absolute -bottom-2 -right-2 flex flex-wrap gap-1 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none max-w-[120px]">
            {['PyTorch','TF','CV','NLP'].map(t => (
              <span key={t} className="text-[8px] px-1.5 py-0.5 border border-white/20 rounded">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Projects Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => onOpenPanel('projects')}
          className="col-span-1 lg:col-span-2 row-span-1 bg-card rounded-2xl border border-border p-5 md:p-6 flex flex-col justify-between cursor-pointer hover:bg-cardHover hover:border-borderHover transition-all duration-300 group relative overflow-hidden"
        >
          {/* Background image with tint */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
            </div>
            <svg className="w-4 h-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-accent transition-colors">Projects</h2>
            <p className="text-dim text-xs md:text-sm leading-relaxed">Mini-Copilot · JobSense · MoodTune</p>
            <div className="flex gap-2 mt-3">
              <span className="font-mono text-accent text-2xl md:text-3xl font-bold">3</span>
              <span className="text-dim text-xs self-end mb-1">featured works</span>
            </div>
          </div>
        </motion.div>

        {/* Work Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => onOpenPanel('work')}
          className="col-span-1 row-span-1 bg-card rounded-2xl border border-border p-5 md:p-6 flex flex-col justify-between cursor-pointer hover:bg-cardHover hover:border-borderHover transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
            </div>
            <svg className="w-4 h-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-accent transition-colors">Experience</h2>
            <p className="text-dim text-xs md:text-sm leading-relaxed">AI Research @ Coding Jr</p>
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          variants={itemVariants}
          onClick={() => onOpenPanel('education')}
          className="col-span-1 row-span-1 bg-card rounded-2xl border border-border p-5 md:p-6 flex flex-col justify-between cursor-pointer hover:bg-cardHover hover:border-borderHover transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
            </div>
            <svg className="w-4 h-4 text-dim group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-accent transition-colors">Education</h2>
            <p className="text-dim text-xs md:text-sm leading-relaxed">B.Tech CSE · UEM Kolkata</p>
          </div>
        </motion.div>

        {/* Contact Bar — full width bottom row */}
        <motion.div
          variants={itemVariants}
          onClick={() => onOpenPanel('contact')}
          className="col-span-2 lg:col-span-4 row-span-1 lg:row-auto bg-card rounded-2xl border border-border px-5 md:px-8 py-4 flex items-center justify-between cursor-pointer hover:bg-cardHover hover:border-accent/20 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm md:text-base font-medium group-hover:text-accent transition-colors">Available for collaboration</span>
            <span className="hidden md:inline text-dim text-sm">— Let's build something intelligent together</span>
          </div>
          <div className="flex items-center gap-2 text-dim group-hover:text-accent transition-colors">
            <span className="text-xs md:text-sm font-mono">Get in touch</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
