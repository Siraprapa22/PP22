import { useState, useEffect, useCallback, useRef } from 'react';

// Simulate realistic sensor fluctuations
function addNoise(base, amplitude = 1) {
  return base + (Math.random() - 0.5) * amplitude;
}

// Smooth random walk for realistic sensor data
function randomWalk(current, target, speed = 0.05) {
  return current + (target - current) * speed + (Math.random() - 0.5) * 0.3;
}

export function useSimulatedData() {
  const [data, setData] = useState({
    temperature: 52.3,
    motorCurrent: 7.2,
    vibration: 1.8,
    healthScore: 86,
    predictionConfidence: 93.2,
    rul: 14,
    efficiency: 89.4,
    powerConsumption: 3.2,
    uptime: 99.7,
  });

  const [history, setHistory] = useState([]);
  const targetRef = useRef({
    temperature: 55,
    motorCurrent: 7.5,
    vibration: 2.0,
  });

  // Periodically shift target values to simulate changing conditions
  useEffect(() => {
    const targetInterval = setInterval(() => {
      targetRef.current = {
        temperature: 45 + Math.random() * 35,
        motorCurrent: 5 + Math.random() * 7,
        vibration: 0.5 + Math.random() * 5,
      };
    }, 10000);
    return () => clearInterval(targetInterval);
  }, []);

  const updateData = useCallback(() => {
    setData(prev => {
      const targets = targetRef.current;
      const newTemp = randomWalk(prev.temperature, targets.temperature, 0.08);
      const newCurrent = randomWalk(prev.motorCurrent, targets.motorCurrent, 0.06);
      const newVibration = randomWalk(prev.vibration, targets.vibration, 0.07);

      // Derive health score from sensor readings
      const tempPenalty = Math.max(0, (newTemp - 65) * 1.2);
      const vibPenalty = Math.max(0, (newVibration - 3) * 8);
      const currentPenalty = Math.max(0, (newCurrent - 10) * 5);
      const newHealth = Math.max(0, Math.min(100, 95 - tempPenalty - vibPenalty - currentPenalty + addNoise(0, 2)));

      return {
        temperature: Math.max(30, Math.min(100, newTemp)),
        motorCurrent: Math.max(1, Math.min(16, newCurrent)),
        vibration: Math.max(0.1, Math.min(10, newVibration)),
        healthScore: Math.round(newHealth),
        predictionConfidence: Math.max(60, Math.min(99, addNoise(prev.predictionConfidence, 1.5))),
        rul: Math.max(1, Math.round(addNoise(prev.rul, 0.3))),
        efficiency: Math.max(50, Math.min(100, addNoise(prev.efficiency, 1))),
        powerConsumption: Math.max(1, Math.min(8, addNoise(prev.powerConsumption, 0.2))),
        uptime: Math.max(95, Math.min(100, addNoise(prev.uptime, 0.05))),
      };
    });
  }, []);

  // Update history for charts
  useEffect(() => {
    const historyInterval = setInterval(() => {
      setHistory(prev => {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newPoint = { ...data, time: timeLabel };
        const updated = [...prev, newPoint];
        // Keep last 40 points
        return updated.slice(-40);
      });
    }, 2000);
    return () => clearInterval(historyInterval);
  }, [data]);

  // Main data update loop
  useEffect(() => {
    const interval = setInterval(updateData, 1500);
    return () => clearInterval(interval);
  }, [updateData]);

  return { data, history };
}

export function useScrollAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, [threshold]);

  return [ref, isVisible];
}

export function useAnimatedCounter(target, duration = 2000, isVisible = true) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, isVisible]);

  return count;
}
