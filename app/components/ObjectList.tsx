import { Link } from 'react-router';
import { PrintIcon, DeleteIcon, ViewIcon } from './Icons';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface ObjectListProps<T extends { id: string }> {
  items: T[];
  columns: Column<T>[];
  detailPath?: string;
  onPrint?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function ObjectList<T extends { id: string }>({
  items,
  columns,
  detailPath,
  onPrint,
  onDelete,
}: ObjectListProps<T>) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gradient-to-r from-primary-50 to-primary-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {(onPrint || onDelete || detailPath) && (
              <th className="px-6 py-4 text-center text-xs font-semibold text-primary-700 uppercase tracking-wider">
                アクション
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {items.map((item, rowIdx) => (
            <tr
              key={item.id}
              className={`hover:bg-primary-50/50 transition-colors ${rowIdx % 2 === 1 ? 'bg-gray-50/50' : ''}`}
            >
              {columns.map((col, idx) => {
                const value = col.render
                  ? col.render(item)
                  : String(item[col.key as keyof T] ?? '');
                const cell = (
                  <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {value}
                  </td>
                );

                if (idx === 0 && detailPath) {
                  return (
                    <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`${detailPath}/${item.id}`}
                        className="text-primary-600 hover:text-primary-800 font-semibold hover:underline"
                      >
                        {value}
                      </Link>
                    </td>
                  );
                }
                return cell;
              })}
              {(onPrint || onDelete || detailPath) && (
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-1">
                    {detailPath && (
                      <Link
                        to={`${detailPath}/${item.id}`}
                        className="p-2 text-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded-lg transition-all"
                        title="詳細"
                      >
                        <ViewIcon className="w-4 h-4" />
                      </Link>
                    )}
                    {onPrint && (
                      <button
                        onClick={() => onPrint(item)}
                        className="p-2 text-[#E6D72A] hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"
                        title="印刷"
                      >
                        <PrintIcon className="w-4 h-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 text-[#F18D9E] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="削除"
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
