import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectOverview from './components/ProjectOverview';
import SystemArchitecture from './components/SystemArchitecture';
import LiveMonitoring from './components/LiveMonitoring';
import AIAnalysis from './components/AIAnalysis';
import PredictiveMaintenance from './components/PredictiveMaintenance';
import TechStack from './components/TechStack';
import ProjectResults from './components/ProjectResults';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-gray-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <ProjectOverview />
        <div className="section-divider" />
        <SystemArchitecture />
        <div className="section-divider" />
        <LiveMonitoring />
        <div className="section-divider" />
        <AIAnalysis />
        <div className="section-divider" />
        <PredictiveMaintenance />
        <div className="section-divider" />
        <TechStack />
        <div className="section-divider" />
        <ProjectResults />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
