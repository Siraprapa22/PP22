import { motion } from 'framer-motion';
import { Target, TrendingDown, DollarSign, Zap, Cpu, Database } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import AnimatedCounter from './ui/AnimatedCounter';

const iconMap = {
  'target': Target,
  'trending-down': TrendingDown,
  'dollar-sign': DollarSign,
  'zap': Zap,
  'cpu': Cpu,
  'database': Database,
};

const results = [
  { label: 'Prediction Accuracy', value: 94.7, unit: '%', icon: 'target', color: '#3b82f6', decimals: 1 },
  { label: 'Downtime Reduction', value: 67, unit: '%', icon: 'trending-down', color: '#10b981', decimals: 0 },
  { label: 'Cost Savings', value: 42, unit: '%', icon: 'dollar-sign', color: '#f59e0b', decimals: 0 },
  { label: 'Mean Detection Time', value: 2.3, unit: 'sec', icon: 'zap', color: '#8b5cf6', decimals: 1 },
  { label: 'Equipment Monitored', value: 4, unit: 'units', icon: 'cpu', color: '#06b6d4', decimals: 0 },
  { label: 'Data Points Processed', value: 2.4, unit: 'M+', icon: 'database', color: '#ec4899', decimals: 1 },
];

export default function ProjectResults() {
  return (
    <section id="results" className="relative py-24 px-4">
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Project Results"
          title="Proven Performance"
          subtitle="Key performance indicators demonstrating the effectiveness of the Maintelligence AI predictive maintenance system."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {results.map((result, i) => {
            const Icon = iconMap[result.icon] || Target;

            return (
              <motion.div
                key={i}
                className="glass p-6 rounded-2xl text-center group hover-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${result.color}12` }}
                >
                  <Icon className="w-7 h-7" style={{ color: result.color }} />
                </div>
                <div className="text-3xl md:text-4xl font-black font-mono mb-1" style={{ color: result.color }}>
                  <AnimatedCounter value={result.value} decimals={result.decimals} suffix={result.unit} />
                </div>
                <p className="text-sm text-gray-400">{result.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison bar */}
        <motion.div
          className="mt-16 glass p-8 rounded-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-white mb-6 text-center">Before vs After Implementation</h3>
          <div className="space-y-5">
            {[
              { label: 'Unplanned Downtime', before: 85, after: 28, unit: 'hrs/month', color: '#ef4444', afterColor: '#10b981' },
              { label: 'Maintenance Cost', before: 75, after: 43, unit: '% of budget', color: '#f59e0b', afterColor: '#10b981' },
              { label: 'Equipment Availability', before: 72, after: 96, unit: '%', color: '#f59e0b', afterColor: '#3b82f6' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-300 font-medium">{item.label}</span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-gray-500">Before: <span className="text-red-400">{item.before}</span></span>
                    <span className="text-gray-500">After: <span className="text-emerald-400">{item.after}</span></span>
                  </div>
                </div>
                <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full opacity-30"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.before}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: item.afterColor }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.after}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15 + 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
