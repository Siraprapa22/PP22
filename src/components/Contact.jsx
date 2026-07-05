import { motion } from 'framer-motion';
import { Mail, ExternalLink, Globe, Send, User, MessageSquare } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import GlowButton from './ui/GlowButton';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          accent="Get in Touch"
          title="Contact"
          subtitle="Interested in this project or have questions about the implementation? Feel free to reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Let's Connect</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                This project was developed as part of my Electrical Engineering studies, 
                demonstrating the application of AI and IoT technologies in industrial maintenance. 
                I'm open to collaboration, feedback, and opportunities.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'student@university.edu', href: 'mailto:student@university.edu' },
                { icon: ExternalLink, label: 'GitHub', value: 'github.com/maintelligence', href: '#' },
                { icon: Globe, label: 'LinkedIn', value: 'linkedin.com/in/student', href: '#' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-4 glass-light rounded-xl hover:bg-white/[0.04] transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/15">
                    <item.icon className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass p-6 rounded-2xl space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <User className="w-3.5 h-3.5 text-gray-500" />
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                placeholder="Tell me about your inquiry..."
              />
            </div>

            {submitted ? (
              <motion.div
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✓ Message sent successfully!
              </motion.div>
            ) : (
              <GlowButton type="submit" className="w-full">
                <Send className="w-4 h-4" />
                Send Message
              </GlowButton>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
