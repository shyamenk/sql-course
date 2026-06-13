import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { questions } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const question = await db
      .select({
        id: questions.id,
        title: questions.title,
        slug: questions.slug,
        difficulty: questions.difficulty,
        description: questions.description,
        sampleSchema: questions.sampleSchema,
        pointsReward: questions.pointsReward,
        timeLimit: questions.timeLimit,
        order: questions.order,
        isPublished: questions.isPublished,
        topics: questions.topics,
        prerequisites: questions.prerequisites,
        createdAt: questions.createdAt,
      })
      .from(questions)
      .where(and(eq(questions.slug, slug), eq(questions.isPublished, true)))
      .limit(1);

    if (question.length === 0) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json({ data: question[0] });
  } catch (error) {
    console.error('Failed to fetch question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
