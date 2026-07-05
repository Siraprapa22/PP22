import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-3 py-2 text-sm">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-mono font-semibold" style={{ color: payload[0].color }}>
        {payload[0].value?.toFixed(2)} A
      </p>
    </div>
  );
};

export default function MotorCurrentChart({ data = [], warningThreshold = 12, criticalThreshold = 14 }) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
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
            domain={[0, 16]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={warningThreshold} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.5} />
          <ReferenceLine y={criticalThreshold} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Line
            type="monotone"
            dataKey="motorCurrent"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3b82f6', stroke: '#0a0e1a', strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
