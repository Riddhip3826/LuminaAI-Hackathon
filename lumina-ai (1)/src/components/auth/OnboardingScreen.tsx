import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';

interface Props {
  onComplete: (name: string) => void;
  onLogout: () => void;
}

export default function OnboardingScreen({ onComplete, onLogout }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="w-full max-w-md relative">
      <div className="absolute inset-0 bg-cyan-400/10 blur-[100px] rounded-full" />
      
      <div className="glass p-10 shadow-2xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
        >
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          
          <h2 className="text-3xl font-sans tracking-tight font-medium text-slate-100 mb-2">
            Welcome aboard
          </h2>
          <p className="text-slate-400 mb-8">
            What should our AI call you?
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 text-slate-100 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all placeholder:text-slate-600"
              />
            </div>
            
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 disabled:opacity-50 text-cyan-400 rounded-xl py-4 transition-colors font-medium group neon-border-cyan"
            >
              <span>Initialize Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="w-full text-center text-sm text-slate-500 hover:text-slate-300 transition-colors mt-4"
            >
              Cancel and sign out
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
