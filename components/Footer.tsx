import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface py-16 md:py-24 border-t border-muted/20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="md:col-span-5">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-serif text-primary tracking-tight">Ranajoy <span className="italic text-accent">Nag.</span></h3>
              <p className="text-muted font-light max-w-sm">
                Architecting intelligent tools of tomorrow. Merging rigorous deep learning research with a cinematic, highly-crafted vision.
              </p>
              <a href="mailto:iemrono2022@gmail.com" className="text-primary hover:text-accent transition-colors font-medium text-sm inline-block w-max border-b border-primary hover:border-accent pb-0.5">
                iemrono2022@gmail.com
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-medium text-muted mb-6 uppercase tracking-[0.2em]">Navigate</h4>
            <ul className="space-y-4">
              {['About', 'Work', 'Education'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-primary font-serif italic hover:text-accent transition-colors text-lg">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-medium text-muted mb-6 uppercase tracking-[0.2em]">Connect</h4>
            <ul className="space-y-4">
              {[
                { name: 'Instagram', url: 'https://instagram.com/monoc_/' },
                { name: 'LinkedIn', url: 'https://linkedin.com/in/ranajoy-nag' },
                { name: 'GitHub', url: 'https://github.com/rono-007' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors text-sm uppercase tracking-wider flex items-center gap-3 group">
                    <span className="w-4 h-px bg-muted/40 group-hover:bg-accent group-hover:w-8 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="mt-24 pt-8 border-t border-muted/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted uppercase tracking-widest">
              © {new Date().getFullYear()} Ranajoy Nag
            </div>
            <div className="text-xs text-muted font-serif italic">
              Crafted with precision.
            </div>
        </div>
      </div>
    </footer>
  );
};