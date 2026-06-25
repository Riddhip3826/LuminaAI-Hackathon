import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, AlertTriangle, Zap, ArrowUpRight } from 'lucide-react';
import { AiInsights } from '../../types';

export default function ExecutiveSummaryCard({ summary }: { summary: AiInsights['executiveSummary'] }) {
  if (!summary) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full mb-2 glass-sm border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
        
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3 text-cyan-400" /> System Health
          </span>
          <span className="text-lg font-display text-slate-100">{summary.overallHealth}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> Target Next Month
          </span>
          <span className="text-xl font-display text-emerald-400 font-bold">{summary.nextMonthGrowth}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-3 h-3 text-cyan-400" /> Top Opportunity
          </span>
          <span className="text-sm text-slate-200 mt-1">{summary.biggestOpportunity}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-red-400" /> Greatest Risk
          </span>
          <span className="text-sm text-slate-200 mt-1">{summary.biggestRisk}</span>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Action</span>
          <button className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-sm font-medium transition-all group">
            {summary.recommendedAction}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
