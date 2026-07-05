import { motion } from 'framer-motion';
import { Brain, Activity, Shield, ChevronRight, Cpu, Gauge } from 'lucide-react';
import GlowButton from './ui/GlowButton';

const floatingIcons = [
  { Icon: Cpu, x: '10%', y: '20%', delay: 0 },
  { Icon: Activity, x: '85%', y: '15%', delay: 1 },
  { Icon: Shield, x: '75%', y: '75%', delay: 2 },
  { Icon: Gauge, x: '15%', y: '70%', delay: 1.5 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div className="hero-grid" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px]" />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.06]"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="w-12 h-12 text-blue-400" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
          <span className="text-xs font-medium text-gray-300">AI-Powered Predictive Maintenance Platform</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white">Maintelligence</span>
          <br />
          <span className="gradient-text">AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Intelligent Industrial Equipment Monitoring & Predictive Maintenance 
          powered by Machine Learning and Real-Time IoT Sensor Analytics
        </motion.p>

        {/* Developer credit */}
        <motion.p
          className="text-sm text-gray-500 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          Developed by an <span className="text-blue-400">Electrical Engineering</span> Student
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <GlowButton href="#monitoring" size="lg">
            <Activity className="w-5 h-5" />
            View Live Dashboard
          </GlowButton>
          <GlowButton href="#overview" variant="secondary" size="lg">
            Learn More
            <ChevronRight className="w-4 h-4" />
          </GlowButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { value: '94.7%', label: 'Prediction Accuracy' },
            { value: '< 3s', label: 'Detection Time' },
            { value: '24/7', label: 'Real-time Monitoring' },
            { value: '67%', label: 'Downtime Reduction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-mono gradient-text-blue">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-blue-500/30 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-blue-400/60" />
        </div>
      </motion.div>
    </section>
  );
}
