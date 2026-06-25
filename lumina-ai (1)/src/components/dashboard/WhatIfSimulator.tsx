import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CsvRow } from '../../types';
import { SlidersHorizontal, ArrowRight, Zap } from 'lucide-react';

export default function WhatIfSimulator({ data }: { data: CsvRow[] }) {
  const [budgetChange, setBudgetChange] = useState(0);

  const stats = useMemo(() => {
    let totalRev = 0;
    let totalSpend = 0;
    
    data.forEach(row => {
      totalRev += parseFloat(row.Revenue?.replace(/[^0-9.-]+/g,"")) || 0;
      totalSpend += parseFloat(row.Spend?.replace(/[^0-9.-]+/g,"")) || 0;
    });

    const avgROAS = totalSpend > 0 ? totalRev / totalSpend : 2.5;

    return { avgROAS, currentRev: totalRev, currentSpend: totalSpend };
  }, [data]);

  // Simulate elasticity. If spend increases, ROAS drops slightly.
  const simulatedSpend = stats.currentSpend * (1 + budgetChange / 100);
  const simulatedRoas = stats.avgROAS * (1 - (budgetChange / 200)); // diminish returns
  const simulatedRev = simulatedSpend * simulatedRoas;

  const revDiffPercent = stats.currentRev > 0 ? ((simulatedRev - stats.currentRev) / stats.currentRev) * 100 : 0;
  
  let riskLevel = "Low";
  if (budgetChange > 50) riskLevel = "High";
  else if (budgetChange > 20) riskLevel = "Medium";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl relative flex flex-col justify-center overflow-hidden border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)] mt-6"
    >
       {/* Background gradient reactor */}
       <div 
        className="absolute inset-x-0 bottom-0 top-1/2 opacity-[0.15] pointer-events-none transition-all duration-700 blur-[60px]"
        style={{
            background: budgetChange > 0 ? '#22d3ee' : budgetChange < 0 ? '#f87171' : 'transparent'
        }} 
       />

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
           <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100 font-display">What-If Simulator</h3>
          <p className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest mt-0.5 flex items-center gap-1.5"><Zap className="w-3 h-3" /> Elasticity Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="bg-black/20 p-5 rounded-xl border border-white/5">
           <div className="mb-4 flex justify-between text-sm">
             <span className="text-slate-400 font-medium tracking-wide">Budget Adjustment</span>
             <span className="text-cyan-400 font-display font-bold text-lg">{budgetChange > 0 ? '+' : ''}{budgetChange}%</span>
           </div>
           <input 
             type="range" 
             min="-50" 
             max="100" 
             step="5"
             value={budgetChange}
             onChange={(e) => setBudgetChange(parseInt(e.target.value))}
             className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
           />
           <div className="flex justify-between text-[10px] text-slate-500 mt-3 font-display font-bold tracking-wider">
             <span>-50%</span>
             <span>+100%</span>
           </div>
        </div>

        <div className="bg-gradient-to-br from-black/60 to-black/20 p-5 rounded-xl border border-white/10 flex items-center justify-between relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
           <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors" />
           <div className="relative z-10 w-full flex justify-between items-center">
             <div>
               <p className="text-slate-400 text-xs font-medium tracking-wide mb-2 flex items-center gap-2">Projected Impact <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></p>
               <p className={`text-3xl font-display font-bold tracking-tight ${revDiffPercent > 0 ? 'text-cyan-400' : revDiffPercent < 0 ? 'text-red-400' : 'text-slate-200'}`}>
                 {revDiffPercent > 0 ? '+' : ''}{revDiffPercent.toFixed(1)}%
               </p>
               <p className="text-slate-300 text-sm mt-1 font-medium">Rev: ${(simulatedRev).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
             </div>
             
             <div className="flex flex-col gap-2 text-right">
               <div className="flex items-center justify-end gap-2">
                 <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">ROAS:</span>
                 <span className="text-slate-200 font-bold">{simulatedRoas.toFixed(2)}x</span>
               </div>
               <div className="flex items-center justify-end gap-2">
                 <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Risk:</span>
                 <span className={`text-xs font-bold px-2 py-1 rounded-md bg-black/40 border border-white/10 uppercase tracking-widest ${riskLevel === 'High' ? 'text-red-400' : riskLevel === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>{riskLevel}</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
