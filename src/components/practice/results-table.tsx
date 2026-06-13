'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ResultsTableProps {
  rows: Record<string, unknown>[];
  fields: string[];
  loading?: boolean;
  error?: string | null;
  executionTime?: number;
  className?: string;
}

export function ResultsTable({
  rows,
  fields,
  loading = false,
  error = null,
  executionTime,
  className,
}: ResultsTableProps) {
  if (loading) {
    return (
      <div
        className={cn(
          'flex h-48 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900',
          className
        )}
      >
        <div className="text-sm text-zinc-400">Executing query...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          'rounded-lg border border-red-800 bg-red-950/50 p-4 text-sm text-red-400',
          className
        )}
      >
        <div className="font-medium">Error</div>
        <div className="mt-1 font-mono text-xs">{error}</div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div
        className={cn(
          'flex h-48 flex-col items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900',
          className
        )}
      >
        <div className="text-sm text-zinc-400">No results returned</div>
        {executionTime !== undefined && (
          <div className="mt-2 text-xs text-zinc-500">Executed in {executionTime}ms</div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-zinc-700', className)}>
      <div className="max-h-80 overflow-auto">
        <table className="w-full border-collapse bg-zinc-900 font-mono text-sm">
          <thead className="sticky top-0 bg-zinc-800">
            <tr>
              {fields.map((field) => (
                <th
                  key={field}
                  className="border-b border-zinc-700 px-4 py-2 text-left font-medium text-zinc-300"
                >
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-zinc-800/50">
                {fields.map((field) => (
                  <td key={field} className="border-b border-zinc-800 px-4 py-2 text-zinc-400">
                    {formatValue(row[field])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-700 bg-zinc-800/50 px-4 py-2 text-xs text-zinc-500">
        <span>
          {rows.length} row{rows.length !== 1 ? 's' : ''}
        </span>
        {executionTime !== undefined && <span>Executed in {executionTime}ms</span>}
      </div>
    </div>
  );
}

function formatValue(value: unknown): string {
  if (value === null) return 'NULL';
  if (value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
