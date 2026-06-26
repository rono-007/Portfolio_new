import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export type PanelId = 'about' | 'projects' | 'skills' | 'work' | 'education' | 'contact' | null;

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word" style={{ overflow: 'hidden' }}>
          {word.split('').map((char, j) => (
            <span key={j} className="split-char">
              {char}
            </span>
          ))}
          <span className="split-char">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

const ScrollHighlightText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={className} style={{ display: 'inline' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="highlight-word" style={{ opacity: 0.15, display: 'inline-block', marginRight: '0.25em', willChange: 'opacity' }}>
          {word}
        </span>
      ))}
    </span>
  );
};

/* ─────────────────────────────────────
   Data
───────────────────────────────────── */
const projects = [
  {
    title: 'Mini-Copilot',
    subtitle: 'HR & Coding Assistant',
    description: 'A smart assistant for HR tasks — interview tips, email drafting, candidate screening — and Python coding help with debugging and explanations.',
    tags: ['Streamlit', 'Hugging Face', 'NLP'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    details: {
      challenge: 'Automating multi-step HR screeners and real-time Python debugging required complex prompt piping and low-latency model inference execution.',
      solution: 'Structured custom LLM prompt schemas utilizing Hugging Face Hub models, managed via a clean Streamlit interface with state preservation.',
      role: 'Sole Developer',
      tech: ['Python', 'Streamlit', 'Hugging Face API', 'NLP Pipelines'],
      metrics: 'Successfully processed HR tasks in seconds with structured debug reports.'
    }
  },
  {
    title: 'JobSense',
    subtitle: 'Job Role Predictor',
    description: 'Transformer-based model analyzing historical job data to predict emerging roles and estimate base salaries.',
    tags: ['Transformer', 'ML', 'Data Analysis'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    details: {
      challenge: 'Aggregating highly unstructured career progression logs and resolving salary scale disparity across geographic bounds.',
      solution: 'Fine-tuned a transformer model with customized salary bucket tokens, normalizing cross-border currency differences.',
      role: 'Lead Architect',
      tech: ['PyTorch', 'Transformers', 'Pandas', 'Scikit-Learn'],
      metrics: 'Achieved 89% salary estimation accuracy.'
    }
  },
  {
    title: 'MoodTune',
    subtitle: 'Facial Emotion Music',
    description: 'Real-time music recommendation by analyzing facial expressions through webcam input using computer vision.',
    tags: ['OpenCV', 'Computer Vision', 'Python'],
    year: '2023',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    details: {
      challenge: 'Handling frame drops and variable lighting condition issues on standard webcams for real-time expression detection.',
      solution: 'Implemented OpenCV Haar cascades with deep expression networks, running frame interpolation for zero-latency UI updates.',
      role: 'Creator & Engineer',
      tech: ['OpenCV', 'TensorFlow', 'Python Web Sockets', 'Spotify Web API'],
      metrics: 'Maintained 30 FPS stream processing on consumer-grade hardware.'
    }
  },
];

const skills = [
  'Deep Learning', 'NLP', 'Computer Vision', 'Transformers', 'LLMs',
  'Python', 'Java', 'C++', 'PyTorch', 'TensorFlow',
  'Hugging Face', 'LangChain', 'Jupyter', 'Git', 'MySQL',
];

const experience = {
  role: 'AI Research',
  company: 'Coding Jr',
  period: '06/2025 — 09/2025',
  description: 'Exploring state-of-the-art AI models — LLMs, transformers, vision models. Conducting literature reviews on recent advancements. Proposing novel ideas to improve educational tools and automate code explanations.',
  certificate: 'https://www.linkedin.com/in/ranajoy-nag-35715928a/overlay/Position/2759685090/treasury/?profileId=ACoAAEYlP7MBjnGR3Y6Ac1J6aKC5DuThswDyL3M',
};

const education = [
  {
    degree: 'B.Tech in Computer Science Engineering',
    school: 'University of Engineering & Management',
    period: '2022 — Present',
  },
  {
    degree: 'Higher Secondary (WBCHSE)',
    school: 'Sanskrit Collegiate School',
    period: '2021',
  },
];

const socials = [
  { name: 'GitHub', href: 'https://github.com/rono-007' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ranajoy-nag-35715928a/' },
  { name: 'Instagram', href: 'https://instagram.com/monoc_/' },
  { name: 'Email', href: 'mailto:iemrono2022@gmail.com' },
];

const scrambleText = (element: HTMLElement, finalString: string) => {
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  let frame = 0;
  const duration = 25;
  const update = () => {
    let output = '';
    for (let i = 0; i < finalString.length; i++) {
      if (frame / duration > Math.random()) {
        output += finalString[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.textContent = output;
    if (frame < duration) {
      frame++;
      requestAnimationFrame(update);
    } else {
      element.textContent = finalString;
    }
  };
  update();
};

/* ─────────────────────────────────────
   App
───────────────────────────────────── */
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState('0%');
  const [activeSection, setActiveSection] = useState('HERO');
  const [hoveredFootnote, setHoveredFootnote] = useState<string | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const projectPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }, [isDarkMode]);

  const toggleDarkMode = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      setIsDarkMode(prev => !prev);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(prev => !prev);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 800,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };



  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options) + ' Kolkata');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoading || activeProject !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading, activeProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Preloader Timeline ──
      const countObj = { val: 0 };
      const counterEl = document.querySelector('.preloader-number');
      const overlay = document.querySelector('.preloader-overlay');

      const preloaderTimeline = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          heroTl.play();

          gsap.utils.toArray<HTMLElement>('.meta-label').forEach((el) => {
            const text = el.getAttribute('data-text') || el.textContent || '';
            if (!el.getAttribute('data-text')) el.setAttribute('data-text', text);
            scrambleText(el, text);
          });
        }
      });

      if (counterEl && overlay) {
        preloaderTimeline
          .to(countObj, {
            val: 100,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              counterEl.textContent = Math.round(countObj.val).toString().padStart(2, '0');
            }
          })
          .to('.preloader-text-wrapper', {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in'
          })
          .to(overlay, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
          }, '-=0.1')
          .fromTo(mainRef.current,
            { scale: 0.96, y: 50 },
            { scale: 1, y: 0, duration: 1.2, ease: 'power4.out', clearProps: 'all' },
            '-=0.6'
          );
      } else {
        setIsLoading(false);
      }

      // ── Scroll Progress Bar ──
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: (self) => {
            setScrollPercentage(Math.round(self.progress * 100) + '%');
          }
        },
      });

      // ── Active Section Tracking ──
      const sectionElements = gsap.utils.toArray<HTMLElement>('section');
      sectionElements.forEach((sec) => {
        const classVal = sec.getAttribute('class');
        let sectionName = 'HERO';
        if (classVal) {
          const name = classVal.split('-')[0].toUpperCase();
          sectionName = name === 'HERO' ? 'HERO' : name;
        }
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(sectionName);
            }
          }
        });
      });




      // ── Velocity-Based Skew on Scroll ──
      let proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".project-row", "skewY", "deg");
      const clamp = gsap.utils.clamp(-4, 4);

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -200);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

      // ── Section Scramble Reveals ──
      gsap.utils.toArray<HTMLElement>('.scramble-reveal').forEach((el) => {
        const text = el.getAttribute('data-text') || el.textContent || '';
        if (!el.getAttribute('data-text')) {
          el.setAttribute('data-text', text);
        }
        el.textContent = ''; // clear initially
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            scrambleText(el, text);
            gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 });
          }
        });

        el.addEventListener('mouseenter', () => {
          scrambleText(el, text);
        });
      });


      // ── Hero animations (paused initially, triggered when preloader ends) ──
      const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line');
      const heroTl = gsap.timeline({ paused: true });

      heroTl.fromTo(heroLines,
        { clipPath: 'inset(0 0 100% 0)', y: 60 },
        {
          clipPath: 'inset(0 0 0% 0)', y: 0,
          duration: 1.2, ease: 'power4.out',
          stagger: 0.15,
        }
      )
        .fromTo('.hero-fade',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
          '-=0.8'
        );

      gsap.fromTo(heroLines,
        { opacity: 1 },
        {
          opacity: 0.15,
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // ── Word Highlight on scroll (About Section) ──
      const highlightWords = gsap.utils.toArray<HTMLElement>('.highlight-word');
      if (highlightWords.length > 0) {
        gsap.to(highlightWords, {
          opacity: 1,
          duration: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about-highlight-trigger',
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true,
          },
        });
      }

      // ── Split text reveal ──
      gsap.utils.toArray<HTMLElement>('.reveal-split').forEach((el) => {
        const chars = el.querySelectorAll('.split-char');
        if (chars.length > 0) {
          gsap.fromTo(chars,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.8, ease: 'power3.out', stagger: 0.02,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // ── Section reveals ──
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Project rows stagger ──
      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.5, ease: 'power3.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Two-row skills parallax — row1 drifts right, row2 drifts left ──
      const skillsBgText = document.querySelector('.skills-bg-text') as HTMLElement;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        const row1 = document.querySelector('.skills-track-row1') as HTMLElement;
        const row2 = document.querySelector('.skills-track-row2') as HTMLElement;

        const sectionTrigger = {
          trigger: '.skills-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        };

        if (row1) {
          gsap.fromTo(row1,
            { x: -180 },
            { x: 180, ease: 'none', scrollTrigger: { ...sectionTrigger } }
          );
        }

        if (row2) {
          gsap.fromTo(row2,
            { x: 180 },
            { x: -180, ease: 'none', scrollTrigger: { ...sectionTrigger } }
          );
        }

        if (skillsBgText) {
          gsap.fromTo(skillsBgText,
            { x: -80, opacity: 0 },
            { x: 80, opacity: 1, ease: 'none', scrollTrigger: { ...sectionTrigger } }
          );
        }

        return () => {
          const els = [row1, row2, skillsBgText].filter(Boolean) as HTMLElement[];
          gsap.set(els, { clearProps: 'x,transform' });
        };
      });

      // ── Experience counter roll-in ──
      gsap.utils.toArray<HTMLElement>('.counter-value').forEach((el) => {
        const target = parseInt(el.getAttribute('data-value') || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      // ── Education line draw ──
      gsap.utils.toArray<HTMLElement>('.edu-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.6, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Parallax on hero image ──
      gsap.to('.hero-image', {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

    }, mainRef);

    // ── Custom cursor & Hover effects ──
    const cursor = cursorRef.current;
    const preview = projectPreviewRef.current;
    let cursorCleanup: (() => void) | undefined;

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      // Initialize GSAP QuickTo setters for smooth performance and elastic lag
      const cursorX = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
      const cursorY = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

      const previewX = preview ? gsap.quickTo(preview, "x", { duration: 0.25, ease: "power3.out" }) : null;
      const previewY = preview ? gsap.quickTo(preview, "y", { duration: 0.25, ease: "power3.out" }) : null;

      let isHoveringProject = false;
      let latchedEl: HTMLElement | null = null;

      const moveCursor = (e: MouseEvent) => {
        if (latchedEl) {
          const rect = latchedEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;

          // Drag the magnetic element slightly toward mouse
          gsap.to(latchedEl, { x: dx * 0.35, y: dy * 0.35, duration: 0.3, ease: 'power2.out' });

          // Snap the cursor toward the center of the magnetic button (leaving 15% follow lag)
          const targetX = centerX + dx * 0.15;
          const targetY = centerY + dy * 0.15;
          cursorX(targetX - 4);
          cursorY(targetY - 4);
        } else {
          cursorX(e.clientX - 4);
          cursorY(e.clientY - 4);
        }

        if (preview && previewX && previewY) {
          previewX(e.clientX);
          previewY(e.clientY);
        }
      };

      window.addEventListener('mousemove', moveCursor);

      // Select interactive elements
      const interactiveEls = document.querySelectorAll('a, button, .project-row, .skill-tag, .magnetic');
      const listeners: Array<{ el: Element; type: string; fn: any }> = [];

      const addListener = (el: Element, type: string, fn: any) => {
        el.addEventListener(type, fn);
        listeners.push({ el, type, fn });
      };

      interactiveEls.forEach((el: any) => {
        const isMagnetic = el.classList.contains('magnetic');

        const onMouseEnter = () => {
          if (isMagnetic) {
            latchedEl = el;
            gsap.to(cursor, {
              scale: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              mixBlendMode: 'normal',
              duration: 0.3,
              ease: 'back.out(2)'
            });
          } else {
            gsap.to(cursor, {
              scale: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              mixBlendMode: 'normal',
              duration: 0.3,
              ease: 'back.out(2)'
            });
          }

          if (el.classList.contains('project-row') && preview) {
            isHoveringProject = true;
            const imgUrl = el.getAttribute('data-image');
            if (imgUrl) {
              const imgEl = preview.querySelector('img');
              if (imgEl) imgEl.src = imgUrl;
              gsap.to(preview, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
            }
          }
        };

        const onMouseLeave = () => {
          if (isMagnetic) {
            gsap.to(latchedEl, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            latchedEl = null;
          }

          gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'var(--fg)',
            mixBlendMode: 'difference',
            duration: 0.3,
            ease: 'power2.out'
          });

          if (el.classList.contains('project-row') && preview) {
            isHoveringProject = false;
            gsap.to(preview, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.out' });
          }
        };

        addListener(el, 'mouseenter', onMouseEnter);
        addListener(el, 'mouseleave', onMouseLeave);
      });

      cursorCleanup = () => {
        window.removeEventListener('mousemove', moveCursor);
        listeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
      };
    }

    // 3D Tilt for Hero Image
    const heroImgWrapper = document.querySelector('.hero-image-wrapper');
    const heroImg = document.querySelector('.hero-image');
    if (heroImgWrapper && heroImg) {
      heroImgWrapper.addEventListener('mousemove', (e: any) => {
        const rect = heroImgWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(heroImg, {
          rotateX,
          rotateY,
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
          transformOrigin: 'center'
        });
      });

      heroImgWrapper.addEventListener('mouseleave', () => {
        gsap.to(heroImg, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    }

    return () => {
      ctx.revert();
      cursorCleanup?.();
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      {isLoading && (
        <div className="preloader-overlay">
          <div className="preloader-text-wrapper">
            <div className="preloader-number">00</div>
            <div className="preloader-label">Ranajoy Nag</div>
          </div>
        </div>
      )}

      {/* Art Gallery Frame & Metadata Corners */}
      <div className="viewport-frame hide-mobile">
        <div className="v-line left" />
        <div className="v-line right" />
        <div className="h-line top" />
        <div className="h-line bottom" />

        <div className="corner-meta top-left">
          <span className="meta-label">TIME</span>
          <span className="meta-value">{currentTime}</span>
        </div>
        <div className="corner-meta top-right">
          <span className="meta-label">SCROLL</span>
          <span className="meta-value">{scrollPercentage}</span>
        </div>
        <div className="corner-meta bottom-left">
          <span className="meta-label">LOC</span>
          <span className="meta-value">22.57° N, 88.36° E</span>
        </div>
        <div className="corner-meta bottom-right">
          <span className="meta-label">INDEX</span>
          <span className="meta-value">[ {activeSection} ]</span>
        </div>
      </div>

      {/* Slide-Over Project Drawer */}
      <div
        className={`drawer-backdrop ${activeProject ? 'visible' : ''}`}
        onClick={() => setActiveProject(null)}
      >
        <div
          className={`project-drawer ${activeProject ? 'open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="drawer-close magnetic" onClick={() => setActiveProject(null)}>
            [ CLOSE ]
          </button>

          {activeProject && (
            <div className="drawer-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                <span className="label">{activeProject.subtitle}</span>
                <span className="label">{activeProject.year}</span>
              </div>
              <h2 className="heading-lg" style={{ marginBottom: '32px' }}>{activeProject.title}</h2>

              <div className="drawer-img-container">
                <img src={activeProject.image} alt={activeProject.title} className="drawer-img" />
              </div>

              <div className="drawer-section">
                <span className="label" style={{ color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>The Challenge</span>
                <p className="body-text" style={{ color: 'var(--fg)' }}>{activeProject.details.challenge}</p>
              </div>

              <div className="drawer-section">
                <span className="label" style={{ color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>The Solution</span>
                <p className="body-text" style={{ color: 'var(--fg)' }}>{activeProject.details.solution}</p>
              </div>

              <div className="drawer-grid">
                <div>
                  <span className="label" style={{ color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>My Role</span>
                  <p className="body-text" style={{ color: 'var(--fg)', fontSize: '0.9rem' }}>{activeProject.details.role}</p>
                </div>
                <div>
                  <span className="label" style={{ color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Outcomes</span>
                  <p className="body-text" style={{ color: 'var(--fg)', fontSize: '0.9rem' }}>{activeProject.details.metrics}</p>
                </div>
              </div>

              <div className="drawer-section">
                <span className="label" style={{ color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Stack</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeProject.details.tech.map((t: string) => (
                    <span key={t} className="skill-tag" style={{ border: '1px solid var(--border)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="noise-overlay" />
      <div ref={projectPreviewRef} className="project-preview-wrapper hide-mobile">
        <img src="" alt="" className="project-preview-img" />
      </div>
      <div ref={cursorRef} className="cursor-dot hide-mobile" />
      <div ref={progressRef} className="scroll-progress" />

      <div ref={mainRef}>
        {/* NAV */}
        <nav className="nav">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <span className="magnetic" style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>RN</span>
              <button
                onClick={toggleDarkMode}
                className="label magnetic"
                style={{ padding: '4px 8px', border: '1px solid currentColor', borderRadius: '4px' }}
              >
                {isDarkMode ? 'LIGHT' : 'DARK'}
              </button>
            </div>
            <a href="mailto:iemrono2022@gmail.com" className="link-hover magnetic" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              Let's talk ↗
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero-section stack-card" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '48px', paddingTop: '10vh' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.25em', marginBottom: '-0.25em' }}>
                <h1 className="heading-xl hero-line">Ranajoy</h1>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.25em', marginBottom: '-0.25em' }}>
                <h1 className="heading-xl hero-line" style={{ fontStyle: 'italic' }}>
                  <span style={{ marginLeft: 'clamp(10px, 3vw, 40px)' }}>Nag</span>
                </h1>
              </div>

              <div style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
                <div className="hero-fade">
                  <p className="label" style={{ marginBottom: '6px' }}>AI Researcher & Developer</p>
                  <p className="body-text" style={{ maxWidth: '320px' }}>
                    Exploring the frontiers of Deep Learning and NLP to build intelligent tools for tomorrow.
                  </p>
                </div>
                <div className="hero-fade">
                  <p className="label">Kolkata, IN</p>
                  <p className="label" style={{ marginTop: '2px' }}>Available for collaborations</p>
                </div>
              </div>
            </div>

            <div className="hero-fade" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div className="hero-image-wrapper" style={{ width: '100%', maxWidth: '420px', height: 'clamp(320px, 45vw, 540px)', overflow: 'hidden', perspective: '1000px' }}>
                <img
                  src="assets/me.jpg"
                  alt="Ranajoy Nag"
                  className="hero-image"
                  style={{
                    width: '100%',
                    height: '115%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.8s ease',
                    willChange: 'transform',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%)')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* ABOUT */}
        <section className="about-section stack-card" style={{ padding: '64px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '12px' }}>
              <span className="label scramble-reveal">About</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '40px', alignItems: 'start' }}>
              <div className="about-highlight-trigger">
                <h2 className="heading-lg">
                  <ScrollHighlightText text="I build things at the intersection of research and engineering." />
                </h2>
              </div>

              <div>
                <p className="body-text reveal-up" style={{ marginBottom: '16px' }}>
                  As an AI enthusiast, I explore state-of-the-art models to improve educational and operational tools. My expertise lies in machine learning, deep learning, and natural language processing.
                </p>
                <p className="body-text reveal-up">
                  My creative drive propels me to lead projects like Mini-Copilot, driving significant advancements in automated coding assistance and HR workflows.
                </p>
              </div>
            </div>


          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* Element 2: Paper Footnote / Research Quote Section */}
        <section className="footnote-section stack-card" style={{ padding: '80px 0', position: 'relative' }}>
          <div className="container">
            <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <span className="label" style={{ display: 'block', marginBottom: '24px' }}>CITATIONS & PHILOSOPHY</span>
              <p className="reveal-up" style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
                lineHeight: 1.4,
                color: 'var(--fg)',
                fontWeight: 300
              }}>
                "The engineering of intelligence is not about replicating biology, but discovering the computational principles of learning
                <span
                  className="citation-ref"
                  onMouseEnter={() => setHoveredFootnote('c1')}
                  onMouseLeave={() => setHoveredFootnote(null)}
                  style={{ position: 'relative', cursor: 'help', color: 'var(--accent, #c8ff00)', marginLeft: '4px', fontSize: '0.6em', verticalAlign: 'super', fontWeight: 500 }}
                >
                  [01]
                  {hoveredFootnote === 'c1' && (
                    <span className="footnote-popup">
                      <strong>Mini-Copilot [01]</strong>: Custom transformer logic designed for interactive Python debugging and screening automation.
                    </span>
                  )}
                </span>
                and representation optimization
                <span
                  className="citation-ref"
                  onMouseEnter={() => setHoveredFootnote('c2')}
                  onMouseLeave={() => setHoveredFootnote(null)}
                  style={{ position: 'relative', cursor: 'help', color: 'var(--accent, #c8ff00)', marginLeft: '4px', fontSize: '0.6em', verticalAlign: 'super', fontWeight: 500 }}
                >
                  [02]
                  {hoveredFootnote === 'c2' && (
                    <span className="footnote-popup">
                      <strong>Optimizations [02]</strong>: Adapting parameter-efficient models to sub-second local inferences.
                    </span>
                  )}
                </span>."
              </p>
            </div>
          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* PROJECTS */}
        <section className="projects-section stack-card" style={{ padding: '64px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '32px' }}>
              <span className="label scramble-reveal">Selected Work</span>
            </div>

            <div className="bento-grid">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className={`bento-card ${i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                  onClick={() => setActiveProject(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bento-card-header" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="label" style={{ color: 'var(--muted)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="label">{p.year}</span>
                    </div>
                    <h3 className="heading-md" style={{ fontSize: i === 0 ? '1.8rem' : '1.25rem' }}>{p.title}</h3>
                    <p className="body-text project-desc" style={{ marginTop: '8px', fontSize: i === 0 ? '1rem' : '0.9rem', color: 'var(--muted)' }}>
                      {p.subtitle}
                    </p>
                  </div>

                  {i === 0 && (
                    <div style={{ margin: '16px 0', flex: 1, borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div className="bento-card-content">
                    <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.tags.map((tag) => (
                        <span key={tag} className="skill-tag" style={{ border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', backgroundColor: 'transparent' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* SKILLS — Two-Row Parallax */}
        <section className="skills-section stack-card" style={{ padding: '100px 0 120px', overflow: 'hidden', position: 'relative' }}>
          <div className="skills-bg-text">
            DEEP LEARNING • NLP • COMPUTER VISION • LLMS • TRANSFORMERS • PYTORCH • TENSORFLOW • JAVASCRIPT • PYTHON
          </div>

          {/* Section header */}
          <div className="container" style={{ marginBottom: '64px', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
            <div className="header-bg">
              <span className="label" style={{ marginBottom: '12px', display: 'block' }}>Expertise</span>
              <h2 className="heading-lg" style={{ marginBottom: '16px' }}>Tools &amp; technologies I work with daily.</h2>
              <p className="body-text" style={{ maxWidth: '480px' }}>From research prototypes to production systems, these are the skills that define my craft.</p>
            </div>
          </div>

          {/* Row 1 — drifts left → right on scroll */}
          <div className="skills-track-wrapper">
            <div
              className="skills-track skills-track-row1"
              style={{ display: 'flex', gap: 'clamp(16px, 2.5vw, 32px)', marginBottom: '20px', willChange: 'transform', paddingLeft: '0', position: 'relative' }}
            >
              <span className="swipe-hint hide-desktop" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>⇢</span>
              {[...skills, ...skills].map((skill, i) => (
                <div key={`r1-${i}`} className="skill-card" style={{ flexShrink: 0 }}>
                  <span className="label" style={{ marginBottom: '8px', display: 'block' }}>
                    {String((i % skills.length) + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontFamily: 'var(--serif)', fontWeight: 400 }}>{skill}</span>
                </div>
              ))}
            </div>

            {/* Row 2 — drifts right → left on scroll */}
            <div
              className="skills-track skills-track-row2"
              style={{ display: 'flex', gap: 'clamp(16px, 2.5vw, 32px)', willChange: 'transform', position: 'relative' }}
            >
              <span className="swipe-hint hide-desktop" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%) scaleX(-1)', opacity: 0.5 }}>⇢</span>
              {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
                <div key={`r2-${i}`} className="skill-card" style={{ flexShrink: 0 }}>
                  <span className="label" style={{ marginBottom: '8px', display: 'block' }}>
                    {String((i % skills.length) + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontFamily: 'var(--serif)', fontWeight: 400 }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* EXPERIENCE */}
        <section className="experience-section stack-card" style={{ padding: '64px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '24px' }}>
              <span className="label scramble-reveal">Experience</span>
            </div>

            <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '32px', alignItems: 'start' }}>
              <div>
                <h2 className="heading-lg" style={{ marginBottom: '8px' }}>{experience.role}</h2>
                <p style={{ fontStyle: 'italic', color: 'var(--muted)', marginBottom: '4px' }}>{experience.company}</p>
                <span className="label" style={{ display: 'block', marginBottom: '16px' }}>{experience.period}</span>
                {experience.certificate && (
                  <a
                    href={experience.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover label magnetic"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent, #c8ff00)' }}
                  >
                    View Certificate ↗
                  </a>
                )}
              </div>
              <div>
                <p className="body-text" style={{ marginBottom: '32px' }}>{experience.description}</p>
                <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', flexWrap: 'wrap' }}>
                  <div>
                    <span className="counter-value heading-lg" data-value="5" style={{ display: 'block' }}>0</span>
                    <span className="label">Projects Shipped</span>
                  </div>
                  <div>
                    <span className="counter-value heading-lg" data-value="8" style={{ display: 'block' }}>0</span>
                    <span className="label">Models Explored</span>
                  </div>
                  <div>
                    <span className="counter-value heading-lg" data-value="3" style={{ display: 'block' }}>0</span>
                    <span className="label">Research Areas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* EDUCATION */}
        <section className="education-section stack-card" style={{ padding: '64px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '24px' }}>
              <span className="label scramble-reveal">Education</span>
            </div>

            {education.map((edu, i) => (
              <div key={i} className="edu-row" style={{
                padding: '24px 0',
                borderBottom: i < education.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: '8px',
                alignItems: 'baseline',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span className="label" style={{ color: 'var(--border)', minWidth: '24px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="heading-md" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)' }}>{edu.degree}</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <span className="body-text">{edu.school}</span>
                  <span className="label">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* <div className="container"><div className="divider" /></div> */}

        {/* CONTACT / FOOTER */}
        <section className="contact-section stack-card" style={{ padding: '80px 0 48px' }}>
          <div className="container">
            <div className="reveal-split">
              <span className="label" style={{ marginBottom: '16px', display: 'block' }}>Get in touch</span>
              <h2 className="heading-xl" style={{ marginBottom: '32px' }}>
                <SplitText text="Let's talk." />
              </h2>
            </div>

            <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              {socials.map((s) => {
                let handle = '';
                if (s.name === 'GitHub') handle = '@rono-007';
                else if (s.name === 'LinkedIn') handle = 'in/ranajoy-nag-35715928a';
                else if (s.name === 'Instagram') handle = '@monoc_';
                else handle = 'iemrono2022@gmail.com';

                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link magnetic"
                    style={{ position: 'relative' }}
                  >
                    {s.name}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    <span className="social-tooltip">{handle}</span>
                  </a>
                );
              })}
            </div>

            <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <span className="label">© 2025 Ranajoy Nag</span>
              <span className="label">Designed with intention</span>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default App;