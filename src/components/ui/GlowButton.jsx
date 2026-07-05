import { motion } from 'framer-motion';

export default function GlowButton({ children, variant = 'primary', size = 'md', onClick, className = '', href, ...props }) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]',
    secondary: 'bg-transparent border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/50',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        transition-all duration-300 ease-out
        cursor-pointer
        ${className}
      `}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </Component>
  );
}
