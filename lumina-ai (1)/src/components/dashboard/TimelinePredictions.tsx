import { motion } from 'framer-motion';
import { CalendarDays, LineChart as LineChartIcon, Radar, Sparkles } from 'lucide-react';
import { AiInsights } from '../../types';

export default function TimelinePredictions({ predictions }: { predictions: AiInsights['timelinePredictions'] }) {
  if (!predictions) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-5 rounded-2xl h-full flex flex-col relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-fuchsia-400" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100 font-display">Timeline Predictions</h3>
      </div>

      <div className="flex-1 space-y-6 relative">
        {/* Connection line */}
        <div className="absolute left-[15px] top-[10px] bottom-[20px] w-0.5 bg-gradient-to-b from-fuchsia-500/50 via-cyan-500/20 to-transparent" />

        <div className="relative pl-10">
          <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/50 flex flex-col items-center justify-center pt-0.5">
            <span className="text-[10px] font-bold text-fuchsia-300">7D</span>
          </div>
          <h4 className="text-sm font-medium text-slate-100 mb-1 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-slate-400" /> Next 7 Days</h4>
          <p className="text-xs text-slate-400">{predictions.next7Days}</p>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex flex-col items-center justify-center pt-0.5">
            <span className="text-[10px] font-bold text-cyan-300">30D</span>
          </div>
          <h4 className="text-sm font-medium text-slate-100 mb-1 flex items-center gap-1.5"><LineChartIcon className="w-3.5 h-3.5 text-slate-400" /> Next 30 Days</h4>
          <p className="text-xs text-slate-400">{predictions.next30Days}</p>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex flex-col items-center justify-center pt-0.5">
            <span className="text-[10px] font-bold text-emerald-300">60D</span>
          </div>
          <h4 className="text-sm font-medium text-slate-100 mb-1 flex items-center gap-1.5"><LineChartIcon className="w-3.5 h-3.5 text-slate-400" /> Next 60 Days</h4>
          <p className="text-xs text-slate-400">{predictions.next60Days || "Projected stable growth"}</p>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex flex-col items-center justify-center pt-0.5">
            <span className="text-[10px] font-bold text-purple-300">90D</span>
          </div>
          <h4 className="text-sm font-medium text-slate-100 mb-1 flex items-center gap-1.5"><LineChartIcon className="w-3.5 h-3.5 text-slate-400" /> Next 90 Days</h4>
          <p className="text-xs text-slate-400">{predictions.next90Days || "Analyzing long-term patterns..."}</p>
        </div>

        <div className="relative pl-10">
          <div className="absolute left-[6px] top-1.5 w-5 h-5 rounded-full bg-slate-800 border border-white/20 flex flex-col items-center justify-center pt-0.5">
            <Radar className="w-3 h-3 text-slate-400" />
          </div>
          <h4 className="text-sm font-medium text-slate-100 mb-1">Risk Forecast</h4>
          <p className="text-xs text-slate-400">{predictions.riskForecast}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium tracking-wide">Revenue Probability</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${predictions.revenueProbability}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500"
            />
          </div>
          <span className="text-sm font-bold text-slate-200">{predictions.revenueProbability}%</span>
        </div>
      </div>
    </motion.div>
  );
}
