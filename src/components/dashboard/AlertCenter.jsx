import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Flame, Activity, Clock, Zap, Brain, Bell, X } from 'lucide-react';
import { alerts } from '../../data/mockData';
import { useState } from 'react';

const iconMap = {
  'flame': Flame,
  'activity': Activity,
  'clock': Clock,
  'zap': Zap,
  'brain': Brain,
  'alert-triangle': AlertTriangle,
};

const typeStyles = {
  critical: {
    bg: 'bg-red-500/8',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
    dotClass: 'bg-red-400 animate-blink',
  },
  warning: {
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
    dotClass: 'bg-amber-400',
  },
  info: {
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    dotClass: 'bg-blue-400',
  },
};

export default function AlertCenter() {
  const [dismissed, setDismissed] = useState(new Set());

  const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));

  const dismiss = (id) => {
    setDismissed(prev => new Set([...prev, id]));
  };

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-gray-300">Active Alerts</span>
        </div>
        <span className="text-xs text-gray-500 font-mono">{visibleAlerts.length} alerts</span>
      </div>

      <AnimatePresence>
        {visibleAlerts.map((alert, index) => {
          const style = typeStyles[alert.type] || typeStyles.info;
          const Icon = iconMap[alert.icon] || AlertTriangle;

          return (
            <motion.div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-xl border ${style.bg} ${style.border} group`}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`w-4 h-4 ${style.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dotClass}`} />
                  <span className="text-xs font-semibold text-gray-200">{alert.equipment}</span>
                  <span className="text-[10px] text-gray-600 ml-auto">{alert.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{alert.message}</p>
              </div>
              <button
                onClick={() => dismiss(alert.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/5 rounded"
              >
                <X className="w-3 h-3 text-gray-600" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
