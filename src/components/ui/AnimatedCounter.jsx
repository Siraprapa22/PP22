import { useAnimatedCounter, useScrollAnimation } from '../../hooks/useSimulatedData';

export default function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useAnimatedCounter(value, 2000, isVisible);

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
    </span>
  );
}
