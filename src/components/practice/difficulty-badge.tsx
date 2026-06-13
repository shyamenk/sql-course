import * as React from 'react';
import { cn } from '@/lib/utils';

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const difficultyStyles: Record<Difficulty, string> = {
  beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  advanced: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  expert: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        difficultyStyles[difficulty],
        className
      )}
    >
      {difficultyLabels[difficulty]}
    </span>
  );
}
