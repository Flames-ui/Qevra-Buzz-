import React, { useState } from 'react';
import { Terminal, Copy, Check, GitCommit, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import { GITHUB_TOPICS, QEVRA_WEBSITE, REPO_DESCRIPTION, REPO_NAME, REPO_URL } from '../data/repoFilesData';

export const GitHubPushGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const gitPushCommand = `
# 1. Verify all 5 structured commits in your local workspace
git log --oneline

# 2. Add remote origin to your GitHub account
git remote add origin https://github.com/qevra/${REPO_NAME}.git

# 3. Rename default branch to main if needed & push
git branch -M main
git push -u origin main
`.trim();

  const ghCliCommand = `
# Create public GitHub repository via gh CLI (if installed)
gh repo create qevra/${REPO_NAME} \\
  --public \\
  --description "${REPO_DESCRIPTION}" \\
  --homepage "${QEVRA_WEBSITE}"

# Add GitHub Topics
gh repo edit qevra/${REPO_NAME} \\
  --add-topic ${GITHUB_TOPICS.join(',')}
`.trim();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(label);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const commits = [
    { hash: 'b66202a', title: 'Add SEO, security and contribution guides' },
    { hash: '5fe5e40', title: 'Add publisher and creator discovery documentation' },
    { hash: 'd340fd2', title: 'Add RSS and image delivery architecture' },
    { hash: 'dae7587', title: 'Document discovery and relevance architecture' },
    { hash: 'c5d5557', title: 'Initialize QEVRA open web discovery documentation' }
  ];

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                GitHub Repository Deployment & Sync Guide
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                All 16 documentation files and 5 structured commits are generated and initialized locally in this workspace.
              </p>
            </div>
          </div>
        </div>

        {/* Repository Specs Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 text-xs text-slate-300">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Repository Metadata Verification</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px]">Repository Name</span>
              <div className="text-sky-300 font-bold">{REPO_NAME}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px]">Visibility</span>
              <div className="text-emerald-400 font-bold">PUBLIC</div>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1 md:col-span-2">
              <span className="text-slate-500 uppercase text-[10px]">Repository Description</span>
              <div className="text-slate-200 font-sans">{REPO_DESCRIPTION}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1 md:col-span-2">
              <span className="text-slate-500 uppercase text-[10px]">Official Website Link</span>
              <div className="text-indigo-400">{QEVRA_WEBSITE}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-1.5 text-slate-400 font-semibold mb-2">
              <Tag className="w-3.5 h-3.5 text-sky-400" />
              <span>Configured GitHub Topics ({GITHUB_TOPICS.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {GITHUB_TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded font-mono text-xs bg-slate-800 text-sky-300 border border-slate-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Local Git Commit History */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <GitCommit className="w-4 h-4 text-indigo-400" />
            <span>Local Git Commit History (5 Structured Commits)</span>
          </h2>

          <div className="space-y-2">
            {commits.map((c, idx) => (
              <div
                key={c.hash}
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-400 font-bold">{c.hash}</span>
                  <span className="text-slate-200 font-sans">{c.title}</span>
                </div>
                <span className="text-[10px] text-slate-500">Commit #{5 - idx}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Commands Box 1: Push to Remote */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Command 1: Push Local Repo to Public GitHub</span>
            </h2>
            <button
              onClick={() => handleCopy(gitPushCommand, 'push')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              {copiedCmd === 'push' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd === 'push' ? 'Copied!' : 'Copy Commands'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-lg text-sky-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
            {gitPushCommand}
          </pre>
        </div>

        {/* Terminal Commands Box 2: GitHub CLI creation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Command 2: Create Repo via GitHub CLI (`gh`)</span>
            </h2>
            <button
              onClick={() => handleCopy(ghCliCommand, 'gh')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              {copiedCmd === 'gh' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd === 'gh' ? 'Copied!' : 'Copy Commands'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-lg text-purple-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
            {ghCliCommand}
          </pre>
        </div>

        {/* Footer Reference */}
        <div className="text-center pt-4">
          <a
            href={QEVRA_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold inline-flex items-center space-x-1"
          >
            <span>QEVRA Platform Reference: https://qevra.buzz</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
