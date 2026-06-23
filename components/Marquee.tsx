import React from 'react';

const techStackTop = [
  "PyTorch", "TensorFlow", "Hugging Face", "LLMs", "NLP", "Computer Vision"
];

const techStackBottom = [
  "LangChain", "Transformers", "Python", "MySQL", "Deep Learning", "OpenCV"
];

// Duplicate items to ensure seamless looping
const marqueeTopItems = [...techStackTop, ...techStackTop, ...techStackTop, ...techStackTop];
const marqueeBottomItems = [...techStackBottom, ...techStackBottom, ...techStackBottom, ...techStackBottom];

export const Marquee: React.FC = () => {
  return (
    <section className="bg-surface py-20 relative overflow-hidden flex flex-col gap-6 group border-t border-muted/10">
      
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-surface to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-surface to-transparent z-20 pointer-events-none" />
      
      {/* Row 1: Forward Motion */}
      <div className="relative flex items-center overflow-hidden">
        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {marqueeTopItems.map((item, index) => (
            <div key={index} className="flex items-center mx-6">
              <Badge name={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Motion */}
      <div className="relative flex items-center overflow-hidden">
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused] whitespace-nowrap">
          {marqueeBottomItems.map((item, index) => (
            <div key={index} className="flex items-center mx-6">
              <Badge name={item} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

const Badge: React.FC<{ name: string }> = ({ name }) => (
  <div className="px-8 py-4 bg-background border border-muted/20 flex items-center gap-4 transition-all duration-500 hover:border-primary/30 group/badge cursor-default">
    <span className="text-xl md:text-3xl font-serif text-primary opacity-60 group-hover/badge:opacity-100 group-hover/badge:italic transition-all duration-300">
      {name}
    </span>
    <div className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover/badge:opacity-100 transition-all duration-300 mx-2" />
  </div>
);