import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { generateHistoricalData } from '../../data/mockData';
import { useMemo } from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-3 py-2 text-xs">
      <p className="text-gray-400 mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono" style={{ color: p.color }}>
          {p.name}: {p.value?.toFixed(1)}
        </p>
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-4 mt-2">
    {payload?.map((entry, i) => (
      <div key={i} className="flex items-center gap-1.5 text-xs">
        <div className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="text-gray-400">{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function PerformanceTrends() {
  const data = useMemo(() => generateHistoricalData(24, 30), []);

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
          <XAxis
            dataKey="time"
            tick={{ fill: '#64748b', fontSize: 9 }}
            axisLine={{ stroke: 'rgba(59,130,246,0.1)' }}
            tickLine={false}
            interval={7}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 9 }}
            axisLine={{ stroke: 'rgba(59,130,246,0.1)' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Line type="monotone" dataKey="healthScore" name="Health Score" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="efficiency" name="Efficiency" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="temperature" name="Temperature" stroke="#f59e0b" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
