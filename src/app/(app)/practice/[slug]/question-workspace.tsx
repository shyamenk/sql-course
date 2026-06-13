'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SqlEditor, ResultsTable, FeedbackDisplay } from '@/components/practice';
import { Play, Send, Loader2 } from 'lucide-react';

interface QuestionWorkspaceProps {
  questionId: string;
}

interface QueryResult {
  success: boolean;
  data?: {
    rows: Record<string, unknown>[];
    fields: string[];
    rowCount: number;
    executionTime: number;
  };
  error?: {
    message: string;
    type: string;
  };
  isCorrect?: boolean;
}

export function QuestionWorkspace({ questionId }: QuestionWorkspaceProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
    isCorrect?: boolean;
  } | null>(null);

  const executeQuery = async (checkAnswer: boolean) => {
    if (!query.trim()) return;

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          questionId: checkAnswer ? questionId : undefined,
        }),
      });

      const data: QueryResult = await response.json();
      setResult(data);

      if (checkAnswer) {
        if (data.success) {
          setFeedback({
            success: true,
            message: data.isCorrect
              ? 'Your query executed successfully and produced the correct result!'
              : 'Query executed but the result does not match the expected output.',
            isCorrect: data.isCorrect,
          });
        } else {
          setFeedback({
            success: false,
            message: data.error?.message || 'An error occurred while executing the query.',
          });
        }
      } else if (!data.success) {
        setFeedback({
          success: false,
          message: data.error?.message || 'An error occurred while executing the query.',
        });
      }
    } catch {
      setFeedback({
        success: false,
        message: 'Failed to connect to the server. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">SQL Editor</h2>
        <SqlEditor
          value={query}
          onChange={setQuery}
          disabled={loading}
          placeholder="Write your SQL query here..."
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => executeQuery(false)}
          disabled={loading || !query.trim()}
          variant="outline"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
          Run Query
        </Button>
        <Button
          onClick={() => executeQuery(true)}
          disabled={loading || !query.trim()}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Submit
        </Button>
      </div>

      {feedback && (
        <FeedbackDisplay
          success={feedback.success}
          message={feedback.message}
          isCorrect={feedback.isCorrect}
        />
      )}

      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-semibold">Results</h2>
        <ResultsTable
          rows={result?.data?.rows || []}
          fields={result?.data?.fields || []}
          loading={loading}
          error={result?.success === false ? result.error?.message : null}
          executionTime={result?.data?.executionTime}
        />
      </div>
    </div>
  );
}
