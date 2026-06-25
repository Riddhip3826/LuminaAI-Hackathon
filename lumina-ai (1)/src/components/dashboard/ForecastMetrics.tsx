import { motion } from 'framer-motion';
import { TrendingUp, Activity, BarChart2, Zap } from 'lucide-react';
import { AiInsights } from '../../types';
import { useState, useEffect } from 'react';

export default function ForecastMetrics({ predictions }: { predictions: AiInsights['predictions'] }) {
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = predictions.forecastConfidence;
    const duration = 1000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setConfidence(target);
        clearInterval(timer);
      } else {
        setConfidence(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [predictions.forecastConfidence]);

  const metrics = [
    { label: 'Expected Growth', value: predictions.expectedRevenueIncrease, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Predicted ROAS', value: predictions.roasRange, icon: BarChart2, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
  ];

  return (
    <div className="space-y-4">
      {/* Animated Confidence Meter */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-5 rounded-2xl relative overflow-hidden group border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
      >
        <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-100 font-display">Forecast Confidence</span>
          </div>
          <Zap className="w-4 h-4 text-cyan-400/50" />
        </div>

        <div className="flex items-end gap-3 relative z-10">
          <span className="text-5xl font-display font-bold text-cyan-400 tracking-tight">{confidence}</span>
          <span className="text-lg text-slate-400 font-medium mb-1">%</span>
        </div>

        <div className="mt-4 h-2 bg-slate-800/50 rounded-full overflow-hidden relative z-10 border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${predictions.forecastConfidence}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>
      </motion.div>

      {/* Secondary Metrics */}
      {metrics.map((metric, idx) => (
        <motion.div
           key={metric.label}
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 + (idx * 0.1) }}
           className={`glass-sm p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-all duration-300 border ${metric.border} hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg}`}>
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">{metric.label}</p>
            <p className={`text-xl font-display font-bold tracking-tight ${metric.color}`}>{metric.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
