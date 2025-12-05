import { Link } from 'react-router';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  href: string;
  accentColor?: 'turquoise' | 'tulip' | 'canary' | 'aquamarine';
}

const colorStyles = {
  turquoise: {
    bg: 'from-turquoise to-aquamarine',
    shadow: 'shadow-[0_8px_24px_rgba(91,200,172,0.25)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(91,200,172,0.35)]',
  },
  tulip: {
    bg: 'from-tulip to-tulip-light',
    shadow: 'shadow-[0_8px_24px_rgba(241,141,158,0.25)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(241,141,158,0.35)]',
  },
  canary: {
    bg: 'from-canary to-canary-light',
    shadow: 'shadow-[0_8px_24px_rgba(230,215,42,0.25)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(230,215,42,0.35)]',
  },
  aquamarine: {
    bg: 'from-aquamarine to-aquamarine-light',
    shadow: 'shadow-[0_8px_24px_rgba(152,219,198,0.3)]',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(152,219,198,0.4)]',
  },
};

export function StatCard({ title, value, icon, href, accentColor = 'turquoise' }: StatCardProps) {
  const styles = colorStyles[accentColor];

  return (
    <Link
      to={href}
      className={`group block relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${styles.shadow} ${styles.hoverShadow}`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.bg}`} />

      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

      {/* Arrow - positioned absolutely at top right */}
      <div className="absolute top-5 right-5 z-20">
        <svg
          className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-3">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center text-white">
            {icon}
          </div>
        </div>

        {/* Value */}
        <div className="mb-1">
          <span className="text-3xl font-bold text-white">{value}</span>
        </div>

        {/* Title */}
        <p className="text-sm text-white/80 font-medium">
          {title}
        </p>
      </div>
    </Link>
  );
}
