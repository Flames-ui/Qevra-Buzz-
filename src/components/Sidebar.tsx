import React from 'react';
import { RepoFile } from '../data/repoFiles';
import { FileText, Search, Tag, ExternalLink } from 'lucide-react';
import { GITHUB_TOPICS, QEVRA_WEBSITE } from '../data/repoFilesData';

interface SidebarProps {
  files: RepoFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFileId,
  onSelectFile,
  searchQuery,
  setSearchQuery,
}) => {
  const filteredFiles = files.filter(
    (file) =>
      file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(files.map((f) => f.category)));

  return (
    <aside className="w-full lg:w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0">
      {/* Search Input */}
      <div className="p-3 border-b border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search docs (e.g. RSS, SEO)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* File List by Category */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {categories.map((category) => {
          const categoryFiles = filteredFiles.filter((f) => f.category === category);
          if (categoryFiles.length === 0) return null;

          return (
            <div key={category} className="space-y-1">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                {category}
              </h3>
              <div className="space-y-0.5">
                {categoryFiles.map((file) => {
                  const isActive = file.id === activeFileId;
                  return (
                    <button
                      key={file.id}
                      onClick={() => onSelectFile(file.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center space-x-2 group ${
                        isActive
                          ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                      }`}
                    >
                      <FileText
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'
                        }`}
                      />
                      <span className="truncate">{file.filename}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Topics & Official Site Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50 space-y-3">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Tag className="w-3 h-3" />
            <span>GitHub Topics</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {GITHUB_TOPICS.map((topic) => (
              <span
                key={topic}
                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-sky-400 border border-slate-700/60"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-center">
          <a
            href={QEVRA_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center space-x-1 font-medium"
          >
            <span>QEVRA Platform Reference</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
