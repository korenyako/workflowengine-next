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
        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-3 text-left text-sm font-semibold text-white">
                Prop
              </th>
              <th className="border border-gray-600 px-4 py-3 text-left text-sm font-semibold text-white">
                Type
              </th>
              <th className="border border-gray-600 px-4 py-3 text-left text-sm font-semibold text-white">
                Default
              </th>
              <th className="border border-gray-600 px-4 py-3 text-left text-sm font-semibold text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-800/50">
                <td className="border border-gray-600 px-4 py-3 text-sm text-blue-300 font-mono">
                  {row.prop}
                </td>
                <td className="border border-gray-600 px-4 py-3 text-sm text-gray-300 font-mono">
                  {row.type}
                </td>
                <td className="border border-gray-600 px-4 py-3 text-sm text-gray-400 font-mono">
                  {row.default ?? '-'}
                </td>
                <td className="border border-gray-600 px-4 py-3 text-sm text-gray-300">
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
