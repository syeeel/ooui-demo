import { Link } from 'react-router';
import { BackIcon, PlusIcon } from './Icons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  createLink?: string;
  createLabel?: string;
  backLink?: string;
}

export function PageHeader({
  title,
  subtitle,
  createLink,
  createLabel = '新規作成',
  backLink,
}: PageHeaderProps) {
  return (
    <div className="mb-8 animate-fade-in-up">
      {backLink && (
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 text-sm text-stone hover:text-turquoise mb-4 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-aquamarine-lighter group-hover:bg-aquamarine/20 flex items-center justify-center transition-colors">
            <BackIcon className="w-4 h-4 text-turquoise group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>戻る</span>
        </Link>
      )}
      <div className="flex justify-between items-end">
        <div>
          {/* Decorative line */}
          <div className="w-10 h-1 bg-gradient-to-r from-turquoise to-aquamarine rounded-full mb-3" />

          <h1 className="text-3xl font-bold text-gradient-school">
            {title}
          </h1>
          {subtitle && (
            <p className="text-stone mt-1">{subtitle}</p>
          )}
        </div>

        {createLink && (
          <Link
            to={createLink}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-turquoise rounded-xl hover:-translate-y-0.5 transition-all shadow-soft hover:shadow-soft-lg hover:bg-turquoise/5"
          >
            <PlusIcon className="w-4 h-4 text-turquoise" />
            <span className="font-semibold text-turquoise">{createLabel}</span>
          </Link>
        )}
      </div>

      {/* Divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-aquamarine/40 via-aquamarine/20 to-transparent" />
    </div>
  );
}
