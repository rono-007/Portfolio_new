import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

type CursorVariant = 'default' | 'pointer' | 'text' | 'suppressed';

export const MouseSpotlight: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement with spring physics for a high-end feel
  const springConfig = { damping: 30, stiffness: 300, mass: 0.3 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      
      // Determine cursor variant based on target element
      const isPointer = !!target.closest('a, button, [role="button"], .cursor-pointer');
      const isText = !!target.closest('p, h1, h2, h3, h4, h5, h6, span, li');
      const isImageArea = !!target.closest('.disable-spotlight');

      if (isImageArea) {
        setCursorVariant('suppressed');
      } else if (isPointer) {
        setCursorVariant('pointer');
      } else if (isText) {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-difference">
      {/* Custom Cursor Dot/Ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center bg-white rounded-full"
          animate={cursorVariant}
          variants={{
            default: {
              width: 16,
              height: 16,
              scale: 1,
            },
            pointer: {
              width: 60,
              height: 60,
              scale: 1,
            },
            text: {
              width: 4,
              height: 32,
              borderRadius: "4px",
              scale: 1,
            },
            suppressed: {
              width: 0,
              height: 0,
              opacity: 0,
            }
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.3
          }}
        />
      </motion.div>
    </div>
  );
};