import React from 'react';
import { Reveal } from './ui/Reveal';
import { Experience } from '../types';

const experiences: Experience[] = [
  {
    role: "AI Research",
    company: "Coding Jr",
    logo: "https://img.logo.dev/codingjr.school?token=pk_PEzUIRNTScaVBfae7LqPUw&retina=true",
    period: "06/2025 - present",
    description: "Explore state-of-the-art AI models (like LLMs, transformers, vision models). Conduct literature reviews on recent advancements (e.g., ChatGPT, Gemini, CodeBERT). Propose novel ideas to improve educational tools, automate code explanations, or generate tutorials.",
    tags: ["AI", "LLMs", "Transformers", "Vision Models", "ChatGPT", "Gemini", "CodeBERT"]
  }
];

export const Work: React.FC = () => {
  return (
    <section id="work" className="bg-surface py-24 relative border-t border-muted/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        <Reveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-xs sm:text-sm text-accent mb-4 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">
                Career
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[1.1]">
                Professional <br/>
                <span className="italic text-muted">Journey.</span>
              </h2>
            </div>
            <div className="md:max-w-md">
              <p className="text-muted font-light leading-relaxed">
                A timeline of my professional engagements, researching and building next-generation intelligent systems.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <Reveal key={index} delay={index * 100} width="100%">
              <div className="py-12 border-b border-muted/20 last:border-b-0 hover:bg-white transition-colors duration-500 rounded-2xl px-6 md:px-10 -mx-6 md:-mx-10 group cursor-default">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="flex-shrink-0 flex items-start gap-6 lg:w-1/3">
                        <img src={exp.logo} alt={exp.company} className="w-16 h-16 object-contain mix-blend-multiply grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        <div>
                          <h3 className="text-2xl font-serif text-primary mb-1">
                              {exp.role}
                          </h3>
                          <p className="text-muted italic">{exp.company}</p>
                          <span className="text-xs tracking-widest text-accent uppercase font-medium mt-4 block">{exp.period}</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-muted leading-relaxed mb-8 text-lg font-light">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-background text-primary text-[11px] font-medium rounded-none border border-muted/10 uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};