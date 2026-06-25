import { motion } from 'framer-motion';
import { Activity, Shield, Target, Zap } from 'lucide-react';
import { AiInsights } from '../../types';

export default function ChannelIntelligence({ channels }: { channels: AiInsights['channelIntelligence'] }) {
  if (!channels || channels.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100 font-display">Channel Intelligence</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((channel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-sm p-5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${channel.riskLevel.toLowerCase() === 'high' || channel.riskLevel.toLowerCase() === 'elevated' ? 'border-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]' : 'border-white/5 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]'}`}
          >
            {/* Background Glow */}
            <div className={`absolute -inset-20 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-full ${channel.riskLevel.toLowerCase() === 'high' || channel.riskLevel.toLowerCase() === 'elevated' ? 'bg-red-500' : 'bg-cyan-500'}`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h4 className="text-lg font-display text-slate-100 font-bold">{channel.channelName}</h4>
              <div className={`px-2 py-1 rounded-md text-xs font-bold ${channel.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : channel.score >= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {channel.score}/100
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" /> Contribution</span>
                <span className="text-slate-200 font-medium">{channel.contribution}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> ROAS Stability</span>
                <span className="text-slate-200 font-medium">{channel.roasStability}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Risk Level</span>
                <span className={`font-medium ${channel.riskLevel.toLowerCase() === 'high' || channel.riskLevel.toLowerCase() === 'elevated' ? 'text-red-400' : 'text-emerald-400'}`}>{channel.riskLevel}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 relative z-10">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">Lumina Recommendation</span>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{channel.aiRecommendation}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
