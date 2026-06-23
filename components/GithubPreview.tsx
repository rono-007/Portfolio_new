import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GithubPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

interface UserData {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  login: string;
}

interface RepoData {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

// High-fidelity fallback data for rono-007
const INITIAL_USER_DATA: UserData = {
  avatar_url: "https://avatars.githubusercontent.com/u/108343171?v=4",
  name: "Ranajoy Nag",
  login: "rono-007",
  bio: "AI Researcher & Tech Innovator. Exploring the frontiers of Deep Learning and NLP.",
  public_repos: 18,
  followers: 12,
  following: 15,
  html_url: "https://github.com/rono-007"
};

const INITIAL_REPOS: RepoData[] = [
  {
    id: 1,
    name: "Mini-Copilot-HR-Assistant",
    description: "Smart interactive assistant for HR automation and Python coding help.",
    stargazers_count: 5,
    language: "Python",
    html_url: "https://github.com/rono-007/Mini-Copilot-HR-Coding-Assistant"
  },
  {
    id: 2,
    name: "JobSense",
    description: "Transformer-based model for predicting job trends and base salaries.",
    stargazers_count: 3,
    language: "Jupyter Notebook",
    html_url: "https://github.com/rono-007/JobSense"
  }
];

export const GithubPreview: React.FC<GithubPreviewProps> = ({ isOpen, onClose, url }) => {
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [repos, setRepos] = useState<RepoData[]>(INITIAL_REPOS);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const userRes = await fetch('https://api.github.com/users/rono-007');
      if (userRes.ok) {
        const userJson = await userRes.json();
        setUserData(userJson);
        
        const repoRes = await fetch('https://api.github.com/users/rono-007/repos?sort=updated&per_page=3');
        if (repoRes.ok) {
          const repoJson = await repoRes.json();
          setRepos(repoJson);
        }
        setIsLive(true);
      }
    } catch (err) {
      console.warn("GitHub Live Sync failed, using cached data.", err);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />
          
          {/* Centering Wrapper */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-[550px] bg-[#0d1117] rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
            >
              {/* Header / OS Bar */}
              <div className="flex items-center justify-between px-8 py-5 bg-[#161b22]/50 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest hidden sm:inline">Profile Preview</span>
                </div>
                <button 
                  onClick={onClose}
                  className="group p-2 hover:bg-white/5 rounded-full transition-all"
                >
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10 no-scrollbar">
                <div className="space-y-10">
                  {/* Profile Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative group flex-shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <img 
                        src={userData.avatar_url} 
                        alt={userData.name} 
                        className="relative w-24 h-24 rounded-[2rem] border border-white/10 object-cover"
                      />
                      {isLive && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#0d1117] rounded-full" title="Live Sync Active" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight truncate">{userData.name}</h3>
                      <p className="text-indigo-400 font-mono text-sm mb-3">@{userData.login}</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-white font-bold">{userData.public_repos}</p>
                          <p className="text-[9px] uppercase text-gray-500 tracking-tighter">Repos</p>
                        </div>
                        <div className="h-6 w-px bg-white/5 self-center" />
                        <div className="text-center">
                          <p className="text-white font-bold">{userData.followers}</p>
                          <p className="text-[9px] uppercase text-gray-500 tracking-tighter">Followers</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                      "{userData.bio}"
                    </p>
                  </div>

                  {/* Featured Projects */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Featured Repositories</h4>
                      <span className="text-[10px] text-indigo-500/50 font-mono">{loading ? 'SYNCING...' : 'SYNCED'}</span>
                    </div>
                    
                    <div className="grid gap-3">
                      {repos.map(repo => (
                        <a 
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{repo.name}</span>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                              <span className="text-[10px] font-mono">{repo.stargazers_count}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mb-3">{repo.description || "No description provided."}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            <span className="text-[10px] text-gray-400 font-medium">{repo.language || 'Code'}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 pb-2">
                    <a 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black font-bold rounded-3xl hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-2xl shadow-indigo-500/10 group/btn"
                    >
                      <span>Visit Full GitHub Profile</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <p className="text-[9px] text-gray-600 text-center mt-6 uppercase tracking-[0.3em] font-mono">End of Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};