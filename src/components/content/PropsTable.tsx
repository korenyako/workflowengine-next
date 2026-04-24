import React from 'react';

interface PropsTableRow {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  rows: PropsTableRow[];
  className?: string;
}

/**
 * Контентный компонент для таблицы пропсов
 * Использует стили из globals.css для article-content
 */
export const PropsTable: React.FC<PropsTableProps> = ({ rows, className = '' }) => {
  return (
    <div className={`article-content ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-600">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-gray-600 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Prop
              </th>
              <th className="border-2 border-gray-600 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Type
              </th>
              <th className="border-2 border-gray-600 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Default
              </th>
              <th className="border-2 border-gray-600 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-slate-100">
                <td className="border-2 border-gray-600 px-4 py-3 text-sm text-blue-600 font-mono">
                  {row.prop}
                </td>
                <td className="border-2 border-gray-600 px-4 py-3 text-sm text-slate-600 font-mono">
                  {row.type}
                </td>
                <td className="border-2 border-gray-600 px-4 py-3 text-sm text-slate-500 font-mono">
                  {row.default ?? '-'}
                </td>
                <td className="border-2 border-gray-600 px-4 py-3 text-sm text-slate-600">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
