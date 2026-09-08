import React from 'react';
import { ExternalLink, Github, Sparkles, Terminal, BookOpen, Sliders } from 'lucide-react';
import { QEVRA_WEBSITE, REPO_NAME } from '../data/repoFilesData';

interface HeaderProps {
  activeTab: 'docs' | 'architecture' | 'simulator' | 'push-guide';
  setActiveTab: (tab: 'docs' | 'architecture' | 'simulator' | 'push-guide') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand / Repo Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
              Q
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-slate-100 text-sm sm:text-base tracking-tight">qevra</span>
                <span className="text-slate-500">/</span>
                <span className="font-bold text-white text-sm sm:text-base tracking-tight">{REPO_NAME}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Public
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Open-Web Discovery Systems Architecture & Technical Reference
              </p>
            </div>
          </div>

          {/* Right: Actions & Links */}
          <div className="flex items-center space-x-3">
            <a
              href={QEVRA_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm gap-1.5"
              title="Visit official QEVRA web discovery platform"
            >
              <span>qevra.buzz</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setActiveTab('push-guide')}
              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Git & Push Guide</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-t border-slate-800/80 pt-2 pb-1 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'docs'
                ? 'bg-slate-800 text-sky-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Repository Documentation (16 Files)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-slate-800 text-sky-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Architecture Visualizer</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-slate-800 text-sky-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Relevance Scoring Simulator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
