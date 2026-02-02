import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

// Users table (NextAuth compatible)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  password: varchar('password', { length: 255 }),
  level: integer('level').default(1).notNull(),
  totalPoints: integer('total_points').default(0).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastActivityDate: timestamp('last_activity_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// NextAuth accounts table
export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 }).$type<AdapterAccountType>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })]
);

// NextAuth sessions table
export const sessions = pgTable('sessions', {
  sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// NextAuth verification tokens table
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

// Courses table
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  difficulty: varchar('difficulty', { length: 50 }).notNull(),
  order: integer('order').notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Lessons table
export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  order: integer('order').notNull(),
  estimatedMinutes: integer('estimated_minutes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User lesson progress table
export const userLessonProgress = pgTable('user_lesson_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  lessonId: uuid('lesson_id')
    .references(() => lessons.id, { onDelete: 'cascade' })
    .notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  quizScore: integer('quiz_score'),
  timeSpent: integer('time_spent'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Questions table
export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  difficulty: varchar('difficulty', { length: 50 }).notNull(),
  description: text('description').notNull(),
  sampleSchema: text('sample_schema'),
  expectedOutput: jsonb('expected_output'),
  pointsReward: integer('points_reward').notNull(),
  timeLimit: integer('time_limit'),
  order: integer('order').notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  topics: jsonb('topics').$type<string[]>(),
  prerequisites: jsonb('prerequisites').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Hints table
export const hints = pgTable('hints', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questions.id, { onDelete: 'cascade' })
    .notNull(),
  level: integer('level').notNull(),
  content: text('content').notNull(),
  pointsCost: integer('points_cost').notNull(),
  order: integer('order').notNull(),
});

// User question attempts table
export const userQuestionAttempts = pgTable('user_question_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  questionId: uuid('question_id')
    .references(() => questions.id, { onDelete: 'cascade' })
    .notNull(),
  query: text('query').notNull(),
  isCorrect: boolean('is_correct').notNull(),
  executionTime: integer('execution_time'),
  pointsEarned: integer('points_earned').default(0).notNull(),
  hintsUsed: jsonb('hints_used').$type<string[]>(),
  errorMessage: text('error_message'),
  attemptNumber: integer('attempt_number').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User question completions table
export const userQuestionCompletions = pgTable('user_question_completions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  questionId: uuid('question_id')
    .references(() => questions.id, { onDelete: 'cascade' })
    .notNull(),
  bestTime: integer('best_time'),
  totalAttempts: integer('total_attempts').notNull(),
  pointsEarned: integer('points_earned').notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
  firstTrySuccess: boolean('first_try_success').default(false).notNull(),
});

// Badges table
export const badges = pgTable('badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 255 }),
  category: varchar('category', { length: 50 }),
  criteria: jsonb('criteria'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User badges table
export const userBadges = pgTable('user_badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  badgeId: uuid('badge_id')
    .references(() => badges.id, { onDelete: 'cascade' })
    .notNull(),
  earnedAt: timestamp('earned_at').defaultNow().notNull(),
});

// Certificates table
export const certificates = pgTable('certificates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  verificationId: varchar('verification_id', { length: 100 }).notNull().unique(),
  fileUrl: text('file_url'),
  issuedAt: timestamp('issued_at').defaultNow().notNull(),
});

// Query logs table
export const queryLogs = pgTable('query_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  questionId: uuid('question_id').references(() => questions.id, { onDelete: 'set null' }),
  query: text('query').notNull(),
  executionTime: integer('execution_time'),
  rowsReturned: integer('rows_returned'),
  isSuccess: boolean('is_success').notNull(),
  errorType: varchar('error_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  lessonProgress: many(userLessonProgress),
  questionAttempts: many(userQuestionAttempts),
  questionCompletions: many(userQuestionCompletions),
  badges: many(userBadges),
  certificates: many(certificates),
  queryLogs: many(queryLogs),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  progress: many(userLessonProgress),
}));

export const userLessonProgressRelations = relations(userLessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [userLessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [userLessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const questionsRelations = relations(questions, ({ many }) => ({
  hints: many(hints),
  attempts: many(userQuestionAttempts),
  completions: many(userQuestionCompletions),
}));

export const hintsRelations = relations(hints, ({ one }) => ({
  question: one(questions, {
    fields: [hints.questionId],
    references: [questions.id],
  }),
}));

export const userQuestionAttemptsRelations = relations(userQuestionAttempts, ({ one }) => ({
  user: one(users, {
    fields: [userQuestionAttempts.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [userQuestionAttempts.questionId],
    references: [questions.id],
  }),
}));

export const userQuestionCompletionsRelations = relations(userQuestionCompletions, ({ one }) => ({
  user: one(users, {
    fields: [userQuestionCompletions.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [userQuestionCompletions.questionId],
    references: [questions.id],
  }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  users: many(userBadges),
}));

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
}));

export const queryLogsRelations = relations(queryLogs, ({ one }) => ({
  user: one(users, {
    fields: [queryLogs.userId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [queryLogs.questionId],
    references: [questions.id],
  }),
}));
