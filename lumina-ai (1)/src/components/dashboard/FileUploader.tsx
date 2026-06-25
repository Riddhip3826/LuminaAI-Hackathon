import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileSpreadsheet, Loader2, AlertCircle } from 'lucide-react';
import { AppState, CsvRow, AiInsights } from '../../types';

interface Props {
  setAppState: Dispatch<SetStateAction<AppState>>;
}

export default function FileUploader({ setAppState }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    "Scanning historical revenue vectors",
    "Detecting cross-channel ROI volatility",
    "Forecasting next-30-day performance",
    "Identifying anomalous risk patterns",
    "Generating executive strategic intel" // 5 steps
  ];

  const processDataWithAI = async (data: CsvRow[]) => {
    try {
      // Start moving through steps using interval
      const stepTimer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 1200);

      const res = await fetch('/api/analyze-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvData: data }),
      });

      clearInterval(stepTimer);

      if (!res.ok) {
        throw new Error('Failed to process data with AI.');
      }

      const insights: AiInsights = await res.json();
      setCurrentStepIndex(steps.length - 1); // ensure we hit the last step
      
      // Artificial delay for the final step to be read
      setTimeout(() => {
        setIsProcessing(false);
        setAnalysisComplete(true);
        setTimeout(() => {
          setAppState((prev) => ({ ...prev, csvData: data, insights }));
        }, 2000);
      }, 1000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during AI analysis. Is the server running?');
      setIsProcessing(false);
      setAnalysisComplete(false);
      setCurrentStepIndex(0);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Validation check
        const data = results.data;
        if (data.length === 0) {
          setError('CSV file is empty.');
          setIsProcessing(false);
          return;
        }

        const requiredCols = ['Date', 'Channel', 'Spend', 'Revenue', 'ROAS'];
        const firstRow = data[0];
        const missingCols = requiredCols.filter(col => !(col in firstRow));
        
        if (missingCols.length > 0) {
          setError(`Missing required columns: ${missingCols.join(', ')}`);
          setIsProcessing(false);
          return;
        }

        // Call AI backend
        processDataWithAI(data);
      },
      error: (err) => {
        setError(`Failed to parse CSV: ${err.message}`);
        setIsProcessing(false);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  } as any);

  return (
    <div className="w-full max-w-2xl relative">
      {/* Background glowing rings during processing */}
      {(isProcessing || analysisComplete) && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className={`absolute w-[150%] h-[150%] rounded-full border border-cyan-500/20 blur-[2px] transition-all duration-1000 ${analysisComplete ? 'scale-[2] opacity-0' : 'animate-[spin_10s_linear_infinite] opacity-100'}`} />
            <div className={`absolute w-[120%] h-[120%] rounded-full border border-fuchsia-500/20 blur-[1px] transition-all duration-1000 ${analysisComplete ? 'scale-[2] opacity-0' : 'animate-[spin_7s_linear_infinite_reverse] opacity-100'}`} />
        </div>
      )}

      <div 
        {...(!isProcessing && !analysisComplete ? getRootProps() : {})} 
        className={`relative overflow-hidden group cursor-pointer border-2 rounded-3xl p-6 sm:p-12 transition-all duration-700 flex flex-col items-center justify-center min-h-[400px] z-10 ${
            analysisComplete ? 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)] bg-emerald-500/5 scale-105'
          : isProcessing ? 'border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)] bg-cyan-500/5 scale-105' 
          : isDragActive ? 'border-cyan-400 border-dashed bg-cyan-400/5' 
          : 'border-white/10 border-dashed glass hover:border-cyan-500/30 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]'
        }`}
      >
        {!isProcessing && !analysisComplete && <input {...getInputProps()} />}
        
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {analysisComplete ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center z-10 w-full"
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-40 rounded-full animate-pulse" />
                <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/50 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                   <UploadCloud className="w-10 h-10" />
                </div>
             </div>
             <motion.h3 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2}
               className="text-2xl font-display font-bold text-emerald-400 tracking-wider uppercase"
             >
               Revenue Intelligence Ready
             </motion.h3>
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} delay={0.4} className="text-emerald-500/70 text-xs font-bold tracking-widest uppercase mt-3">
                Initializing Command Center...
             </motion.p>
          </motion.div>
        ) : isProcessing ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center z-10 w-full relative"
          >
            {/* Cinematic Scanning Line */}
            <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan pointer-events-none" />

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30 rounded-full animate-pulse-slow" />
              <div className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
                <Loader2 className="w-10 h-10 text-cyan-400 animate-[spin_3s_linear_infinite_reverse]" />
              </div>
            </div>
            
            <h3 className="text-sm font-display font-bold text-cyan-400 tracking-widest uppercase mb-4 animate-pulse">Lumina AI Analyzing</h3>
            
            <div className="w-full max-w-sm space-y-3 text-left bg-black/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
              {steps.map((step, idx) => (
                 <div key={idx} className="flex items-center justify-between text-xs font-mono">
                    <span className={`transition-colors duration-500 ${idx < currentStepIndex ? 'text-slate-500' : idx === currentStepIndex ? 'text-cyan-400 font-bold' : 'text-slate-700'}`}>
                      {step}
                    </span>
                    <span className="flex-shrink-0 ml-4">
                      {idx < currentStepIndex ? (
                        <span className="text-emerald-500 font-bold tracking-widest">[DONE]</span>
                      ) : idx === currentStepIndex ? (
                        <span className="text-cyan-400 font-bold tracking-widest animate-pulse">[ACTV]</span>
                      ) : (
                        <span className="text-slate-700 font-bold tracking-widest">[WAIT]</span>
                      )}
                    </span>
                 </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center z-10"
          >
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/10 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-500 relative">
               <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-cyan-400 transition-colors relative z-10" />
            </div>
            <h3 className="text-xl font-display font-medium text-slate-200 mb-3 tracking-wide">
              {isDragActive ? 'Release to Initialize' : 'Upload Revenue Dataset'}
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mb-8">
              Drag & drop a CSV file containing: Date, Channel, Spend, Revenue, ROAS
            </p>
            <div className="px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-bold tracking-wider uppercase border border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Browse Vectors</span>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)] backdrop-blur-xl z-20"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
