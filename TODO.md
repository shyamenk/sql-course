# Project TODO

## PostgreSQL Coding Lab Platform

---

## Phase 1: MVP (Weeks 1-4)

### Week 1-2: Project Setup & Authentication

#### Task 1.1: Initialize Project ✅

- [x] Create GitHub repository with gh CLI
- [x] Initialize Next.js 14+ with App Router
- [x] Configure TypeScript
- [x] Setup Tailwind CSS
- [x] Install and configure shadcn/ui
- [x] Setup project structure (folders)
- [x] Configure ESLint and Prettier
- [x] Create initial commit

#### Task 1.2: Database Setup ✅

- [x] Create Neon database
- [x] Install Drizzle ORM
- [x] Configure Drizzle with Neon
- [x] Create database schema (all tables)
- [x] Generate and run migrations
- [x] Create seed script for initial data

#### Task 1.3: Authentication ✅

- [x] Install NextAuth.js
- [x] Configure Google OAuth provider
- [x] Configure GitHub OAuth provider
- [x] Configure Email/Password (Credentials) provider
- [x] Create auth API routes
- [x] Create login page
- [x] Create register page
- [x] Create auth middleware
- [ ] Test all auth flows (requires env setup)

#### Task 1.4: Basic UI Shell ✅

- [x] Create app layout (sidebar, header)
- [x] Create navigation component
- [x] Create dashboard page skeleton
- [x] Create course page skeleton
- [x] Create practice page skeleton
- [x] Create profile page skeleton
- [x] Setup Zustand store
- [ ] Add dark/light theme toggle (future enhancement)

---

### Week 3: SQL Execution Engine & Questions

#### Task 2.1: SQL Execution Engine

- [ ] Create user schema isolation logic
- [ ] Install pg-query-parser for validation
- [ ] Create query validation middleware
- [ ] Implement security checks (SELECT only)
- [ ] Create query execution service
- [ ] Add timeout handling (10s)
- [ ] Add row limit (1000)
- [ ] Create rate limiting (10/min)
- [ ] Test execution engine

#### Task 2.2: Question Module

- [ ] Create questions API routes (CRUD)
- [ ] Create question list page
- [ ] Create question detail page
- [ ] Create SQL editor component (CodeMirror)
- [ ] Create results table component
- [ ] Implement query comparison logic
- [ ] Create feedback display component
- [ ] Add difficulty badges
- [ ] Add topic tags filter

#### Task 2.3: Hints System

- [ ] Create hints API routes
- [ ] Create hint unlock logic
- [ ] Create hint accordion component
- [ ] Implement point deduction for hints
- [ ] Test hints flow

---

### Week 4: Course Module & Dashboard

#### Task 3.1: Course Module

- [ ] Create courses API routes
- [ ] Create lessons API routes
- [ ] Create course list page
- [ ] Create course detail page
- [ ] Create lesson page with markdown renderer
- [ ] Create lesson navigation (prev/next)
- [ ] Create quiz component
- [ ] Implement lesson completion logic
- [ ] Implement quiz scoring
- [ ] Add unlock logic (70%+ to proceed)

#### Task 3.2: Dashboard

- [ ] Create user progress API
- [ ] Create statistics cards
- [ ] Create activity feed
- [ ] Create "continue learning" section
- [ ] Create recent achievements display
- [ ] Create progress ring component

#### Task 3.3: Seed Initial Content

- [ ] Write 10 starter questions (varied difficulty)
- [ ] Create sample datasets (e-commerce, employees)
- [ ] Write hints for each question
- [ ] Create 2-3 course modules
- [ ] Write lesson content (markdown)
- [ ] Create quizzes for lessons

---

## Phase 2: Core Features (Weeks 5-8)

### Week 5: Gamification & Leaderboard

#### Task 4.1: Points System

- [ ] Create points calculation service
- [ ] Implement earning points logic
- [ ] Implement spending points logic
- [ ] Create points history tracking
- [ ] Update user points on actions

#### Task 4.2: Levels & Progression

- [ ] Create level calculation logic
- [ ] Create level-up notification
- [ ] Create level badge component
- [ ] Add level perks system

#### Task 4.3: Badges

- [ ] Create badges API routes
- [ ] Create badge check service
- [ ] Implement badge unlock logic
- [ ] Create badge card component
- [ ] Create achievements page
- [ ] Seed initial badges

#### Task 4.4: Leaderboard

- [ ] Create leaderboard API
- [ ] Create leaderboard page
- [ ] Add time filters (daily/weekly/monthly/all-time)
- [ ] Add category filters
- [ ] Create leaderboard table component
- [ ] Implement real-time updates

---

### Week 6: Schema Visualization & Query History

#### Task 5.1: Schema Visualization

- [ ] Install React Flow
- [ ] Create schema parser (DDL to nodes)
- [ ] Create ERD component
- [ ] Add table inspector
- [ ] Add zoom/pan controls
- [ ] Implement auto-layout (Dagre)
- [ ] Add export (PNG/SVG)
- [ ] Integrate with question page

#### Task 5.2: Query History

- [ ] Create query logs API
- [ ] Create history page
- [ ] Add filter/search functionality
- [ ] Create re-run query feature
- [ ] Add export (CSV/SQL)

#### Task 5.3: Analytics Dashboard

- [ ] Create stats API endpoints
- [ ] Create activity heatmap
- [ ] Create points chart (Recharts)
- [ ] Create topic mastery radar
- [ ] Create streak calendar

---

### Week 7: Enhanced Feedback & More Questions

#### Task 6.1: Advanced Feedback

- [ ] Improve error messages
- [ ] Add syntax error highlighting
- [ ] Add query plan visualization
- [ ] Create efficiency rating (A-F)
- [ ] Link errors to course lessons

#### Task 6.2: Content Expansion

- [ ] Write 20 more questions (total: 30)
- [ ] Create hints for new questions
- [ ] Add more sample datasets
- [ ] Write more lesson content

---

### Week 8: Streaks & Certificates

#### Task 7.1: Streak System

- [ ] Create streak calculation service
- [ ] Implement daily check logic
- [ ] Create freeze days feature
- [ ] Create streak rewards
- [ ] Create streak calendar UI
- [ ] Add streak notifications

#### Task 7.2: Certificate System

- [ ] Setup AWS S3 bucket
- [ ] Install @react-pdf/renderer
- [ ] Create certificate template
- [ ] Create certificate generation API
- [ ] Create verification page
- [ ] Add share buttons (LinkedIn/Twitter)
- [ ] Test certificate flow

---

## Phase 3: Polish & Launch (Weeks 9-10)

### Week 9: Final Content & Polish

#### Task 8.1: Complete Content

- [ ] Write remaining 20 questions (total: 50)
- [ ] Create hints for all questions
- [ ] Complete all course lessons
- [ ] Review and edit content

#### Task 8.2: UI/UX Refinement

- [ ] Improve responsive design
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Improve accessibility (a11y)
- [ ] Add keyboard shortcuts
- [ ] Polish animations/transitions

#### Task 8.3: Performance Optimization

- [ ] Optimize database queries
- [ ] Add caching where needed
- [ ] Optimize bundle size
- [ ] Add lazy loading
- [ ] Run Lighthouse audits

---

### Week 10: Testing & Launch

#### Task 9.1: Testing

- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Test all auth flows
- [ ] Test query execution edge cases
- [ ] Test gamification logic
- [ ] Load testing (100 concurrent users)

#### Task 9.2: Security Audit

- [ ] Review SQL injection prevention
- [ ] Review authentication security
- [ ] Review rate limiting
- [ ] Check for exposed secrets
- [ ] Review CORS settings

#### Task 9.3: Documentation & Launch

- [ ] Write README.md
- [ ] Create CONTRIBUTING.md
- [ ] Document API endpoints
- [ ] Setup error monitoring (Sentry)
- [ ] Configure Vercel deployment
- [ ] Deploy to production
- [ ] Announce launch

---

## Progress Tracking

| Phase   | Status         | Completion |
| ------- | -------------- | ---------- |
| Phase 1 | 🔄 In Progress | 40%        |
| Phase 2 | ⏳ Pending     | 0%         |
| Phase 3 | ⏳ Pending     | 0%         |

---

## Current Focus

**Active Task:** Task 2.1 - SQL Execution Engine
