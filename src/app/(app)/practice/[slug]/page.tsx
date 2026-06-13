import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { questions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DifficultyBadge, TopicTag } from '@/components/practice';
import { QuestionWorkspace } from './question-workspace';

interface QuestionPageProps {
  params: Promise<{ slug: string }>;
}

async function getQuestion(slug: string) {
  return db.query.questions.findFirst({
    where: eq(questions.slug, slug),
  });
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { slug } = await params;
  const question = await getQuestion(slug);

  if (!question) {
    notFound();
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 lg:flex-row">
      <div className="flex flex-col gap-4 lg:w-1/2 lg:overflow-y-auto lg:pr-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DifficultyBadge
              difficulty={
                question.difficulty as 'beginner' | 'intermediate' | 'advanced' | 'expert'
              }
            />
            {(question.topics as string[] | null)?.map((topic) => (
              <TopicTag key={topic} topic={topic} />
            ))}
            <span className="text-muted-foreground ml-auto text-sm">
              {question.pointsReward} pts
            </span>
          </div>

          <h1 className="text-2xl font-bold">{question.title}</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">{question.description}</p>
          </div>
        </div>

        {question.sampleSchema && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Schema</h2>
            <pre className="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 p-4 font-mono text-sm text-zinc-300">
              <code>{question.sampleSchema}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col lg:w-1/2">
        <QuestionWorkspace questionId={question.id} />
      </div>
    </div>
  );
}
