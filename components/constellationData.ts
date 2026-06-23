export type NodeType = 'category' | 'project' | 'info' | 'contact';

export interface NodeData {
  id: string;
  label: string;
  type: NodeType;
  x: number; // relative x position (0 to 100)
  y: number; // relative y position (0 to 100)
  contentId?: string; // which panel to open
  size?: number; // scale multiplier
}

export interface EdgeData {
  source: string;
  target: string;
}

export const nodes: NodeData[] = [
  // Core/Center
  { id: 'me', label: 'Ranajoy Nag', type: 'category', x: 50, y: 50, size: 1.5, contentId: 'about' },
  
  // Primary Categories
  { id: 'projects', label: 'Projects', type: 'category', x: 30, y: 30, size: 1.2 },
  { id: 'skills', label: 'Expertise', type: 'category', x: 70, y: 30, size: 1.2, contentId: 'skills' },
  { id: 'experience', label: 'Experience', type: 'category', x: 30, y: 70, size: 1.2, contentId: 'work' },
  { id: 'education', label: 'Education', type: 'category', x: 70, y: 70, size: 1.2, contentId: 'education' },
  { id: 'contact', label: 'Connect', type: 'contact', x: 50, y: 85, size: 1.2, contentId: 'contact' },

  // Projects Sub-nodes
  { id: 'p1', label: 'Mini-Copilot', type: 'project', x: 15, y: 20, contentId: 'projects' },
  { id: 'p2', label: 'JobSense', type: 'project', x: 25, y: 15, contentId: 'projects' },
  { id: 'p3', label: 'MoodTune', type: 'project', x: 40, y: 15, contentId: 'projects' },
  
  // Skills Sub-nodes
  { id: 's1', label: 'Deep Learning', type: 'info', x: 80, y: 15 },
  { id: 's2', label: 'NLP', type: 'info', x: 85, y: 30 },
  { id: 's3', label: 'Computer Vision', type: 'info', x: 75, y: 45 },
];

export const edges: EdgeData[] = [
  // Center to Categories
  { source: 'me', target: 'projects' },
  { source: 'me', target: 'skills' },
  { source: 'me', target: 'experience' },
  { source: 'me', target: 'education' },
  { source: 'me', target: 'contact' },
  
  // Category to Sub-nodes
  { source: 'projects', target: 'p1' },
  { source: 'projects', target: 'p2' },
  { source: 'projects', target: 'p3' },
  
  { source: 'skills', target: 's1' },
  { source: 'skills', target: 's2' },
  { source: 'skills', target: 's3' },
  
  // Cross-connections for neural network vibe
  { source: 'p1', target: 's2' }, // NLP used in Copilot
  { source: 'p2', target: 's1' }, // Deep Learning used in JobSense
  { source: 'p3', target: 's3' }, // Computer Vision used in MoodTune
  { source: 'experience', target: 'projects' },
];
