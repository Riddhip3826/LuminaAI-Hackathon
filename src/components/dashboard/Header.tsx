import { User } from '../../types';
import { LogOut, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: Props) {
  return (
    <header className="h-20 border-b border-white/5 bg-[#020203]/80 backdrop-blur-2xl flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-40">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40 rounded-lg animate-pulse" />
          <div className="relative w-10 h-10 bg-black border border-cyan-500/50 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl font-display font-bold tracking-widest text-slate-100 uppercase">Lumina<span className="text-cyan-400">.AI</span></span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-emerald-400" /> System Online
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-100 font-display">{user.name}</p>
            <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Executive Access</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/10 text-cyan-400 font-display font-bold relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform" />
            <span className="relative z-10">{user.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
