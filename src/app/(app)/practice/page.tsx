import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const mockQuestions = [
  {
    slug: 'select-all-customers',
    title: 'Select All Customers',
    difficulty: 'beginner',
    topics: ['select', 'basics'],
    points: 50,
    completed: false,
  },
  {
    slug: 'filter-by-city',
    title: 'Filter by City',
    difficulty: 'beginner',
    topics: ['select', 'where'],
    points: 50,
    completed: false,
  },
  {
    slug: 'count-total-orders',
    title: 'Count Total Orders',
    difficulty: 'beginner',
    topics: ['aggregate', 'count'],
    points: 50,
    completed: false,
  },
  {
    slug: 'basic-inner-join',
    title: 'Basic INNER JOIN',
    difficulty: 'intermediate',
    topics: ['join', 'inner-join'],
    points: 100,
    completed: false,
  },
  {
    slug: 'window-row-number',
    title: 'Window Function - Row Number',
    difficulty: 'advanced',
    topics: ['window-functions'],
    points: 200,
    completed: false,
  },
];

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800',
};

export default function PracticePage() {
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
        {mockQuestions.map((question) => (
          <Link key={question.slug} href={`/practice/${question.slug}`}>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${difficultyColors[question.difficulty]}`}
                    >
                      {question.difficulty}
                    </span>
                    {question.topics.map((topic) => (
                      <span key={topic} className="bg-muted rounded px-2 py-1 text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">{question.points} pts</span>
                </div>
                <CardTitle className="mt-2 text-lg">{question.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    {question.completed ? '✅ Completed' : 'Not started'}
                  </span>
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
