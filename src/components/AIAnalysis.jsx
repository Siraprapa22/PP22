import { motion } from 'framer-motion';
import { Brain, Scan, TrendingUp, BarChart3 } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import GlassCard from './ui/GlassCard';
import PredictionConfidence from './dashboard/PredictionConfidence';
import RULIndicator from './dashboard/RULIndicator';
import PerformanceTrends from './dashboard/PerformanceTrends';
import { useSimulatedData } from '../hooks/useSimulatedData';

const analysisFeatures = [
  {
    icon: Scan,
    title: 'Pattern Recognition',
    description: 'LSTM autoencoder identifies subtle degradation patterns from multi-dimensional sensor data, detecting anomalies 3-5 days before conventional systems.',
    metric: '94.7%',
    metricLabel: 'Detection Rate',
  },
  {
    icon: TrendingUp,
    title: 'Trend Extrapolation',
    description: 'Polynomial regression with Bayesian uncertainty estimation projects equipment health trajectories for accurate remaining useful life calculation.',
    metric: '±2.3',
    metricLabel: 'Days Accuracy',
  },
  {
    icon: BarChart3,
    title: 'Multi-variate Analysis',
    description: 'Correlation analysis across temperature, vibration, and current domains reveals cross-sensor degradation signatures invisible to single-parameter monitoring.',
    metric: '12ms',
    metricLabel: 'Inference Time',
  },
];

export default function AIAnalysis() {
  const { data } = useSimulatedData();

  return (
    <section id="analysis" className="relative py-24 px-4">
      <div className="absolute inset-0 dot-bg opacity-20" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="AI Analysis"
          title="Intelligent Anomaly Detection"
          subtitle="Deep learning models continuously analyze multi-dimensional sensor data to detect, classify, and predict equipment failures with high confidence."
        />

        {/* AI Gauges Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <GlassCard className="flex flex-col items-center justify-center" glow>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-gray-300">AI Prediction Confidence</span>
            </div>
            <PredictionConfidence confidence={data.predictionConfidence} />
          </GlassCard>

          <GlassCard className="flex flex-col items-center justify-center" glow>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-gray-300">Remaining Useful Life</span>
            </div>
            <RULIndicator days={data.rul} />
          </GlassCard>

          <GlassCard className="flex flex-col items-center justify-center md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-gray-300">Performance Trends (24h)</span>
            </div>
            <div className="w-full h-[200px]">
              <PerformanceTrends />
            </div>
          </GlassCard>
        </div>

        {/* Analysis Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysisFeatures.map((feature, i) => (
            <GlassCard key={i} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/8 border border-cyan-500/15">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold font-mono gradient-text-blue">{feature.metric}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{feature.metricLabel}</p>
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
