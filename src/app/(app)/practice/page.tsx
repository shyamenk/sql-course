import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { db } from '@/lib/db';
import { questions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { DifficultyBadge, TopicTag } from '@/components/practice';

async function getQuestions() {
  return db.query.questions.findMany({
    where: eq(questions.isPublished, true),
    orderBy: (questions, { asc }) => [asc(questions.order)],
  });
}

export default async function PracticePage() {
  const questionsList = await getQuestions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice</h1>
        <p className="text-muted-foreground">Solve SQL challenges and earn points</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="Search questions..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          All
        </Button>
        <Button variant="ghost" size="sm">
          Beginner
        </Button>
        <Button variant="ghost" size="sm">
          Intermediate
        </Button>
        <Button variant="ghost" size="sm">
          Advanced
        </Button>
        <Button variant="ghost" size="sm">
          Expert
        </Button>
      </div>

      <div className="grid gap-4">
        {questionsList.map((question) => (
          <Link key={question.slug} href={`/practice/${question.slug}`}>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DifficultyBadge
                      difficulty={
                        question.difficulty as 'beginner' | 'intermediate' | 'advanced' | 'expert'
                      }
                    />
                    {(question.topics as string[] | null)?.map((topic) => (
                      <TopicTag key={topic} topic={topic} />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {question.pointsReward} pts
                  </span>
                </div>
                <CardTitle className="mt-2 text-lg">{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Not started</span>
                  <Button size="sm" variant="ghost">
                    Solve →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
