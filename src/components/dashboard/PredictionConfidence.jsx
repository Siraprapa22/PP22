import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PredictionConfidence({ confidence = 93.2, size = 160 }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(confidence), 300);
    return () => clearTimeout(timer);
  }, [confidence]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            className="gauge-bg" strokeWidth="6"
          />
          {/* Secondary decorative ring */}
          <circle
            cx={size / 2} cy={size / 2} r={radius - 12}
            className="gauge-bg" strokeWidth="2"
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke="#06b6d4"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold font-mono text-cyan-400"
            key={Math.round(confidence)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {confidence.toFixed(1)}%
          </motion.span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Confidence</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.6)' }} />
        <span className="text-xs text-gray-400">AI Model Active</span>
      </div>
    </div>
  );
}
