import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface FeedbackDisplayProps {
  success: boolean;
  message: string;
  isCorrect?: boolean;
  className?: string;
}

export function FeedbackDisplay({ success, message, isCorrect, className }: FeedbackDisplayProps) {
  const showCorrectness = isCorrect !== undefined;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4',
        success
          ? 'border-green-800 bg-green-950/50 text-green-400'
          : 'border-red-800 bg-red-950/50 text-red-400',
        className
      )}
    >
      <div className="mt-0.5">
        {success ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
      </div>
      <div className="flex-1">
        <div className="text-sm">{message}</div>
        {showCorrectness && (
          <div
            className={cn(
              'mt-2 flex items-center gap-2 text-sm font-medium',
              isCorrect ? 'text-green-400' : 'text-yellow-400'
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="size-4" />
                Correct!
              </>
            ) : (
              <>
                <AlertCircle className="size-4" />
                Try again
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
