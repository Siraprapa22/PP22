import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, ChevronRight, DollarSign, Clock } from 'lucide-react';

export default function MaintenanceCard({ recommendation, index = 0 }) {
  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/8',
      border: 'border-red-500/20',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.1)]',
      badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/8',
      border: 'border-amber-500/20',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]',
      badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    },
    info: {
      icon: Info,
      color: 'text-blue-400',
      bg: 'bg-blue-500/8',
      border: 'border-blue-500/20',
      glow: '',
      badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
  };

  const config = severityConfig[recommendation.severity] || severityConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      className={`glass ${config.glow} border ${config.border} overflow-hidden`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-white/5 ${config.bg}`}>
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${config.color}`} />
          <div>
            <h4 className="font-semibold text-white text-sm">{recommendation.title}</h4>
            <p className="text-xs text-gray-500">{recommendation.equipment}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${config.badge}`}>
          {recommendation.severity.toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-400 leading-relaxed">{recommendation.description}</p>

        {/* Metrics row */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="font-mono font-semibold">{recommendation.confidence}%</span>
            <span className="text-gray-500">Confidence</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-gray-400">RUL: <span className="font-mono text-white">{recommendation.rul} days</span></span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3 h-3 text-gray-500" />
            <span className="text-gray-400">{recommendation.estimatedCost}</span>
          </div>
        </div>

        {/* Action items */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Recommended Actions</p>
          {recommendation.actions.map((action, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <ChevronRight className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>{action}</span>
            </div>
          ))}
        </div>

        {/* Footer metrics */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-xs text-gray-500">
          <span>Est. Downtime: <span className="text-gray-300">{recommendation.estimatedDowntime}</span></span>
        </div>
      </div>
    </motion.div>
  );
}
