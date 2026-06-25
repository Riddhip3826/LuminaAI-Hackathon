import { motion } from 'framer-motion';
import { Mail, ArrowRight, Zap } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function LoginScreen() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 relative">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6 shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]">
             <Zap className="w-8 h-8 neon-text-cyan" />
          </div>
          <h1 className="text-4xl font-sans tracking-tight font-medium text-slate-100 mb-3">
            Lumina AI
          </h1>
          <p className="text-slate-400 font-sans tracking-wide">
            Revenue Intelligence Command Center
          </p>
        </div>

        <div className="glass p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          
          <button
            onClick={handleLogin}
            className="w-full relative group flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all duration-300 rounded-xl py-4"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-medium relative z-10">Continue with Google</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors absolute right-6 z-10" />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Mail className="w-3 h-3" />
            <span>Secure authentication</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
