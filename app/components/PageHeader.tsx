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
    <div className="mb-8">
      {backLink && (
        <Link
          to={backLink}
          className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 mb-3 group"
        >
          <BackIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>戻る</span>
        </Link>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>
          )}
        </div>
        {createLink && (
          <Link
            to={createLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full hover:from-primary-500 hover:to-primary-600 transition-all shadow-md hover:shadow-lg text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            {createLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
