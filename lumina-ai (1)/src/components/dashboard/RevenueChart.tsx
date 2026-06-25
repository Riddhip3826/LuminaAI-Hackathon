import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CsvRow } from '../../types';
import { format, parseISO, isValid } from 'date-fns';

export default function RevenueChart({ data }: { data: CsvRow[] }) {
  const chartData = useMemo(() => {
    // Process top 30 rows or group by date to show a nice trend.
    // For simplicity, we'll take the first 30 valid rows and reverse them assuming roughly chronological if sorted desc
    // Better: parse dates, sort, group by date, sum revenue & spend.
    
    const aggregated: Record<string, { date: string; Revenue: number; Spend: number; ROAS: number }> = {};
    
    data.forEach(row => {
        let d = row.Date;
        // Attempt parse to standard format if valid
        try {
            const pd = new Date(d);
            if (isValid(pd)) {
                d = format(pd, 'MMM dd');
            }
        } catch { /* ignore */ }
        
        if (!aggregated[d]) aggregated[d] = { date: d, Revenue: 0, Spend: 0, ROAS: 0 };
        
        const rev = parseFloat(row.Revenue?.replace(/[^0-9.-]+/g,"")) || 0;
        const spd = parseFloat(row.Spend?.replace(/[^0-9.-]+/g,"")) || 0;
        const roas = parseFloat(row.ROAS?.replace(/[^0-9.-]+/g,"")) || 0;

        aggregated[d].Revenue += rev;
        aggregated[d].Spend += spd;
        aggregated[d].ROAS = Math.max(aggregated[d].ROAS, roas); // simplified
    });

    return Object.values(aggregated).slice(-30); // Last 30 points
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-4 sm:p-6 flex-1 relative flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Revenue & ROAS Forecast</h3>
        </div>
        <div className="flex space-x-4 text-xs font-mono">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>Revenue</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-fuchsia-500 mr-2"></span>Spend</span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(2, 2, 3, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f8fafc', backdropFilter: 'blur(8px)' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Area type="monotone" dataKey="Spend" stroke="#d946ef" strokeDasharray="6 6" fillOpacity={1} fill="url(#colorSpend)" strokeWidth={2} />
            <Area type="monotone" dataKey="Revenue" stroke="#22d3ee" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
