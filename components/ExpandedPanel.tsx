import React from 'react';
import { motion } from 'framer-motion';
import type { PanelId } from '../App';
import { AboutPanel } from './panels/AboutPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { SkillsPanel } from './panels/SkillsPanel';
import { WorkPanel } from './panels/WorkPanel';
import { EducationPanel } from './panels/EducationPanel';
import { ContactPanel } from './panels/ContactPanel';

interface ExpandedPanelProps {
  panelId: NonNullable<PanelId>;
  onClose: () => void;
}

const panelContent: Record<NonNullable<PanelId>, React.FC> = {
  about: AboutPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  work: WorkPanel,
  education: EducationPanel,
  contact: ContactPanel,
};

const panelTitles: Record<NonNullable<PanelId>, string> = {
  about: 'About Me',
  projects: 'Projects',
  skills: 'Skills & Expertise',
  work: 'Experience',
  education: 'Education',
  contact: 'Get in Touch',
};

export const ExpandedPanel: React.FC<ExpandedPanelProps> = ({ panelId, onClose }) => {
  const Content = panelContent[panelId];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
        className="fixed top-0 right-0 z-50 h-screen w-full md:w-[600px] lg:w-[720px] bg-card border-l border-border shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-10 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <h2 className="text-lg font-semibold">{panelTitles[panelId]}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 border border-border flex items-center justify-center text-dim hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto panel-scroll px-6 md:px-10 py-8">
          <Content />
        </div>

        {/* Footer hint */}
        <div className="flex-shrink-0 px-6 md:px-10 py-3 border-t border-border text-center">
          <p className="text-dim text-xs font-mono tracking-wider">
            Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] border border-border mx-1">ESC</kbd> or click outside to close
          </p>
        </div>
      </motion.div>
    </>
  );
};
