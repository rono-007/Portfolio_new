import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';

const faqs = [
  "What inspired you to pursue a career in AI research?",
  "How do you stay updated with the latest advancements in AI?",
  "What has been your most challenging project so far?"
];

export const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <section className="bg-surface py-24 md:py-32 relative border-t border-muted/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="sticky top-32">
                <p className="text-xs sm:text-sm text-accent mb-4 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">
                  FAQ
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-primary tracking-tight leading-[1.1] mb-8">
                  Common <br/>
                  <span className="italic text-muted">Inquiries.</span>
                </h2>
                <p className="text-muted font-light leading-relaxed">
                  A few questions I often get asked about my workflow, research process, and journey in the AI landscape.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((q, index) => (
                 <Reveal key={index} delay={index * 100} width="100%">
                    <div className={`border-b border-muted/20 transition-colors ${openIndex === index ? 'border-primary/40' : 'hover:border-primary/20'}`}>
                    <button 
                        onClick={() => toggle(index)}
                        className="w-full py-6 flex items-start justify-between text-left focus:outline-none group"
                    >
                        <span className="text-lg md:text-xl text-primary font-serif pr-4 group-hover:text-accent transition-colors">{q}</span>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-primary border-primary text-white rotate-45' : 'border-muted/30 text-primary group-hover:border-accent group-hover:text-accent'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </button>
                    <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                    >
                        <p className="text-muted font-light leading-relaxed pr-12">
                            As an AI researcher, I am constantly exploring new boundaries and solving complex problems to deliver innovative solutions. I rely heavily on academic papers, open-source communities, and hands-on experimentation.
                        </p>
                    </div>
                    </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};