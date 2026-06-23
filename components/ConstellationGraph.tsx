import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { nodes, edges, NodeData } from './constellationData';
import type { PanelId } from '../App';

interface ConstellationGraphProps {
  onNodeClick: (panelId: PanelId) => void;
}

export const ConstellationGraph: React.FC<ConstellationGraphProps> = ({ onNodeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on mount/resize so we can map 0-100 coordinates to pixels
  useEffect(() => {
    const updateDims = () => {
      // Create a virtual canvas that is much larger than the screen to allow panning
      // e.g. 3000x2000
      setDimensions({ width: 3000, height: 2000 });
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  // Map 0-100 percentage to actual pixel coordinates
  const getX = (x: number) => (x / 100) * dimensions.width;
  const getY = (y: number) => (y / 100) * dimensions.height;

  // We start the draggable canvas centered
  const initialX = typeof window !== 'undefined' ? -(3000 - window.innerWidth) / 2 : -1000;
  const initialY = typeof window !== 'undefined' ? -(2000 - window.innerHeight) / 2 : -500;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505] cursor-grab active:cursor-grabbing">
      
      {/* Background Starfield effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <motion.div
        ref={containerRef}
        drag
        dragConstraints={{
          left: typeof window !== 'undefined' ? -(3000 - window.innerWidth) : -2000,
          right: 0,
          top: typeof window !== 'undefined' ? -(2000 - window.innerHeight) : -1000,
          bottom: 0,
        }}
        dragElastic={0.1}
        initial={{ x: initialX, y: initialY }}
        className="absolute w-[3000px] h-[2000px] pointer-events-auto"
      >
        {/* Draw Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {dimensions.width > 0 && edges.map((edge, i) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            return (
              <motion.line
                key={`${edge.source}-${edge.target}-${i}`}
                x1={getX(sourceNode.x)}
                y1={getY(sourceNode.y)}
                x2={getX(targetNode.x)}
                y2={getY(targetNode.y)}
                stroke="url(#edge-gradient)"
                strokeWidth={2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
              />
            );
          })}
        </svg>

        {/* Draw Nodes */}
        {dimensions.width > 0 && nodes.map((node, i) => (
          <ConstellationNode
            key={node.id}
            node={node}
            x={getX(node.x)}
            y={getY(node.y)}
            delay={i * 0.1}
            onClick={() => node.contentId && onNodeClick(node.contentId as PanelId)}
          />
        ))}

      </motion.div>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 pointer-events-none z-10">
        <h1 className="text-white font-bold text-2xl tracking-widest uppercase">Ranajoy Nag</h1>
        <p className="text-accent font-mono text-xs mt-1">Neural Portfolio Interface_ v2.0</p>
      </div>

      <div className="absolute bottom-8 right-8 pointer-events-none z-10 flex items-center gap-3">
        <p className="text-dim font-mono text-xs uppercase">Drag to explore / Click nodes</p>
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 rounded-full bg-accent" />
        </div>
      </div>

    </div>
  );
};

// Sub-component for individual nodes
const ConstellationNode: React.FC<{ node: NodeData; x: number; y: number; delay: number; onClick: () => void }> = ({ node, x, y, delay, onClick }) => {
  const isInteractive = !!node.contentId;
  const size = (node.size || 1) * (node.type === 'category' ? 16 : 10);
  
  return (
    <motion.div
      className={`absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 ${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, type: 'spring', bounce: 0.4 }}
      onClick={(e) => {
        if (isInteractive) {
          // Prevent drag from triggering click
          e.stopPropagation();
          onClick();
        }
      }}
    >
      {/* Node Circle */}
      <motion.div
        className="relative flex items-center justify-center"
        whileHover={isInteractive ? { scale: 1.2 } : {}}
      >
        {/* Core */}
        <div 
          className="rounded-full bg-white relative z-10"
          style={{ width: size, height: size, backgroundColor: node.type === 'category' ? '#c8ff00' : '#ffffff' }}
        />
        
        {/* Glow / Pulse */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: node.type === 'category' ? '#c8ff00' : '#ffffff' }}
        />

        {/* Interactive halo */}
        {isInteractive && (
          <div className="absolute -inset-4 rounded-full border border-accent/20 opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </motion.div>

      {/* Label */}
      <div className="absolute top-full mt-3 flex flex-col items-center pointer-events-none w-max">
        <span className={`font-mono text-xs tracking-widest uppercase ${node.type === 'category' ? 'text-accent font-bold' : 'text-dim'}`}>
          {node.label}
        </span>
      </div>
    </motion.div>
  );
};
