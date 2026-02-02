export const siteConfig = {
  name: 'SQL Lab',
  description: 'A gamified PostgreSQL learning platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og.png',
  links: {
    github: 'https://github.com/shyamenk/sql-course',
  },
  creator: 'shyamenk',
};

export const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Course', href: '/course', icon: 'GraduationCap' },
  { title: 'Practice', href: '/practice', icon: 'Code' },
  { title: 'Leaderboard', href: '/leaderboard', icon: 'Trophy' },
  { title: 'Profile', href: '/profile', icon: 'User' },
] as const;
