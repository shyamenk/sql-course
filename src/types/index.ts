// User types
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  level: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;
  createdAt: Date;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  order: number;
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  estimatedMinutes: number | null;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  quizScore: number | null;
  timeSpent: number | null;
  completedAt: Date | null;
}

// Question types
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Question {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  description: string;
  sampleSchema: string | null;
  expectedOutput: Record<string, unknown>[] | null;
  pointsReward: number;
  timeLimit: number | null;
  order: number;
  isPublished: boolean;
  topics: string[] | null;
  prerequisites: string[] | null;
}

export interface Hint {
  id: string;
  questionId: string;
  level: 1 | 2 | 3;
  content: string;
  pointsCost: number;
  order: number;
}

export interface QuestionAttempt {
  id: string;
  userId: string;
  questionId: string;
  query: string;
  isCorrect: boolean;
  executionTime: number | null;
  pointsEarned: number;
  hintsUsed: string[] | null;
  errorMessage: string | null;
  attemptNumber: number;
  createdAt: Date;
}

export interface QuestionCompletion {
  id: string;
  userId: string;
  questionId: string;
  bestTime: number | null;
  totalAttempts: number;
  pointsEarned: number;
  completedAt: Date;
  firstTrySuccess: boolean;
}

// Badge types
export type BadgeCategory = 'skill' | 'progress' | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: BadgeCategory | null;
  criteria: Record<string, unknown> | null;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Date;
}

// Certificate types
export interface Certificate {
  id: string;
  userId: string;
  type: string;
  title: string;
  verificationId: string;
  fileUrl: string | null;
  issuedAt: Date;
}

// Query execution types
export interface QueryResult {
  success: boolean;
  data: Record<string, unknown>[] | null;
  error: string | null;
  executionTime: number;
  rowsReturned: number;
}

export interface QueryFeedback {
  isCorrect: boolean;
  message: string;
  pointsEarned: number;
  efficiencyRating: 'A' | 'B' | 'C' | 'D' | 'F' | null;
  hints?: string[];
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string | null;
  level: number;
  totalPoints: number;
  currentStreak: number;
}

// Level thresholds
export const LEVEL_THRESHOLDS = {
  1: { min: 0, max: 500, title: 'Novice' },
  2: { min: 501, max: 1500, title: 'Learner' },
  3: { min: 1501, max: 3500, title: 'Practitioner' },
  4: { min: 3501, max: 7000, title: 'Expert' },
  5: { min: 7001, max: 12000, title: 'Master' },
  6: { min: 12001, max: Infinity, title: 'Grandmaster' },
} as const;

// Points configuration
export const POINTS_CONFIG = {
  lessonCompletion: 10,
  quizPerfectBonus: 20,
  question: {
    beginner: 50,
    intermediate: 100,
    advanced: 200,
    expert: 500,
  },
  performanceBonus: 0.2,
  firstTryBonus: 0.5,
  dailyStreak: 10,
  hint: {
    level1: 5,
    level2: 15,
    level3: 30,
  },
  skipPrerequisite: 100,
} as const;
