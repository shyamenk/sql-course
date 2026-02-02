# Product Requirements Document (PRD)

## PostgreSQL Coding Lab Platform

---

## 1. Executive Summary

### 1.1 Product Vision

A comprehensive, gamified PostgreSQL learning platform that combines structured courses with hands-on practice, real-time feedback, and competitive elements to create an engaging SQL mastery experience.

### 1.2 Target Audience

- SQL beginners seeking structured learning
- Intermediate developers wanting to master advanced concepts
- Data analysts preparing for technical interviews
- Students and professionals seeking SQL certification

### 1.3 Core Value Proposition

Learn PostgreSQL through a structured course, practice with 50 real-world challenges, receive instant feedback, compete on leaderboards, and earn certifications—all completely free.

---

## 2. Technology Stack

### Frontend

| Technology   | Purpose                |
| ------------ | ---------------------- |
| Next.js 14+  | Framework (App Router) |
| Tailwind CSS | Styling                |
| shadcn/ui    | UI Components          |
| Zustand      | State Management       |
| CodeMirror 6 | SQL Editor             |
| Recharts     | Charts/Visualizations  |
| React Flow   | Schema Diagrams        |

### Backend

| Technology         | Purpose        |
| ------------------ | -------------- |
| Next.js API Routes | API Layer      |
| Drizzle ORM        | Database ORM   |
| NextAuth.js        | Authentication |

### Infrastructure

| Service      | Provider              |
| ------------ | --------------------- |
| Hosting      | Vercel                |
| Database     | Neon (PostgreSQL)     |
| File Storage | AWS S3 (certificates) |
| Monitoring   | Sentry                |
| Analytics    | Vercel Analytics      |

---

## 3. Core Features

### 3.1 Course Module

#### Course Structure

**Foundation (Beginner)**

- Introduction to Databases & SQL
- SELECT statements & filtering (WHERE)
- Sorting & limiting results (ORDER BY, LIMIT)
- Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
- GROUP BY & HAVING clauses

**Intermediate Queries**

- INNER JOIN
- LEFT/RIGHT/FULL OUTER JOINs
- Self-joins & Multiple table joins
- Subqueries (scalar, row, table)
- Correlated subqueries

**Advanced Techniques**

- Common Table Expressions (CTEs)
- Recursive CTEs
- Window Functions (ROW_NUMBER, RANK, DENSE_RANK)
- LAG, LEAD, FIRST_VALUE, LAST_VALUE
- Partitioning & frame clauses

**Expert Level**

- Complex analytical queries
- Query optimization techniques
- Index strategies
- Advanced aggregations (ROLLUP, CUBE, GROUPING SETS)

#### Lesson Components

- Theory explanation (markdown/rich text)
- Code examples with syntax highlighting
- Interactive SQL playground per lesson
- Practice exercises (3-5 per lesson)
- Lesson quiz (5 questions)
- Unlock next lesson on 70%+ quiz score

#### Sample Datasets

- E-commerce (customers, orders, products)
- Employee management (departments, employees, salaries)
- Social media (users, posts, comments, likes)
- Education (students, courses, enrollments, grades)

---

### 3.2 Challenge Module

#### 50 Questions Distribution

| Difficulty   | Count | Topics                                           |
| ------------ | ----- | ------------------------------------------------ |
| Beginner     | 12    | Basic SELECT, WHERE, ORDER BY, simple aggregates |
| Intermediate | 18    | JOINs, subqueries, GROUP BY                      |
| Advanced     | 15    | Window functions, CTEs, complex aggregations     |
| Expert       | 5     | Multi-step analytical queries, optimization      |

#### Question Schema

```typescript
interface Question {
  id: string;
  title: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  topics: string[];
  description: string;
  sampleSchema: string;
  expectedOutput: object[];
  hints: {
    level: 1 | 2 | 3;
    content: string;
    cost: number;
  }[];
  pointsReward: number;
  timeLimit?: number;
  prerequisites?: string[];
}
```

#### Question Features

- Difficulty badge with color coding
- Topic tags (filterable)
- Completion status: Not Started, In Progress, Completed, Mastered
- Locked questions (unlock after prerequisites)
- Sample data viewer with interactive table preview
- Pre-written hints (3 levels per question)

---

### 3.3 SQL Execution Engine

#### Sandbox Architecture

- **User Schema Isolation:** Each user gets `user_{userId}` schema
- **Table Prefixing:** Challenge tables copied to user schema
- **Resource Limits:**
  - Query timeout: 10 seconds
  - Max rows returned: 1000
  - Memory limit: 256MB per query

#### Query Execution Flow

```
User submits query
       ↓
Rate limit check (10 queries/minute)
       ↓
Syntax validation (pg-query-parser)
       ↓
Security check (SELECT only, no DDL/DCL)
       ↓
Execute in user schema with timeout
       ↓
Capture results, execution time, query plan
       ↓
Compare with expected output
       ↓
Generate feedback
       ↓
Update user progress & points
```

#### Query Validation

| Type              | Description                                         |
| ----------------- | --------------------------------------------------- |
| Exact Match       | Result set matches expected output (order agnostic) |
| Column Match      | Correct columns even if row order differs           |
| Partial Credit    | 50% points for correct structure, wrong results     |
| Performance Bonus | Extra points for efficient queries (<100ms)         |

---

### 3.4 Feedback System

#### Error Types & Messages

**Syntax Errors:**

- Parse error location highlighting
- Suggested fix with explanation
- Link to relevant course lesson

**Logical Errors:**

- "Your query returned X rows, expected Y"
- Difference between actual vs. expected
- Common mistake patterns detection

**Performance Issues:**

- "Query took Xms, can be optimized"
- Suggest index usage
- Query plan visualization

#### Success Feedback

- **Correct First Try:** +100% points, "Perfect!" badge
- **With Hints:** Reduced points based on hints used
- **Performance Metrics:** Execution time, rows scanned, efficiency rating (A-F)

#### Pre-Written Hint System

| Level | Points Cost | Description                                         |
| ----- | ----------- | --------------------------------------------------- |
| 1     | 5           | General direction ("Consider using a JOIN")         |
| 2     | 15          | Specific approach ("Use INNER JOIN on customer_id") |
| 3     | 30          | Partial solution (show JOIN structure)              |

---

### 3.5 Gamification System

#### Points Economy

**Earning Points:**

| Action                     | Points   |
| -------------------------- | -------- |
| Lesson completion          | 10       |
| Quiz perfect score         | 20 bonus |
| Beginner question          | 50       |
| Intermediate question      | 100      |
| Advanced question          | 200      |
| Expert question            | 500      |
| Performance bonus (<100ms) | +20%     |
| First-try bonus            | +50%     |
| Daily streak               | 10/day   |

**Spending Points:**

| Action            | Cost |
| ----------------- | ---- |
| Level 1 hint      | 5    |
| Level 2 hint      | 15   |
| Level 3 hint      | 30   |
| Skip prerequisite | 100  |

#### Level Progression

| Level | Title        | Points Required |
| ----- | ------------ | --------------- |
| 1     | Novice       | 0 - 500         |
| 2     | Learner      | 501 - 1,500     |
| 3     | Practitioner | 1,501 - 3,500   |
| 4     | Expert       | 3,501 - 7,000   |
| 5     | Master       | 7,001 - 12,000  |
| 6     | Grandmaster  | 12,001+         |

#### Badges & Achievements

**Skill Badges:**

- JOIN Master, Window Wizard, CTE Champion
- Aggregate Ace, Speedster, Perfectionist

**Progress Badges:**

- Course Finisher, Half Century (50 questions)
- Consistency King (30-day streak)
- Night Owl, Early Bird

#### Streak System

- Daily requirement: 1 question OR 1 lesson
- Freeze days: 2 per month
- Visual streak calendar (heatmap)
- Streak rewards: 7 days (100 pts), 30 days (500 pts + badge)

#### Leaderboard

- Global top 100 by total points
- Filter: Daily, Weekly, Monthly, All-time
- Category leaderboards: By difficulty, topic, speed
- Real-time updates with user avatars and levels

---

### 3.6 Schema Visualization

#### Features

- Interactive ERD with React Flow
- Primary/foreign key indicators
- Cardinality labels (1:1, 1:N, N:M)
- Zoom, pan, and auto-layout (Dagre)
- Table inspector: columns, types, constraints
- Quick reference sidebar in SQL editor
- Export as PNG/SVG

---

### 3.7 Query History & Analytics

#### Personal Dashboard

- Last 50 queries with timestamps
- Success/failure status and execution times
- Statistics: Total queries, success rate, avg execution time
- Progress charts: Activity heatmap, points over time
- Topic mastery radar chart

#### Query History Features

- Filter by question, date, success/failure
- One-click re-execution
- Export as CSV/SQL file

---

### 3.8 Certification System

#### Certificate Types

| Certificate             | Requirements                              |
| ----------------------- | ----------------------------------------- |
| Course Completion       | 100% lessons, 70%+ quiz avg, 10 exercises |
| JOIN Mastery            | Complete all JOIN questions               |
| Window Functions Expert | Master window functions                   |
| PostgreSQL Master       | All questions + course                    |

#### Certificate Features

- Professional PDF template
- User name, achievement, completion date
- Unique verification ID + QR code
- Public verification page: `/verify/[certificateId]`
- LinkedIn/Twitter share buttons
- Stored on AWS S3

---

## 4. Authentication

### Providers (NextAuth.js)

- Google OAuth
- GitHub OAuth
- Email/Password (Credentials)

### Security

- Session-based authentication
- JWT tokens for API requests
- CSRF protection
- Secure HTTP-only cookies

---

## 5. Database Schema

```typescript
// users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  password: varchar('password', { length: 255 }), // for credentials auth
  avatar: text('avatar'),
  provider: varchar('provider', { length: 50 }),
  providerId: varchar('provider_id', { length: 255 }),
  level: integer('level').default(1),
  totalPoints: integer('total_points').default(0),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  lastActivityDate: timestamp('last_activity_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// courses
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  difficulty: varchar('difficulty', { length: 50 }),
  order: integer('order').notNull(),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// lessons
export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  courseId: uuid('course_id')
    .references(() => courses.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  order: integer('order').notNull(),
  estimatedMinutes: integer('estimated_minutes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// user_lesson_progress
export const userLessonProgress = pgTable('user_lesson_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  lessonId: uuid('lesson_id')
    .references(() => lessons.id)
    .notNull(),
  isCompleted: boolean('is_completed').default(false),
  quizScore: integer('quiz_score'),
  timeSpent: integer('time_spent'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// questions
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
  isPublished: boolean('is_published').default(true),
  topics: jsonb('topics'),
  prerequisites: jsonb('prerequisites'),
  createdAt: timestamp('created_at').defaultNow(),
});

// hints
export const hints = pgTable('hints', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questions.id)
    .notNull(),
  level: integer('level').notNull(),
  content: text('content').notNull(),
  pointsCost: integer('points_cost').notNull(),
  order: integer('order').notNull(),
});

// user_question_attempts
export const userQuestionAttempts = pgTable('user_question_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  questionId: uuid('question_id')
    .references(() => questions.id)
    .notNull(),
  query: text('query').notNull(),
  isCorrect: boolean('is_correct').notNull(),
  executionTime: integer('execution_time'),
  pointsEarned: integer('points_earned').default(0),
  hintsUsed: jsonb('hints_used'),
  errorMessage: text('error_message'),
  attemptNumber: integer('attempt_number').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// user_question_completions
export const userQuestionCompletions = pgTable('user_question_completions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  questionId: uuid('question_id')
    .references(() => questions.id)
    .notNull(),
  bestTime: integer('best_time'),
  totalAttempts: integer('total_attempts').notNull(),
  pointsEarned: integer('points_earned').notNull(),
  completedAt: timestamp('completed_at').defaultNow(),
  firstTrySuccess: boolean('first_try_success').default(false),
});

// badges
export const badges = pgTable('badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 255 }),
  category: varchar('category', { length: 50 }),
  criteria: jsonb('criteria'),
  createdAt: timestamp('created_at').defaultNow(),
});

// user_badges
export const userBadges = pgTable('user_badges', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  badgeId: uuid('badge_id')
    .references(() => badges.id)
    .notNull(),
  earnedAt: timestamp('earned_at').defaultNow(),
});

// certificates
export const certificates = pgTable('certificates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  verificationId: varchar('verification_id', { length: 100 }).notNull().unique(),
  fileUrl: text('file_url'),
  issuedAt: timestamp('issued_at').defaultNow(),
});

// query_logs
export const queryLogs = pgTable('query_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  questionId: uuid('question_id').references(() => questions.id),
  query: text('query').notNull(),
  executionTime: integer('execution_time'),
  rowsReturned: integer('rows_returned'),
  isSuccess: boolean('is_success').notNull(),
  errorType: varchar('error_type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## 6. API Routes

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth.js handler

### Courses

- `GET /api/courses` - List all courses
- `GET /api/courses/[id]` - Get course details
- `GET /api/courses/[id]/lessons` - Get course lessons
- `GET /api/lessons/[id]` - Get lesson content
- `POST /api/lessons/[id]/complete` - Mark lesson complete

### Questions

- `GET /api/questions` - List questions (with filters)
- `GET /api/questions/[slug]` - Get question details
- `GET /api/questions/[id]/hints` - Get hints
- `POST /api/questions/[id]/hints/[hintId]/unlock` - Unlock hint

### Query Execution

- `POST /api/execute` - Execute SQL query

### User Progress

- `GET /api/user/progress` - Overall progress
- `GET /api/user/stats` - User statistics
- `GET /api/user/history` - Query history
- `GET /api/user/achievements` - Badges & achievements

### Leaderboard

- `GET /api/leaderboard` - Get leaderboard

### Gamification

- `POST /api/badges/check` - Check badge unlocks
- `GET /api/certificates` - List certificates
- `POST /api/certificates/generate` - Generate certificate

### Schema

- `GET /api/schema/[questionId]` - Schema visualization data

---

## 7. Security & Performance

### Query Security

- Parameterized queries only
- Whitelist: SELECT only (no DDL/DCL)
- Parse validation with pg-query-parser
- Row limit: 1000 max
- Query timeout: 10 seconds
- Rate limiting: 10 queries/minute
- Schema isolation per user

### Database Optimization

- Connection pooling (Neon built-in)
- Prepared statements
- Indexed columns: email, slug, points, created_at
- Materialized views for leaderboards (5 min refresh)

### Rate Limiting

| Endpoint               | Limit      |
| ---------------------- | ---------- |
| API routes             | 100/minute |
| Query execution        | 10/minute  |
| Certificate generation | 2/hour     |

---

## 8. Development Roadmap

### Phase 1: MVP (Weeks 1-4)

**Week 1-2:**

- Project setup (Next.js, Tailwind, shadcn)
- Authentication (NextAuth.js with Email/Password, Google, GitHub)
- Database schema (Drizzle + Neon)
- Basic UI shell

**Week 3:**

- SQL execution engine
- Question module (CRUD)
- Basic feedback system
- Query validation

**Week 4:**

- Course module
- Lesson progression
- 10 starter questions
- Basic dashboard

### Phase 2: Core Features (Weeks 5-8)

**Week 5:**

- Gamification (points, levels)
- Badge system
- Leaderboard

**Week 6:**

- Schema visualization
- Query history
- Advanced feedback
- Performance metrics

**Week 7:**

- Pre-written hints system
- 20 more questions
- Error explanations

**Week 8:**

- Streak system
- Certificate generation (AWS S3)
- Testing & bug fixes

### Phase 3: Polish & Launch (Weeks 9-10)

**Week 9:**

- Remaining 20 questions (total: 50)
- Course content completion
- UI/UX refinement
- Performance optimization

**Week 10:**

- Security audit
- Load testing
- Documentation
- Launch

---

## 9. Success Metrics

### User Engagement

- Daily/Weekly Active Users
- Average session duration
- Questions attempted per session
- Course completion rate (target: 40%)

### Learning Outcomes

- Average attempts per question
- Success rate by difficulty
- Time to completion
- Certificate earn rate (target: 20%)

### Technical Performance

- API response time (P95 < 200ms)
- Query execution time (P95 < 2s)
- Error rate (< 1%)
- Uptime (99.9%)

---

## 10. Future Enhancements

### Near-term (3-6 months)

- Community features (discussions, solution sharing)
- Timed competitions and weekly challenges
- 50 more questions (total: 100)
- Video tutorials

### Long-term (6-12 months)

- AI-powered hints (optional)
- Multi-database support (MySQL, SQLite)
- Team accounts for enterprises
- Mobile app (React Native)

---

## Appendix: Sample Question

**Title:** Find Top Customers by Revenue  
**Difficulty:** Intermediate  
**Topics:** joins, aggregates, group-by, order-by  
**Points:** 100

**Description:**
Using the customers, orders, and order_items tables, write a query to find the top 5 customers by total revenue. Display customer name and total revenue, sorted highest to lowest.

**Sample Schema:**

```sql
CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT REFERENCES customers(customer_id),
  order_date DATE
);

CREATE TABLE order_items (
  item_id INT PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  product_name VARCHAR(100),
  price DECIMAL(10,2),
  quantity INT
);
```

**Hints:**

1. (5 pts) You'll need to join all three tables together
2. (15 pts) Calculate revenue as price × quantity, then sum by customer
3. (30 pts) Use INNER JOIN customers to orders on customer_id, then JOIN order_items...
