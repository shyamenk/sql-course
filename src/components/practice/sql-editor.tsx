'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function SqlEditor({
  value,
  onChange,
  disabled = false,
  placeholder = 'SELECT * FROM users;',
  className,
}: SqlEditorProps) {
  const lines = value.split('\n');
  const lineCount = Math.max(lines.length, 10);

  return (
    <div
      className={cn(
        'relative flex rounded-lg border border-zinc-700 bg-zinc-900 font-mono text-sm',
        disabled && 'opacity-50',
        className
      )}
    >
      <div
        className="select-none border-r border-zinc-700 bg-zinc-800/50 px-3 py-3 text-right text-zinc-500"
        aria-hidden="true"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} className="leading-6">
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        spellCheck={false}
        className={cn(
          'min-h-[240px] flex-1 resize-none bg-transparent px-4 py-3 leading-6 text-zinc-100 outline-none',
          'placeholder:text-zinc-600',
          'focus:ring-0'
        )}
      />
    </div>
  );
}
