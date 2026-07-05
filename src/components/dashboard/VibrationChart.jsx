import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-3 py-2 text-sm">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-mono font-semibold" style={{ color: payload[0].color }}>
        {payload[0].value?.toFixed(2)} mm/s
      </p>
    </div>
  );
};

export default function VibrationChart({ data = [], warningThreshold = 5.0, criticalThreshold = 7.0 }) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="vibGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
          <XAxis
            dataKey="time"
            tick={{ fill: '#64748b', fontSize: 10 }}
            axisLine={{ stroke: 'rgba(59,130,246,0.1)' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 10 }}
            axisLine={{ stroke: 'rgba(59,130,246,0.1)' }}
            tickLine={false}
            domain={[0, 10]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={warningThreshold} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.5} />
          <ReferenceLine y={criticalThreshold} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Area
            type="monotone"
            dataKey="vibration"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#vibGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#8b5cf6', stroke: '#0a0e1a', strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
