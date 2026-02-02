import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';

const mockLeaderboard = [
  { rank: 1, name: 'Alice Johnson', level: 5, points: 12500, streak: 45 },
  { rank: 2, name: 'Bob Smith', level: 4, points: 9800, streak: 30 },
  { rank: 3, name: 'Carol White', level: 4, points: 8500, streak: 22 },
  { rank: 4, name: 'David Brown', level: 3, points: 5200, streak: 15 },
  { rank: 5, name: 'Eva Green', level: 3, points: 4800, streak: 12 },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank against other SQL enthusiasts</p>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          All Time
        </Button>
        <Button variant="ghost" size="sm">
          This Month
        </Button>
        <Button variant="ghost" size="sm">
          This Week
        </Button>
        <Button variant="ghost" size="sm">
          Today
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {mockLeaderboard.slice(0, 3).map((user, index) => (
          <Card key={user.rank} className={index === 0 ? 'border-yellow-400 bg-yellow-50/50' : ''}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1">
                    {index === 0 && <Trophy className="h-6 w-6 text-yellow-500" />}
                    {index === 1 && <Medal className="h-6 w-6 text-gray-400" />}
                    {index === 2 && <Award className="h-6 w-6 text-amber-600" />}
                  </div>
                </div>
                <h3 className="mt-3 font-semibold">{user.name}</h3>
                <p className="text-muted-foreground text-sm">Level {user.level}</p>
                <p className="mt-2 text-2xl font-bold">{user.points.toLocaleString()}</p>
                <p className="text-muted-foreground text-xs">points</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
          <CardDescription>Top performers this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground w-8 text-center font-bold">
                    #{user.rank}
                  </span>
                  <Avatar>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-sm">Level {user.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{user.points.toLocaleString()} pts</p>
                  <p className="text-muted-foreground text-sm">🔥 {user.streak} day streak</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
