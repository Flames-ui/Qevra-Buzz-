import React, { useState } from 'react';
import { Layers, Database, Cpu, Globe, Server, ArrowRight, ShieldCheck, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { QEVRA_WEBSITE } from '../data/repoFilesData';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [processedCount, setProcessedCount] = useState<number>(1000000);

  const steps = [
    {
      title: '1. Source Acquisition',
      subtitle: 'Publisher RSS & Platform Feeds',
      icon: Globe,
      color: 'from-amber-500 to-orange-500',
      description: 'Asynchronous poller fetches external RSS 2.0, Atom 1.0, JSON Feed streams across global publishers and creator outlets.',
      details: ['Polling Scheduler with ETag & If-Modified-Since support', 'User-Agent: QevraBot/1.0 (+https://qevra.buzz)', 'Adaptive poll frequency based on publisher output cadence']
    },
    {
      title: '2. Ingestion & Sanitization',
      subtitle: 'Parsing & HTML Security Strip',
      icon: ShieldCheck,
      color: 'from-sky-500 to-blue-600',
      description: 'Parses XML/JSON payloads, strips inline scripts and tracking pixels, enforcing SSRF protections on outbound connections.',
      details: ['Non-routable IP blocking (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16)', '10MB max response payload cap', 'Strict DOMPurify HTML sanitization']
    },
    {
      title: '3. Content Normalization',
      subtitle: 'Standardized TS Item Schema',
      icon: Database,
      color: 'from-indigo-500 to-violet-600',
      description: 'Converts raw publisher items into standard internal schemas with canonical URL resolution and author extraction.',
      details: ['Canonical URL resolution', 'Extract author, summary, ISO timestamp', 'Standardize category tags & language detection']
    },
    {
      title: '4. Media Extraction',
      subtitle: 'Hero Image Proxy & Optimization',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      description: 'Scans media:content, enclosure, og:image, and video thumbnails to extract hero media for dynamic WebP/AVIF transcoding.',
      details: ['Priority: media:content > enclosure > og:image > YouTube thumb', 'Dynamic WebP/AVIF compression (60-80% byte reduction)', 'Fallback category SVG vector placeholders']
    },
    {
      title: '5. SHA-256 Deduplication',
      subtitle: 'Exact & Near-Duplicate Suppression',
      icon: Layers,
      color: 'from-pink-500 to-rose-600',
      description: 'Computes sha256(canonicalUrl) and sha256(title + snippet) to suppress exact and near-duplicate wire story reprints.',
      details: ['Canonical hash lookup in memory store', 'Near-duplicate text snippet hashing', 'Retains original canonical publisher version']
    },
    {
      title: '6. Classification & Relevance',
      subtitle: 'Multi-Factor Signal Scoring',
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      description: 'Scores candidates based on topic alignment, exponential recency decay, quality metrics, and regional interest matching.',
      details: ['Topic Taxonomy Mapping', 'Exponential freshness decay formula', 'Geographic affinity & quality coefficients']
    },
    {
      title: '7. Multi-Tier Edge Caching',
      subtitle: 'CDN & In-Memory Redis Cache',
      icon: Server,
      color: 'from-cyan-500 to-sky-600',
      description: 'Compiles discovery feeds into edge caches with single-flight request coalescing to protect core DB storage.',
      details: ['Edge CDN Cache (TTL: 180s)', 'Single-flight request coalescing (prevents thundering herd)', 'Zero direct DB hits for anonymous read traffic']
    },
    {
      title: '8. Public Delivery Payload',
      subtitle: 'Sub-50ms Discovery API',
      icon: CheckCircle2,
      color: 'from-emerald-400 to-green-600',
      description: 'Serves personalized, regional discovery streams to end users at ultra-low latencies.',
      details: ['Sub-50ms API response time', 'Domain diversity enforced (max 2 items per domain)', 'Contextual exploration injection']
    }
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    let count = 1000000;
    setActiveStep(0);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          setProcessedCount(25);
          return steps.length - 1;
        }
        count = Math.floor(count * 0.45);
        setProcessedCount(count);
        return prev + 1;
      });
    }, 800);
  };

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>QEVRA System Architecture Explorer</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Interactive visualization of open-web discovery ingestion, indexing, relevance ranking, and caching pipeline.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center space-x-2 shadow-md shadow-indigo-500/20"
            >
              <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Processing Funnel...' : 'Simulate 1M Item Funnel'}</span>
            </button>
          </div>
        </div>

        {/* Funnel Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ingested Pool</div>
            <div className="text-xl font-bold text-slate-100 mt-1">1,000,000 / day</div>
            <div className="text-[11px] text-slate-500">Global RSS & Web feeds</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">L1 Pre-Filtered</div>
            <div className="text-xl font-bold text-sky-400 mt-1">10,000 candidates</div>
            <div className="text-[11px] text-slate-500">Language, Region & Age filter</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">L2 Relevance Scored</div>
            <div className="text-xl font-bold text-indigo-400 mt-1">500 candidates</div>
            <div className="text-[11px] text-slate-500">Topical match & decay scoring</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">L3 Final Discovery Feed</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">25 - 50 items</div>
            <div className="text-[11px] text-slate-500">Domain diversity & cached</div>
          </div>
        </div>

        {/* Pipeline Stepper Grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            8-Stage Discovery Subsystems Pipeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-tr ${step.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">Stage {idx + 1}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{step.subtitle}</p>

                  {isActive && (
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-indigo-400 font-medium flex items-center justify-between">
                      <span>ACTIVE STEP</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Deep Dive Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200 space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-tr ${steps[activeStep].color} text-white`}>
              {React.createElement(steps[activeStep].icon, { className: 'w-6 h-6' })}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{steps[activeStep].title}</h3>
              <p className="text-xs text-slate-400">{steps[activeStep].subtitle}</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {steps[activeStep].description}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Engineering Specs & Safeguards
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps[activeStep].details.map((detail, dIdx) => (
                <div key={dIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reference Banner */}
        <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-300">
            For complete architectural specifications, view <span className="font-mono text-indigo-300">ARCHITECTURE.md</span> and <span className="font-mono text-indigo-300">SCALING.md</span> in the docs viewer.
          </span>
          <a
            href={QEVRA_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium shrink-0 transition-colors"
          >
            Explore Live QEVRA Platform
          </a>
        </div>
      </div>
    </div>
  );
};
