import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { RepoFile } from '../data/repoFiles';
import { Copy, Check, FileCode, Eye, ExternalLink } from 'lucide-react';
import { QEVRA_WEBSITE } from '../data/repoFilesData';

interface MarkdownViewerProps {
  file: RepoFile;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ file }) => {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Top File Action Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-sm font-semibold text-slate-100 px-2.5 py-1 bg-slate-800 rounded border border-slate-700">
            {file.filename}
          </span>
          <span className="text-xs text-slate-400 hidden md:inline">
            {file.description}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
          >
            {showRaw ? <Eye className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
            <span>{showRaw ? 'Rendered View' : 'Raw Markdown'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Raw'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {showRaw ? (
          <pre className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {file.content}
          </pre>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 text-slate-300">
            {/* Header info card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex items-start justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {file.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{file.description}</p>
              </div>
              <a
                href={QEVRA_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center space-x-1 shrink-0 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20"
              >
                <span>QEVRA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Markdown Body */}
            <article className="prose prose-invert prose-slate max-w-none prose-headings:text-slate-100 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline prose-code:text-sky-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-table:border prose-table:border-slate-800 prose-th:bg-slate-900 prose-th:p-2.5 prose-td:p-2.5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline underline-offset-2">
                      {children}
                    </a>
                  ),
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <div className="my-4 rounded-lg bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-sky-300">
                        <code>{children}</code>
                      </div>
                    ) : (
                      <code className="bg-slate-900 text-sky-300 border border-slate-800 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {file.content}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </div>
  );
};
