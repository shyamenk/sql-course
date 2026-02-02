import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, GraduationCap, Code, Trophy, Award, Zap, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Database className="text-primary h-6 w-6" />
            <span className="text-xl font-bold">SQL Lab</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Master PostgreSQL
            <span className="text-primary"> Through Practice</span>
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Learn SQL with structured courses, solve 50+ real-world challenges, compete on
            leaderboards, and earn certifications—completely free.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Start Learning Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/course">Browse Courses</Link>
            </Button>
          </div>
        </section>

        <section className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Everything You Need to Master SQL
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<GraduationCap className="h-8 w-8" />}
                title="Structured Courses"
                description="Learn from beginner to advanced with our carefully crafted curriculum covering all PostgreSQL concepts."
              />
              <FeatureCard
                icon={<Code className="h-8 w-8" />}
                title="50+ Challenges"
                description="Practice with real-world SQL problems, get instant feedback, and track your progress."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Instant Feedback"
                description="Run queries in your own sandbox, see results immediately, and learn from your mistakes."
              />
              <FeatureCard
                icon={<Trophy className="h-8 w-8" />}
                title="Gamification"
                description="Earn points, unlock badges, maintain streaks, and compete on global leaderboards."
              />
              <FeatureCard
                icon={<Award className="h-8 w-8" />}
                title="Certifications"
                description="Earn verifiable certificates to showcase your SQL skills to employers."
              />
              <FeatureCard
                icon={<CheckCircle className="h-8 w-8" />}
                title="100% Free"
                description="Access all courses, challenges, and features without paying anything."
              />
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of developers learning PostgreSQL the fun way.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 SQL Lab. Built with Next.js, Tailwind CSS, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="text-primary mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
