import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState } from '../../types';
import Header from './Header';
import FileUploader from './FileUploader';
import CommandCenter from './CommandCenter';
import AIChatbot from '../ai/AIChatbot';
import { MessageSquare, X } from 'lucide-react';

interface Props {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
  onLogout: () => void;
}

export default function Dashboard({ appState, setAppState, onLogout }: Props) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col relative h-full overflow-hidden">
      <Header user={appState.user!} onLogout={onLogout} />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-10 scrollbar-hide relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto w-full h-full relative z-10">
          {!appState.csvData ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="h-full flex flex-col items-center justify-center pt-10 pb-20"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-medium tracking-tight text-slate-100 mb-3">Initialize Analysis Engine</h2>
                <p className="text-slate-400 max-w-lg mx-auto">Upload your historical ecommerce data (Date, Channel, Spend, Revenue, ROAS) to generate AI forecasts and insights.</p>
              </div>
              <FileUploader setAppState={setAppState} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="pb-20"
            >
              <CommandCenter appState={appState} setAppState={setAppState} />
            </motion.div>
          )}
        </div>
      </main>

      {/* Floating Chatbot Toggle */}
      {appState.csvData && (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[450px] h-[600px] max-h-[85vh] glass border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.2)] overflow-hidden flex flex-col rounded-2xl float-animation"
              >
                  <div className="bg-black/80 backdrop-blur-xl px-5 py-4 border-b border-white/10 flex justify-between items-center relative z-20">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                      </div>
                      <span className="font-bold text-slate-100 font-display tracking-widest uppercase text-sm">Lumina Analyst</span>
                    </div>
                  <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-200 transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <AIChatbot context={appState} />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-16 h-16 bg-cyan-500 hover:bg-cyan-400 rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] transition-all float-animation-delayed relative"
          >
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-50 pulse-ring" />
            {chatOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10" />}
          </button>
        </div>
      )}
    </div>
  );
}
