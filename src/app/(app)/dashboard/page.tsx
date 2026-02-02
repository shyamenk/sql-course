import { auth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Code, Trophy, Flame, Target } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Continue your PostgreSQL learning journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Points"
          value="0"
          description="Keep practicing to earn more"
          icon={<Trophy className="text-yellow-500" />}
        />
        <StatCard
          title="Questions Solved"
          value="0 / 50"
          description="Complete challenges to progress"
          icon={<Code className="text-blue-500" />}
        />
        <StatCard
          title="Current Streak"
          value="0 days"
          description="Solve a question daily"
          icon={<Flame className="text-orange-500" />}
        />
        <StatCard
          title="Level"
          value="1"
          description="Novice"
          icon={<Target className="text-green-500" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest badges and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex h-32 items-center justify-center">
              <p>Complete challenges to earn badges!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}
