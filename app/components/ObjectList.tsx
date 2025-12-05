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
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-aquamarine-lighter to-turquoise/10 border-b border-aquamarine/20">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-6 py-4 text-left text-xs font-bold text-turquoise-dark uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {(onPrint || onDelete || detailPath) && (
                <th className="px-6 py-4 text-center text-xs font-bold text-turquoise-dark uppercase tracking-wider">
                  アクション
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-aquamarine/10">
            {items.map((item, rowIdx) => (
              <tr
                key={item.id}
                className={`group hover:bg-aquamarine-lighter/50 transition-colors ${rowIdx % 2 === 1 ? 'bg-aquamarine-lighter/20' : ''}`}
              >
                {columns.map((col, idx) => {
                  const value = col.render
                    ? col.render(item)
                    : String(item[col.key as keyof T] ?? '');
                  const cell = (
                    <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                      {value}
                    </td>
                  );

                  if (idx === 0 && detailPath) {
                    return (
                      <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`${detailPath}/${item.id}`}
                          className="font-semibold text-turquoise-dark hover:text-turquoise transition-colors"
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
                    <div className="flex items-center justify-center gap-2">
                      {detailPath && (
                        <Link
                          to={`${detailPath}/${item.id}`}
                          className="p-2 rounded-lg bg-turquoise/10 text-turquoise hover:bg-turquoise/20 transition-colors"
                          title="詳細"
                        >
                          <ViewIcon className="w-4 h-4" />
                        </Link>
                      )}
                      {onPrint && (
                        <button
                          onClick={() => onPrint(item)}
                          className="p-2 rounded-lg bg-canary/15 text-canary-dark hover:bg-canary/25 transition-colors"
                          title="印刷"
                        >
                          <PrintIcon className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 rounded-lg bg-tulip/10 text-tulip hover:bg-tulip/20 transition-colors"
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
    </div>
  );
}
