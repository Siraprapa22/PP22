import { motion } from 'framer-motion';
import { AlertTriangle, Brain, Radio, Wrench, Server } from 'lucide-react';
import { eventTimeline } from '../../data/mockData';

const typeConfig = {
  anomaly: { icon: AlertTriangle, color: 'text-red-400', dot: 'bg-red-400', glow: 'shadow-[0_0_6px_rgba(239,68,68,0.4)]' },
  prediction: { icon: Brain, color: 'text-cyan-400', dot: 'bg-cyan-400', glow: 'shadow-[0_0_6px_rgba(6,182,212,0.4)]' },
  sensor: { icon: Radio, color: 'text-blue-400', dot: 'bg-blue-400', glow: 'shadow-[0_0_6px_rgba(59,130,246,0.4)]' },
  maintenance: { icon: Wrench, color: 'text-amber-400', dot: 'bg-amber-400', glow: 'shadow-[0_0_6px_rgba(245,158,11,0.4)]' },
  system: { icon: Server, color: 'text-emerald-400', dot: 'bg-emerald-400', glow: 'shadow-[0_0_6px_rgba(16,185,129,0.4)]' },
};

export default function EventTimeline() {
  return (
    <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {eventTimeline.map((event, index) => {
        const config = typeConfig[event.type] || typeConfig.system;
        const Icon = config.icon;

        return (
          <motion.div
            key={event.id}
            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors group"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center mt-1 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${config.dot} ${config.glow}`} />
              {index < eventTimeline.length - 1 && (
                <div className="w-px h-full min-h-[30px] bg-white/5 mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <Icon className={`w-3.5 h-3.5 ${config.color} flex-shrink-0`} />
                <span className="text-[10px] font-mono text-gray-500">{event.time}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{event.message}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
