import React from 'react';
import { Reveal } from './ui/Reveal';
import { Education as EducationType } from '../types';

const educationData: EducationType[] = [
  {
    degree: "Bachelor in Technology in Computer Science Engineering",
    institution: "University of Engineering & Management",
    logo: "https://img.logo.dev/uem.edu.in?token=pk_PEzUIRNTScaVBfae7LqPUw&retina=true",
    period: "2022 - present"
  },
  {
    degree: "West Bengal Council of Higher Secondary Education",
    institution: "Sanskrit Collegiate School",
    logo: "https://img.logo.dev/en.wikipedia.org?token=pk_PEzUIRNTScaVBfae7LqPUw&retina=true",
    period: "2021 - 2021"
  }
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="bg-surface py-24 relative border-t border-muted/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        <Reveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-xs sm:text-sm text-accent mb-4 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">
                Education
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[1.1]">
                Academic <br/>
                <span className="italic text-muted">Foundation.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="space-y-0">
          {educationData.map((edu, index) => (
            <Reveal key={index} delay={index * 100} width="100%">
              <div className="py-10 border-b border-muted/20 last:border-b-0 hover:bg-white transition-colors duration-500 rounded-2xl px-6 md:px-10 -mx-6 md:-mx-10 group cursor-default">
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex-shrink-0">
                    <img src={edu.logo} alt={edu.institution} className="w-16 h-16 object-contain mix-blend-multiply grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                       <h3 className="text-xl md:text-2xl font-serif text-primary">{edu.degree}</h3>
                       <span className="text-xs text-accent tracking-widest uppercase font-medium mt-1 md:mt-0">{edu.period}</span>
                    </div>
                    <p className="text-muted text-lg mt-2 font-light">{edu.institution}</p>
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