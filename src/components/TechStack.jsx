import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle';
import GlassCard from './ui/GlassCard';
import { techStackData } from '../data/mockData';
import { Cpu, Code2, Layers } from 'lucide-react';

const categoryIcons = {
  'Hardware': Cpu,
  'Software & AI': Code2,
  'Platform': Layers,
};

const categoryColors = {
  'Hardware': '#10b981',
  'Software & AI': '#8b5cf6',
  'Platform': '#3b82f6',
};

export default function TechStack() {
  return (
    <section id="tech" className="relative py-24 px-4">
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Technology Stack"
          title="Built with Modern Technologies"
          subtitle="A carefully selected technology stack combining embedded systems, machine learning, and modern web technologies."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techStackData.map((category, catIndex) => {
            const Icon = categoryIcons[category.category] || Cpu;
            const color = categoryColors[category.category] || '#3b82f6';

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                </div>

                {/* Tech items */}
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <GlassCard
                      key={i}
                      className="!p-4 group"
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + i * 0.06 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.detail}</p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
