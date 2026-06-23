import React from 'react';
import { Reveal } from './ui/Reveal';

export const About: React.FC = () => {
  return (
    <section id="about" className="bg-surface py-24 md:py-32 border-t border-muted/10 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-end">
            <Reveal>
              <div className="relative overflow-hidden aspect-[4/5] bg-muted/10 group">
                <img
                  src="assets/me.jpg"
                  alt="Ranajoy Nag"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-primary/10 mix-blend-multiply pointer-events-none" />
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="mt-8 flex flex-col sm:flex-row gap-8 items-start border-t border-primary/10 pt-8">
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-muted mb-1 uppercase tracking-[0.15em] font-medium">Location</p>
                    <p className="text-sm text-primary font-serif italic">Kolkata, West Bengal</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1 uppercase tracking-[0.15em] font-medium">Local Time</p>
                    <p className="text-sm text-primary font-serif italic">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {[
                    { icon: "linkedin", href: "https://linkedin.com/in/ranajoy-nag" },
                    { icon: "instagram", href: "https://instagram.com/monoc_/" },
                    { icon: "github", href: "https://github.com/rono-007" }
                  ].map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon === 'linkedin' && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />}
                        {social.icon === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.435.066-2.727.358-3.801 1.432-1.074 1.074-1.366 2.366-1.432 3.801-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.066 1.435.358 2.727 1.432 3.801 1.074 1.074 2.366 1.366 3.801 1.432 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.435-.066 2.727-.358 3.801-1.432 1.074-1.074 1.366-2.366 1.432-3.801.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.066-1.435-.358-2.727-1.432-3.801-1.074-1.074-2.366-1.366-3.801-1.432-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                        {social.icon === 'github' && <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />}
                        {!['linkedin', 'instagram', 'github'].includes(social.icon) && <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z"></path>}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-start">
            <Reveal>
              <div className="mb-12">
                <p className="text-xs sm:text-sm text-accent mb-4 uppercase tracking-[0.2em] font-medium border-b border-accent/20 inline-block pb-1">About Me</p>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[1.1] mb-8">
                  Architecting <br/>
                  <span className="italic text-accent">Intelligent</span> Systems.
                </h2>
              </div>
            </Reveal>

            <div className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed space-y-8 font-light text-balance">
              <Reveal delay={100}>
                <p>
                  <strong className="font-normal text-primary">As an AI enthusiast,</strong> I explore state-of-the-art models to improve educational and operational tools. My expertise lies deeply rooted in <span className="italic text-primary">machine learning</span>, deep learning, and natural language processing.
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <p>
                  Renowned for my innovative approach to AI research, I began my career with a strong foundation in computer science, swiftly establishing a distinctive <strong className="font-normal text-primary border-b border-primary/20 pb-0.5">problem-solving</strong> style.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <p>
                  My creative drive propelled me to lead projects like <span className="italic text-accent">Mini-Copilot-HR-Coding-Assistant</span>, driving significant advancements in tech. I continue to innovate with cutting-edge AI models, consistently pushing the boundaries of what is possible.
                </p>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};