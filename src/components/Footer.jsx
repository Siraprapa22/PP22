import { Brain, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-sm font-bold text-white">Maintelligence AI</span>
              <span className="text-[9px] text-gray-600 ml-2 tracking-wider">v1.0</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#overview" className="hover:text-gray-300 transition-colors">Overview</a>
            <a href="#monitoring" className="hover:text-gray-300 transition-colors">Dashboard</a>
            <a href="#analysis" className="hover:text-gray-300 transition-colors">AI Analysis</a>
            <a href="#results" className="hover:text-gray-300 transition-colors">Results</a>
            <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>

          {/* Credit */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500/60" fill="currentColor" />
            <span>by an EE Student</span>
          </div>
        </div>

        <div className="section-divider mt-8 mb-6" />

        <p className="text-center text-[11px] text-gray-700">
          © {new Date().getFullYear()} Maintelligence AI — Predictive Maintenance Platform. 
          All rights reserved. Developed for academic demonstration purposes.
        </p>
      </div>
    </footer>
  );
}
