import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MarkdownViewer } from './components/MarkdownViewer';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { RelevanceSimulator } from './components/RelevanceSimulator';
import { GitHubPushGuide } from './components/GitHubPushGuide';
import { REPO_FILES } from './data/repoFilesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'docs' | 'architecture' | 'simulator' | 'push-guide'>('docs');
  const [activeFileId, setActiveFileId] = useState<string>('readme');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeFile = REPO_FILES.find((f) => f.id === activeFileId) || REPO_FILES[0];

  return (
    <div className="flex flex-col h-screen bg-slate-950 font-sans text-slate-100 overflow-hidden select-none">
      {/* Sticky Global Top Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {activeTab === 'docs' && (
          <>
            <Sidebar
              files={REPO_FILES}
              activeFileId={activeFileId}
              onSelectFile={setActiveFileId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <MarkdownViewer file={activeFile} />
          </>
        )}

        {activeTab === 'architecture' && <ArchitectureVisualizer />}

        {activeTab === 'simulator' && <RelevanceSimulator />}

        {activeTab === 'push-guide' && <GitHubPushGuide />}
      </div>
    </div>
  );
}
