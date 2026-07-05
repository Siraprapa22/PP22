import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HealthScoreGauge({ score = 86, size = 180 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 80) return { stroke: '#10b981', glow: 'rgba(16,185,129,0.4)', label: 'Good' };
    if (s >= 60) return { stroke: '#f59e0b', glow: 'rgba(245,158,11,0.4)', label: 'Fair' };
    return { stroke: '#ef4444', glow: 'rgba(239,68,68,0.4)', label: 'Poor' };
  };

  const colorInfo = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            className="gauge-bg"
            strokeWidth="8"
          />
          {/* Animated progress ring */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke={colorInfo.stroke}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${colorInfo.glow})` }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold font-mono"
            style={{ color: colorInfo.stroke }}
            key={score}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">/ 100</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="text-sm font-semibold" style={{ color: colorInfo.stroke }}>{colorInfo.label}</p>
        <p className="text-xs text-gray-500">Equipment Health</p>
      </div>
    </div>
  );
}
