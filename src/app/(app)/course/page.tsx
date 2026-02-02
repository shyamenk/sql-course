import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">Learn PostgreSQL from basics to advanced techniques</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CourseCard
          title="SQL Foundations"
          description="Master the basics of SQL with SELECT, WHERE, ORDER BY, and aggregate functions"
          difficulty="Beginner"
          lessonsCount={10}
          progress={0}
        />
        <CourseCard
          title="Mastering JOINs"
          description="Learn to combine data from multiple tables using various JOIN types"
          difficulty="Intermediate"
          lessonsCount={8}
          progress={0}
          locked
        />
        <CourseCard
          title="Advanced SQL Techniques"
          description="Dive into CTEs, window functions, and complex analytical queries"
          difficulty="Advanced"
          lessonsCount={12}
          progress={0}
          locked
        />
      </div>
    </div>
  );
}

function CourseCard({
  title,
  description,
  difficulty,
  lessonsCount,
  progress,
  locked = false,
}: {
  title: string;
  description: string;
  difficulty: string;
  lessonsCount: number;
  progress: number;
  locked?: boolean;
}) {
  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <Card className={locked ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </span>
          {locked && <span className="text-muted-foreground text-xs">🔒 Locked</span>}
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{lessonsCount} lessons</span>
            <span>{progress}% complete</span>
          </div>
          <div className="bg-muted h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
