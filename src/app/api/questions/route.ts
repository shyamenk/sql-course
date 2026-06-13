import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { questions } from '@/lib/db/schema';
import { eq, and, asc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const topic = searchParams.get('topic');

    const conditions = [eq(questions.isPublished, true)];

    if (difficulty) {
      conditions.push(eq(questions.difficulty, difficulty));
    }

    if (topic) {
      conditions.push(sql`${questions.topics} @> ${JSON.stringify([topic])}::jsonb`);
    }

    const result = await db
      .select({
        id: questions.id,
        title: questions.title,
        slug: questions.slug,
        difficulty: questions.difficulty,
        topics: questions.topics,
        pointsReward: questions.pointsReward,
        order: questions.order,
        isPublished: questions.isPublished,
      })
      .from(questions)
      .where(and(...conditions))
      .orderBy(asc(questions.order));

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
