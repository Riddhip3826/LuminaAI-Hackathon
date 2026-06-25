import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HealthScore({ score }: { score: number }) {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = 'text-cyan-400';
  let strokeColor = '#22d3ee';
  let glowColor = 'rgba(34, 211, 238, 0.4)';
  if (score < 60) {
    color = 'text-red-400';
    strokeColor = '#f87171';
    glowColor = 'rgba(248, 113, 113, 0.4)';
  } else if (score < 80) {
    color = 'text-fuchsia-400';
    strokeColor = '#e879f9';
    glowColor = 'rgba(232, 121, 249, 0.4)';
  }

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setCounter(score);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-4 sm:p-6 relative flex flex-col items-center justify-center text-center overflow-hidden min-h-[220px]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]`} />
      
      <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 font-display z-10 block">Global Health Index</p>
      
      <div className="relative flex items-center justify-center z-10 my-2">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 filter drop-shadow-[0_0_8px_currentColor]" style={{ color: strokeColor }}>
          <circle
            stroke="rgba(255,255,255,0.05)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute text-center flex flex-col items-center justify-center">
          <span className={`text-3xl font-display font-bold ${color}`}>{counter}</span>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs uppercase tracking-widest font-bold z-10 w-full pt-4 border-t border-white/10">
        System Status: <span className={`${color}`}>{score >= 80 ? 'Optimal Performance' : score >= 60 ? 'Stable Operation' : 'Critical Warning'}</span>
      </div>
    </motion.div>
  );
}
