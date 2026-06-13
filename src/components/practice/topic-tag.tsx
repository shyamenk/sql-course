import * as React from 'react';
import { cn } from '@/lib/utils';

interface TopicTagProps {
  topic: string;
  className?: string;
}

export function TopicTag({ topic, className }: TopicTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-400',
        className
      )}
    >
      {topic}
    </span>
  );
}
