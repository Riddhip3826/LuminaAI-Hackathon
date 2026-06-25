import { motion } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';
import { AppState } from '../../types';
import HealthScore from './HealthScore';
import AiInsightsCard from './AiInsightsCard';
import RevenueChart from './RevenueChart';
import WhatIfSimulator from './WhatIfSimulator';
import ForecastMetrics from './ForecastMetrics';
import ExecutiveSummaryCard from './ExecutiveSummaryCard';
import ChannelIntelligence from './ChannelIntelligence';
import TimelinePredictions from './TimelinePredictions';

interface Props {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function CommandCenter({ appState }: Props) {
  const { insights, csvData } = appState;

  if (!insights || !csvData) return null;

  return (
    <div className="space-y-6">
      {/* Top Banner AI Notification */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="px-6 py-5 rounded-2xl bg-[#020203] border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 parallax-bg" />
        
        {/* Floating Neural Particles Simulation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-[20%] w-24 h-24 bg-cyan-500/20 blur-[50px] rounded-full animate-pulse-slow" />
           <div className="absolute top-1/2 right-[20%] w-32 h-32 bg-fuchsia-500/20 blur-[60px] rounded-full animate-pulse-slow origin-center scale-[1.2]" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative z-10 w-full gap-4 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-5">
             <div className="relative flex h-5 w-5 items-center justify-center shrink-0">
               <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cyan-400 opacity-40"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 border-[1.5px] border-black shadow-[0_0_10px_#22d3ee]"></span>
             </div>
             
             <div>
                <span className="text-sm font-bold uppercase tracking-widest text-cyan-400 font-display flex items-center gap-2">
                  Lumina Engine Active
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-wide mt-0.5 block max-w-[200px] sm:max-w-none">
                  Processing revenue data & financial forecasting models...
                </span>
             </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
             <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Global Process Load</span>
                <span className="text-sm font-mono text-cyan-400 font-medium">92% Optimal</span>
             </div>
             <div className="w-[1px] h-8 bg-white/10" />
             <div className="flex flex-col text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Inference Latency</span>
                <span className="text-sm font-mono text-emerald-400 font-medium">12ms</span>
             </div>
          </div>
        </div>
        
        {/* Scanning Line Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] animate-shimmer pointer-events-none" />
      </motion.div>

      {/* Executive Summary */}
      <ExecutiveSummaryCard summary={insights.executiveSummary} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Health & Forecast Metrics */}
        <div className="space-y-6 lg:col-span-1 flex flex-col">
          <HealthScore score={insights.healthScore} />
          <ForecastMetrics predictions={insights.predictions} />
          {insights.timelinePredictions && <TimelinePredictions predictions={insights.timelinePredictions} />}
        </div>

        {/* Middle Column: Charts & Simulator */}
        <div className="space-y-6 lg:col-span-2">
          <RevenueChart data={csvData} />
          <div className="mt-6">
            <ChannelIntelligence channels={insights.channelIntelligence} />
          </div>
          <WhatIfSimulator data={csvData} />
        </div>

        {/* Right Column: AI Insights & Alerts */}
        <div className="space-y-6 lg:col-span-1">
          <div className="float-animation">
            <AiInsightsCard title="Risk & Opportunities" items={insights.insights} type="alert" />
          </div>
          <div className="float-animation-delayed">
            <AiInsightsCard title="Detected Trends" items={insights.trends} type="trend" />
          </div>
        </div>
      </div>
    </div>
  );
}
