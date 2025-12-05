import { Link } from 'react-router';
import { ChevronRightIcon } from './Icons';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  href: string;
}

export function StatCard({ title, value, icon, href }: StatCardProps) {
  return (
    <Link
      to={href}
      className="bg-gradient-to-br from-primary-400 to-primary-500 text-white rounded-2xl p-5 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-4 group"
    >
      <div className="bg-white/20 p-3 rounded-xl">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <ChevronRightIcon className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
