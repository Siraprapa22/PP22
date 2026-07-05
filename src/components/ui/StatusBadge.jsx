export default function StatusBadge({ status, size = 'md', showDot = true }) {
  const config = {
    operational: { label: 'Operational', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'status-dot-operational' },
    warning: { label: 'Warning', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'status-dot-warning' },
    critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', dot: 'status-dot-critical' },
    info: { label: 'Info', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'status-dot-operational' },
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const c = config[status] || config.info;

  return (
    <span className={`inline-flex items-center gap-2 ${sizeClasses[size]} ${c.color} ${c.bg} border ${c.border} rounded-full font-medium`}>
      {showDot && <span className={c.dot} />}
      {c.label}
    </span>
  );
}
