import { motion } from 'framer-motion';
import { Thermometer, Zap, Activity, Gauge, TrendingUp, Radio } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import GlassCard from './ui/GlassCard';
import HealthScoreGauge from './dashboard/HealthScoreGauge';
import TemperatureChart from './dashboard/TemperatureChart';
import MotorCurrentChart from './dashboard/MotorCurrentChart';
import VibrationChart from './dashboard/VibrationChart';
import EventTimeline from './dashboard/EventTimeline';
import AlertCenter from './dashboard/AlertCenter';
import { useSimulatedData } from '../hooks/useSimulatedData';

function MetricCard({ icon: Icon, label, value, unit, color, trend }) {
  return (
    <div className="glass-light p-3 rounded-xl flex items-center gap-3">
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}10` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold font-mono text-white">{typeof value === 'number' ? value.toFixed(1) : value}</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
      </div>
      {trend && (
        <TrendingUp className={`w-3.5 h-3.5 ${trend === 'up' ? 'text-red-400' : 'text-emerald-400 rotate-180'}`} />
      )}
    </div>
  );
}

export default function LiveMonitoring() {
  const { data, history } = useSimulatedData();

  return (
    <section id="monitoring" className="relative py-24 px-4">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Live Monitoring"
          title="Maintelligence Dashboard"
          subtitle="Real-time equipment monitoring with AI-powered analytics. Data updates every 1.5 seconds from simulated IoT sensor feeds."
        />

        {/* Live indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
          <span className="text-xs font-mono text-emerald-400">LIVE DATA STREAM ACTIVE</span>
          <Radio className="w-3.5 h-3.5 text-emerald-400/50" />
        </motion.div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Row 1 — Health score + quick metrics */}
          <div className="lg:col-span-3">
            <GlassCard className="flex flex-col items-center justify-center h-full" glow>
              <HealthScoreGauge score={data.healthScore} />
            </GlassCard>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 gap-3">
            <MetricCard icon={Thermometer} label="Temperature" value={data.temperature} unit="°C" color="#f59e0b" trend={data.temperature > 65 ? 'up' : 'down'} />
            <MetricCard icon={Zap} label="Motor Current" value={data.motorCurrent} unit="A" color="#3b82f6" trend={data.motorCurrent > 10 ? 'up' : 'down'} />
            <MetricCard icon={Activity} label="Vibration" value={data.vibration} unit="mm/s" color="#8b5cf6" trend={data.vibration > 4 ? 'up' : 'down'} />
            <MetricCard icon={Gauge} label="Efficiency" value={data.efficiency} unit="%" color="#10b981" />
          </div>

          {/* Temperature chart */}
          <div className="lg:col-span-6">
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-300">Temperature Monitoring</span>
                </div>
                <span className="text-xs font-mono text-amber-400">{data.temperature.toFixed(1)}°C</span>
              </div>
              <div className="h-[200px]">
                <TemperatureChart data={history} />
              </div>
            </GlassCard>
          </div>

          {/* Row 2 — Motor current + Vibration + Events */}
          <div className="lg:col-span-4">
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-gray-300">Motor Current</span>
                </div>
                <span className="text-xs font-mono text-blue-400">{data.motorCurrent.toFixed(2)} A</span>
              </div>
              <div className="h-[200px]">
                <MotorCurrentChart data={history} />
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-4">
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-gray-300">Vibration Analysis</span>
                </div>
                <span className="text-xs font-mono text-purple-400">{data.vibration.toFixed(2)} mm/s</span>
              </div>
              <div className="h-[200px]">
                <VibrationChart data={history} />
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-4">
            <GlassCard className="h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.6)' }} />
                <span className="text-sm font-semibold text-gray-300">Event Timeline</span>
              </div>
              <EventTimeline />
            </GlassCard>
          </div>

          {/* Row 3 — Alert Center full width */}
          <div className="lg:col-span-12">
            <GlassCard>
              <AlertCenter />
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
