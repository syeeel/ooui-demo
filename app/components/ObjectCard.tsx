import { Link } from 'react-router';

interface ObjectCardProps {
  title: string;
  subtitle?: string;
  properties: { label: string; value: string | number }[];
  detailLink?: string;
  onPrint?: () => void;
  onDelete?: () => void;
}

export function ObjectCard({
  title,
  subtitle,
  properties,
  detailLink,
  onPrint,
  onDelete,
}: ObjectCardProps) {
  const content = (
    <div className="group card p-5 hover:border-turquoise/30">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink group-hover:text-turquoise-dark transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-stone mt-0.5">{subtitle}</p>
            )}
          </div>

          {detailLink && (
            <div className="w-8 h-8 rounded-lg bg-aquamarine-lighter flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Properties */}
      <div className="space-y-2.5">
        {properties.map((prop) => (
          <div
            key={prop.label}
            className="flex justify-between items-center text-sm py-2 border-b border-aquamarine/10 last:border-0"
          >
            <span className="text-stone">{prop.label}</span>
            <span className="text-ink font-medium">{prop.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {(onPrint || onDelete) && (
        <div className="mt-4 pt-3 border-t border-aquamarine/10 flex gap-2">
          {onPrint && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrint();
              }}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-canary-lighter text-canary-dark hover:bg-canary/20 border border-canary/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              印刷
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-tulip-lighter text-tulip-dark hover:bg-tulip/20 border border-tulip/20 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              削除
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (detailLink) {
    return <Link to={detailLink} className="block">{content}</Link>;
  }

  return content;
}
