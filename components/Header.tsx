import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: 'mailto:iemrono2022@gmail.com' },
  ];

  return (
    <>
      <header 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1400px] transition-all duration-500 ease-out`}
      >
        <div className={`
            mx-auto px-6 py-4 flex items-center justify-between
            backdrop-blur-md border rounded-none transition-all duration-500
            ${isScrolled ? 'bg-background/90 border-muted/20 shadow-sm' : 'bg-transparent border-transparent'}
        `}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-none overflow-hidden flex-shrink-0 border border-muted/20 bg-surface">
              <img 
                src="assets/me.jpg" 
                alt="Ranajoy Nag" 
                className="w-full h-full object-cover grayscale" 
              />
            </div>
            <span className="text-base font-serif text-primary tracking-wide">Ranajoy <span className="italic text-accent">Nag.</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-muted hover:text-primary transition-colors text-xs font-medium uppercase tracking-[0.15em] relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-primary hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
              {isMenuOpen ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
            fixed top-24 left-4 right-4 z-40 md:hidden
            bg-background border border-muted/20 p-6
            shadow-xl origin-top transition-all duration-500 ease-in-out
            ${isMenuOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible'}
        `}
      >
        <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
            <a 
                key={link.name}
                href={link.href}
                className="text-primary hover:text-accent text-sm font-serif italic tracking-wide block transition-colors border-b border-muted/10 pb-4"
                onClick={() => setIsMenuOpen(false)}
            >
                {link.name}
            </a>
            ))}
        </nav>
      </div>
    </>
  );
};