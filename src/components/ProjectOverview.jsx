import { motion } from 'framer-motion';
import { Brain, Activity, Shield, Cpu, BarChart3, Wifi, Zap, Clock } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import GlassCard from './ui/GlassCard';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Continuous monitoring of equipment parameters including temperature, vibration, and motor current with sub-second update rates.',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    icon: Brain,
    title: 'AI Anomaly Detection',
    description: 'LSTM neural networks and ensemble methods detect subtle anomaly patterns invisible to traditional threshold-based systems.',
    color: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.15)',
  },
  {
    icon: Shield,
    title: 'Predictive Maintenance',
    description: 'Forecast equipment failures days in advance with 94.7% accuracy, enabling proactive maintenance scheduling.',
    color: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    icon: Cpu,
    title: 'Edge Computing',
    description: 'ESP32-based edge processing enables real-time sensor data acquisition with local preprocessing before cloud transmission.',
    color: 'text-purple-400',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: BarChart3,
    title: 'Health Analytics',
    description: 'Comprehensive equipment health scoring combining multiple sensor inputs through weighted AI models.',
    color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    icon: Clock,
    title: 'RUL Estimation',
    description: 'Remaining Useful Life prediction using degradation modeling to optimize maintenance timing and reduce costs.',
    color: 'text-pink-400',
    glow: 'rgba(236,72,153,0.15)',
  },
];

export default function ProjectOverview() {
  return (
    <section id="overview" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          accent="Project Overview"
          title="Intelligent Maintenance Platform"
          subtitle="A comprehensive AI-powered system that transforms raw sensor data into actionable maintenance insights, preventing costly equipment failures before they occur."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="group relative overflow-hidden"
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Subtle gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${feature.glow}, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
