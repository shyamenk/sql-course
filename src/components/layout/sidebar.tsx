'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, GraduationCap, Code, Trophy, User, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Course', href: '/course', icon: GraduationCap },
  { title: 'Practice', href: '/practice', icon: Code },
  { title: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { title: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-background fixed inset-y-0 left-0 z-50 hidden w-64 border-r md:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Database className="text-primary h-6 w-6" />
          <span className="text-xl font-bold">SQL Lab</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <TooltipProvider>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="md:hidden">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        <div className="border-t p-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-muted-foreground text-xs">
              Master PostgreSQL with hands-on practice
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
