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
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow border border-gray-100">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="space-y-2">
        {properties.map((prop) => (
          <div key={prop.label} className="flex justify-between text-sm">
            <span className="text-gray-500">{prop.label}</span>
            <span className="text-gray-900 font-medium">{prop.value}</span>
          </div>
        ))}
      </div>
      {(onPrint || onDelete) && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
          {onPrint && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrint();
              }}
              className="flex-1 text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
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
              className="flex-1 text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
            >
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
