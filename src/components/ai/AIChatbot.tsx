import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { AppState, ChatMessage } from '../../types';
import ReactMarkdown from 'react-markdown';

export default function AIChatbot({ context }: { context: AppState }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am Lumina, your Strategic AI. Ask me anything about your revenue forecasts, anomalies, or budget recommendations.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const messageToSend = presetMessage || input.trim();
    if (!messageToSend || isTyping) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: messageToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!presetMessage) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          history: messages.slice(-5), // send last 5 messages for context
          contextContext: context.csvData // pass actual CSV data as context
        })
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I encountered an error connecting to the intelligence core.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    "Why is ROAS dropping?",
    "Which channel performs best?",
    "Where should budget increase?",
    "Predict next month revenue",
    "Identify risky campaigns"
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-black/40">
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide" ref={scrollRef}>
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-cyan-500/20 text-cyan-50 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]' : 'bg-white/5 text-slate-200 border border-white/10 glow-bg-blue !bg-transparent backdrop-blur-sm'}`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed markdown-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold">Lumina Processing...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-black/80 border-t border-white/10 relative z-20 backdrop-blur-xl">
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(undefined, action)}
                className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3" />
                {action}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI about your data..."
            className="w-full bg-white/5 text-slate-200 rounded-xl pl-4 pr-12 py-3 border border-white/10 focus:outline-none focus:border-cyan-400 transition-colors text-sm placeholder:text-slate-500"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg disabled:opacity-50 hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
