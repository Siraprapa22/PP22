import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

export default function RULIndicator({ days = 14, maxDays = 90, size = 160 }) {
  const percentage = Math.min(100, (days / maxDays) * 100);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (days > 30) return { color: '#10b981', glow: 'rgba(16,185,129,0.4)', label: 'Healthy' };
    if (days > 14) return { color: '#f59e0b', glow: 'rgba(245,158,11,0.4)', label: 'Monitor' };
    return { color: '#ef4444', glow: 'rgba(239,68,68,0.4)', label: 'Urgent' };
  };

  const info = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} className="gauge-bg" strokeWidth="6" />
          <motion.circle
            cx={size/2} cy={size/2} r={radius}
            stroke={info.color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${info.glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold font-mono"
            style={{ color: info.color }}
            key={days}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {days}
          </motion.span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Days Left</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {days <= 14 ? (
          <AlertTriangle className="w-3.5 h-3.5" style={{ color: info.color }} />
        ) : (
          <Clock className="w-3.5 h-3.5" style={{ color: info.color }} />
        )}
        <span className="text-xs font-medium" style={{ color: info.color }}>{info.label}</span>
      </div>
    </div>
  );
}
