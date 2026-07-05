import { motion } from 'framer-motion';
import { Radio, Server, Brain, MonitorDot, Database, Wifi } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const nodes = [
  { id: 0, icon: Radio, label: 'IoT Sensors', sub: 'ESP32 · ACS712 · DS18B20 · ADXL345', color: '#10b981' },
  { id: 1, icon: Wifi, label: 'Edge Gateway', sub: 'MQTT · Pre-processing', color: '#f59e0b' },
  { id: 2, icon: Database, label: 'Data Pipeline', sub: 'InfluxDB · Stream Processing', color: '#3b82f6' },
  { id: 3, icon: Brain, label: 'AI Engine', sub: 'TensorFlow · Scikit-learn · LSTM', color: '#8b5cf6' },
  { id: 4, icon: Server, label: 'API Layer', sub: 'FastAPI · WebSocket', color: '#06b6d4' },
  { id: 5, icon: MonitorDot, label: 'Dashboard', sub: 'React · Real-time Visualization', color: '#3b82f6' },
];

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="relative py-24 px-4">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="System Design"
          title="System Architecture"
          subtitle="End-to-end data pipeline from IoT sensor acquisition through AI inference to real-time dashboard visualization."
        />

        {/* Architecture flow - horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop layout */}
          <div className="hidden lg:flex items-center justify-between gap-4 max-w-6xl mx-auto">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex items-center gap-4">
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  {/* Node */}
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl glass flex items-center justify-center mb-3 group cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    style={{
                      boxShadow: `0 0 20px ${node.color}15, 0 0 40px ${node.color}08`,
                      borderColor: `${node.color}25`,
                    }}
                  >
                    <node.icon className="w-8 h-8" style={{ color: node.color }} />
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: `0 0 30px ${node.color}30, inset 0 0 20px ${node.color}08` }}
                    />
                  </motion.div>
                  <p className="text-sm font-semibold text-white">{node.label}</p>
                  <p className="text-[10px] text-gray-500 max-w-[120px] mt-0.5">{node.sub}</p>
                </motion.div>

                {/* Arrow connector */}
                {i < nodes.length - 1 && (
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                  >
                    <svg width="40" height="20" viewBox="0 0 40 20" className="mb-8">
                      <defs>
                        <linearGradient id={`arrow-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={node.color} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={nodes[i + 1].color} stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="10" x2="30" y2="10" stroke={`url(#arrow-grad-${i})`} strokeWidth="2" strokeDasharray="4 3" />
                      <polygon points="30,5 40,10 30,15" fill={nodes[i + 1].color} opacity="0.4" />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile layout - vertical */}
          <div className="lg:hidden flex flex-col items-center gap-2 max-w-sm mx-auto">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex flex-col items-center">
                <motion.div
                  className="flex items-center gap-4 w-full glass p-4 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ borderColor: `${node.color}20` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${node.color}10` }}
                  >
                    <node.icon className="w-6 h-6" style={{ color: node.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{node.label}</p>
                    <p className="text-xs text-gray-500">{node.sub}</p>
                  </div>
                </motion.div>
                {i < nodes.length - 1 && (
                  <div className="w-px h-6 bg-gradient-to-b" style={{ backgroundImage: `linear-gradient(${node.color}30, ${nodes[i+1].color}30)` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data flow description */}
        <motion.div
          className="mt-16 glass p-6 rounded-2xl max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-white font-semibold">Data Flow:</span> IoT sensors sample at 1kHz → Edge gateway pre-processes and publishes via MQTT → 
            InfluxDB stores time-series data → AI engine runs LSTM inference every 5 seconds → 
            FastAPI serves predictions via WebSocket → Maintelligence Dashboard renders real-time visualizations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
