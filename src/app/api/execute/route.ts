import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { executeQuery, compareQueryResults } from '@/lib/services/sql-engine';
import { db } from '@/lib/db';
import { queryLogs, questions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { query, questionId } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    let schemaSetup: string | undefined;
    let expectedQuery: string | undefined;

    if (questionId) {
      const question = await db.query.questions.findFirst({
        where: eq(questions.id, questionId),
      });

      if (question) {
        schemaSetup = question.sampleSchema ?? undefined;
        const expectedOutput = question.expectedOutput as { query?: string } | null;
        expectedQuery = expectedOutput?.query;
      }
    }

    const result = await executeQuery(query, session.user.id, schemaSetup);

    await db.insert(queryLogs).values({
      userId: session.user.id,
      questionId: questionId || null,
      query,
      executionTime: result.data?.executionTime ?? null,
      rowsReturned: result.data?.rowCount ?? null,
      isSuccess: result.success,
      errorType: result.error?.type ?? null,
    });

    if (result.success && expectedQuery && questionId) {
      const comparison = await compareQueryResults(
        query,
        expectedQuery,
        session.user.id,
        schemaSetup || ''
      );

      return NextResponse.json({
        ...result,
        isCorrect: comparison.match,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Query execution error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
