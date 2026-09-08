import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { QEVRA_WEBSITE } from '../data/repoFilesData';

interface CandidateItem {
  id: string;
  title: string;
  publisher: string;
  category: string;
  region: string;
  hoursAgo: number;
  baseTopicMatch: number; // 0 to 1
  baseQuality: number; // 0 to 1
  isIndependentCreator?: boolean;
}

const SAMPLE_CANDIDATES: CandidateItem[] = [
  {
    id: 'c1',
    title: 'Building High-Performance Web Discovery Engines in Rust and Node.js',
    publisher: 'techjournal.dev',
    category: 'Technology',
    region: 'Global',
    hoursAgo: 2,
    baseTopicMatch: 0.95,
    baseQuality: 0.92,
    isIndependentCreator: true
  },
  {
    id: 'c2',
    title: 'African Fintech Infrastructure: Mobile Money & Cross-Border Settlement',
    publisher: 'techcabal.com',
    category: 'Technology',
    region: 'West Africa',
    hoursAgo: 4,
    baseTopicMatch: 0.88,
    baseQuality: 0.90
  },
  {
    id: 'c3',
    title: 'Global Macroeconomic Trends & Inflation Rates Summary',
    publisher: 'globalmeganews.com',
    category: 'Business',
    region: 'Global',
    hoursAgo: 0.5,
    baseTopicMatch: 0.45,
    baseQuality: 0.82
  },
  {
    id: 'c4',
    title: 'Deep-Dive: Typography and Accessible Micro-Interactions in React',
    publisher: 'designcraft.io',
    category: 'Design',
    region: 'Global',
    hoursAgo: 12,
    baseTopicMatch: 0.92,
    baseQuality: 0.95,
    isIndependentCreator: true
  },
  {
    id: 'c5',
    title: 'Tactical Analysis: Pressing Structures in Modern Football Analytics',
    publisher: 'tacticsboard.net',
    category: 'Sports',
    region: 'Europe',
    hoursAgo: 6,
    baseTopicMatch: 0.85,
    baseQuality: 0.88
  },
  {
    id: 'c6',
    title: 'Breaking Tech News: Cloud Computing Company Releases Update',
    publisher: 'globalmeganews.com',
    category: 'Technology',
    region: 'Global',
    hoursAgo: 0.2,
    baseTopicMatch: 0.60,
    baseQuality: 0.70
  },
  {
    id: 'c7',
    title: 'Local-First Software: Building Offline-First Reactive Systems',
    publisher: 'indiecode.org',
    category: 'Technology',
    region: 'Global',
    hoursAgo: 18,
    baseTopicMatch: 0.91,
    baseQuality: 0.94,
    isIndependentCreator: true
  }
];

export const RelevanceSimulator: React.FC = () => {
  // User Weight Controls
  const [topicWeight, setTopicWeight] = useState<number>(0.45);
  const [freshnessWeight, setFreshnessWeight] = useState<number>(0.30);
  const [geoWeight, setGeoWeight] = useState<number>(0.15);
  const [qualityWeight, setQualityWeight] = useState<number>(0.10);
  const [selectedUserTopic, setSelectedUserTopic] = useState<string>('Technology');
  const [selectedUserRegion, setSelectedUserRegion] = useState<string>('West Africa');
  const [enableDomainCap, setEnableDomainCap] = useState<boolean>(true);

  // Re-calculate Scores dynamically
  const rankedCandidates = useMemo(() => {
    const scored = SAMPLE_CANDIDATES.map((item) => {
      // 1. Topic Match Score
      const topicMatchScore = item.category === selectedUserTopic ? item.baseTopicMatch : item.baseTopicMatch * 0.3;

      // 2. Freshness Decay Score e^(-lambda * t)
      const lambda = 0.1;
      const freshnessScore = Math.exp(-lambda * item.hoursAgo);

      // 3. Geo Alignment Score
      const geoScore = item.region === selectedUserRegion ? 1.0 : item.region === 'Global' ? 0.7 : 0.4;

      // 4. Quality Score
      const qualityScore = item.baseQuality;

      // Final Composite Relevance Score S
      const rawScore =
        topicMatchScore * topicWeight +
        freshnessScore * freshnessWeight +
        geoScore * geoWeight +
        qualityScore * qualityWeight;

      return {
        ...item,
        topicMatchScore,
        freshnessScore,
        geoScore,
        qualityScore,
        finalScore: Math.round(rawScore * 100) / 100,
      };
    });

    // Sort descending
    scored.sort((a, b) => b.finalScore - a.finalScore);

    // Domain Diversity Penalty Filter (max 1 per domain in top 3 if cap enabled)
    if (enableDomainCap) {
      const domainCount: Record<string, number> = {};
      return scored.map((item) => {
        domainCount[item.publisher] = (domainCount[item.publisher] || 0) + 1;
        const penalty = domainCount[item.publisher] > 1 ? 0.15 : 0;
        return {
          ...item,
          finalScore: Math.max(0, Math.round((item.finalScore - penalty) * 100) / 100),
          domainPenalized: penalty > 0,
        };
      }).sort((a, b) => b.finalScore - a.finalScore);
    }

    return scored;
  }, [topicWeight, freshnessWeight, geoWeight, qualityWeight, selectedUserTopic, selectedUserRegion, enableDomainCap]);

  const handleReset = () => {
    setTopicWeight(0.45);
    setFreshnessWeight(0.30);
    setGeoWeight(0.15);
    setQualityWeight(0.10);
    setSelectedUserTopic('Technology');
    setSelectedUserRegion('West Africa');
    setEnableDomainCap(true);
  };

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-6 h-6 text-emerald-400" />
              <span>QEVRA Relevance Ranking Engine Simulator</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Experiment with multi-factor scoring weights (Topic, Freshness Decay, Geo Alignment, Quality, Domain Caps) and see discovery candidate feeds re-rank in real time.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center space-x-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Weights</span>
          </button>
        </div>

        {/* Controls Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Weight Sliders & Context */}
          <div className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 text-xs text-slate-300">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-2">
              User Context & Scoring Weights
            </h3>

            {/* Topic Filter */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">User Interest Topic</label>
              <select
                value={selectedUserTopic}
                onChange={(e) => setSelectedUserTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Target Geographic Region</label>
              <select
                value={selectedUserRegion}
                onChange={(e) => setSelectedUserRegion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="West Africa">West Africa</option>
                <option value="Global">Global</option>
                <option value="Europe">Europe</option>
              </select>
            </div>

            {/* Slider 1: Topic Weight */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-300">Topic Match ($w_t$)</span>
                <span className="font-mono text-indigo-400">{Math.round(topicWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={topicWeight}
                onChange={(e) => setTopicWeight(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Slider 2: Freshness Weight */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-300">Freshness Decay ($w_f$)</span>
                <span className="font-mono text-amber-400">{Math.round(freshnessWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={freshnessWeight}
                onChange={(e) => setFreshnessWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Slider 3: Geo Weight */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-300">Geographic Alignment ($w_g$)</span>
                <span className="font-mono text-sky-400">{Math.round(geoWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={geoWeight}
                onChange={(e) => setGeoWeight(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Slider 4: Quality Weight */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-300">Quality Signal ($w_q$)</span>
                <span className="font-mono text-emerald-400">{Math.round(qualityWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={qualityWeight}
                onChange={(e) => setQualityWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Domain Cap Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Domain Diversity Cap</div>
                <div className="text-[10px] text-slate-500">Penalizes repeated domains</div>
              </div>
              <input
                type="checkbox"
                checked={enableDomainCap}
                onChange={(e) => setEnableDomainCap(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Live Re-Ranked Discovery Stream */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Live Re-Ranked Discovery Output Stream
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {rankedCandidates.length} Candidates Evaluated
              </span>
            </div>

            <div className="space-y-3">
              {rankedCandidates.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    idx === 0
                      ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="font-mono font-bold text-indigo-400">#{idx + 1}</span>
                        <span className="font-semibold text-slate-200">{item.publisher}</span>
                        <span className="text-slate-500">•</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.category}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.region}
                        </span>
                        {item.isIndependentCreator && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                            Indie Creator
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-100 leading-snug">
                        {item.title}
                      </h4>

                      <div className="flex items-center space-x-4 text-[11px] text-slate-400 pt-1">
                        <span>Published {item.hoursAgo}h ago</span>
                        <span>Topic: {Math.round(item.topicMatchScore * 100)}%</span>
                        <span>Freshness: {Math.round(item.freshnessScore * 100)}%</span>
                      </div>
                    </div>

                    {/* Composite Score Pill */}
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {item.finalScore.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>
            Read the mathematical scoring spec in <span className="font-mono text-sky-300">RELEVANCE.md</span>.
          </span>
          <a
            href={QEVRA_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 inline-flex items-center space-x-1 font-medium"
          >
            <span>QEVRA Live Reference Platform</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
