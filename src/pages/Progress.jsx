import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';

export default function Progress() {
  const { history } = useAppContext();

  // Mock data if no history yet
  const data = history.length > 0 ? history : [
    { dateString: 'Mon', mood: 3, stress: 6, sleep: 7, screenTime: 5 },
    { dateString: 'Tue', mood: 4, stress: 5, sleep: 8, screenTime: 4 },
    { dateString: 'Wed', mood: 2, stress: 8, sleep: 5, screenTime: 7 },
    { dateString: 'Thu', mood: 5, stress: 3, sleep: 9, screenTime: 3 },
    { dateString: 'Fri', mood: 4, stress: 4, sleep: 7, screenTime: 4 },
  ];

  // Format data for charts
  const chartData = data.slice(-7).map(item => {
    // If it's real data, format date to just day name or short date
    let label = item.dateString;
    if (item.date) {
      const d = new Date(item.date);
      label = d.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return { ...item, label };
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 pb-24">
      <h1 className="text-3xl font-semibold text-stone-800 mb-8">Your Progress</h1>

      {/* Mood Trend Chart */}
      <div className="mb-8 bg-white p-5 rounded-3xl shadow-sm border border-border-card">
        <h3 className="text-lg font-semibold text-text-main mb-4">Mood Trend</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#839788" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#839788" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f2eb" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
              <YAxis domain={[1, 5]} hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: '1px solid #e4d8c8', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="mood" stroke="#2f5d50" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stress & Sleep Comparison */}
      <div className="mb-8 bg-white p-5 rounded-3xl shadow-sm border border-border-card">
        <h3 className="text-lg font-semibold text-text-main mb-4">Stress vs. Sleep</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f2eb" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#a8a29e', fontSize: 12}} />
              <Tooltip cursor={{fill: '#fbf7f0'}} contentStyle={{ borderRadius: '16px', border: '1px solid #e4d8c8', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="stress" name="Stress Level" fill="#9f4f39" radius={[4, 4, 0, 0]} barSize={10} />
              <Bar dataKey="sleep" name="Sleep (hrs)" fill="#2f5d50" radius={[4, 4, 0, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Screen Time Summary */}
      <div className="bg-white p-6 rounded-3xl border border-border-card shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-text-main font-semibold mb-1">Avg Screen Time</h3>
          <p className="text-sm text-text-muted">Last 7 days</p>
        </div>
        <div className="text-3xl font-bold text-[#2f5d50]">
          {chartData.length > 0 
            ? Math.round(chartData.reduce((acc, curr) => acc + curr.screenTime, 0) / chartData.length)
            : 0} hrs
        </div>
      </div>
    </motion.div>
  );
}
