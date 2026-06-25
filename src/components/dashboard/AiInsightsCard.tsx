import { motion } from 'framer-motion';
import { AlertTriangle, Zap, Activity } from 'lucide-react';

interface Props {
  title: string;
  items: string[];
  type: 'trend' | 'alert';
}

export default function AiInsightsCard({ title, items, type }: Props) {
  const isAlert = type === 'alert';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass p-5 rounded-2xl h-full space-y-4 relative overflow-hidden group ${isAlert ? 'border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]'}`}
    >
      <div className={`absolute -inset-20 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-full ${isAlert ? 'bg-red-500' : 'bg-cyan-500'}`} />
      
      <div className="flex items-center space-x-3 border-b border-white/5 pb-3 relative z-10">
        {isAlert ? (
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
        ) : (
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
        )}
        <h3 className={`text-sm font-bold uppercase tracking-widest font-display ${isAlert ? 'text-red-400' : 'text-cyan-400'}`}>{title}</h3>
      </div>

      <div className="space-y-4 relative z-10">
        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (idx * 0.1) }}
            className={`p-3.5 rounded-xl border group/item hover:bg-white/10 transition-colors ${isAlert ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40' : 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40'}`}
          >
            <p className={`text-xs leading-relaxed ${isAlert ? 'text-slate-200' : 'text-slate-200'}`}>
              {isAlert && <span className="block text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 group-hover/item:animate-pulse" /> System Risk Detected</span>}
              {!isAlert && <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 group-hover/item:animate-pulse" /> AI Observation</span>}
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
