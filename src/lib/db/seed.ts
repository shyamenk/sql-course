import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { badges, courses, lessons, questions, hints } from './schema';

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log('🌱 Seeding database...');

  // Seed badges
  const badgeData = [
    {
      name: 'JOIN Master',
      description: 'Complete all JOIN questions',
      icon: '🔗',
      category: 'skill',
    },
    {
      name: 'Window Wizard',
      description: 'Master window functions',
      icon: '🪟',
      category: 'skill',
    },
    {
      name: 'CTE Champion',
      description: 'Complete all CTE challenges',
      icon: '🏆',
      category: 'skill',
    },
    {
      name: 'Aggregate Ace',
      description: 'Perfect all aggregate questions',
      icon: '📊',
      category: 'skill',
    },
    {
      name: 'Speedster',
      description: '10 queries under 50ms',
      icon: '⚡',
      category: 'skill',
    },
    {
      name: 'Perfectionist',
      description: '20 first-try completions',
      icon: '💯',
      category: 'skill',
    },
    {
      name: 'Course Finisher',
      description: 'Complete all lessons',
      icon: '🎓',
      category: 'progress',
    },
    {
      name: 'Half Century',
      description: 'Complete 50 questions',
      icon: '🏅',
      category: 'progress',
    },
    {
      name: 'Consistency King',
      description: '30-day streak',
      icon: '👑',
      category: 'progress',
    },
    {
      name: 'Night Owl',
      description: '50 queries after 10 PM',
      icon: '🦉',
      category: 'special',
    },
    {
      name: 'Early Bird',
      description: '50 queries before 8 AM',
      icon: '🐦',
      category: 'special',
    },
  ];

  await db.insert(badges).values(badgeData);
  console.log('✅ Badges seeded');

  // Seed courses
  const courseData = [
    {
      title: 'SQL Foundations',
      description: 'Master the basics of SQL with SELECT, WHERE, ORDER BY, and aggregate functions',
      difficulty: 'beginner',
      order: 1,
    },
    {
      title: 'Mastering JOINs',
      description: 'Learn to combine data from multiple tables using various JOIN types',
      difficulty: 'intermediate',
      order: 2,
    },
    {
      title: 'Advanced SQL Techniques',
      description: 'Dive into CTEs, window functions, and complex analytical queries',
      difficulty: 'advanced',
      order: 3,
    },
  ];

  const insertedCourses = await db.insert(courses).values(courseData).returning();
  console.log('✅ Courses seeded');

  // Seed lessons for first course
  const foundationLessons = [
    {
      courseId: insertedCourses[0].id,
      title: 'Introduction to SQL',
      content: `# Introduction to SQL

SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.

## What You'll Learn
- What is a database?
- What is SQL?
- How to write your first query

## Your First Query

\`\`\`sql
SELECT * FROM users;
\`\`\`

This query selects all columns from the users table.`,
      order: 1,
      estimatedMinutes: 10,
    },
    {
      courseId: insertedCourses[0].id,
      title: 'SELECT Statements',
      content: `# SELECT Statements

The SELECT statement is used to retrieve data from a database.

## Basic Syntax

\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

## Selecting All Columns

\`\`\`sql
SELECT * FROM table_name;
\`\`\`

## Selecting Specific Columns

\`\`\`sql
SELECT name, email FROM users;
\`\`\``,
      order: 2,
      estimatedMinutes: 15,
    },
    {
      courseId: insertedCourses[0].id,
      title: 'Filtering with WHERE',
      content: `# Filtering with WHERE

The WHERE clause is used to filter records based on conditions.

## Basic Syntax

\`\`\`sql
SELECT * FROM users WHERE age > 18;
\`\`\`

## Comparison Operators
- \`=\` Equal
- \`<>\` or \`!=\` Not equal
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal
- \`<=\` Less than or equal

## Logical Operators
- \`AND\` - Both conditions must be true
- \`OR\` - At least one condition must be true
- \`NOT\` - Negates a condition`,
      order: 3,
      estimatedMinutes: 20,
    },
  ];

  await db.insert(lessons).values(foundationLessons);
  console.log('✅ Lessons seeded');

  // Seed sample questions
  const questionData = [
    {
      title: 'Select All Customers',
      slug: 'select-all-customers',
      difficulty: 'beginner',
      description: 'Write a query to select all columns from the `customers` table.',
      sampleSchema: `CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  city VARCHAR(50)
);

INSERT INTO customers VALUES
(1, 'Alice Johnson', 'alice@email.com', 'New York'),
(2, 'Bob Smith', 'bob@email.com', 'Los Angeles'),
(3, 'Carol White', 'carol@email.com', 'Chicago');`,
      expectedOutput: JSON.stringify([
        { customer_id: 1, name: 'Alice Johnson', email: 'alice@email.com', city: 'New York' },
        { customer_id: 2, name: 'Bob Smith', email: 'bob@email.com', city: 'Los Angeles' },
        { customer_id: 3, name: 'Carol White', email: 'carol@email.com', city: 'Chicago' },
      ]),
      pointsReward: 50,
      order: 1,
      topics: ['select', 'basics'],
    },
    {
      title: 'Filter by City',
      slug: 'filter-by-city',
      difficulty: 'beginner',
      description: "Write a query to select all customers who live in 'New York'.",
      sampleSchema: `CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  city VARCHAR(50)
);

INSERT INTO customers VALUES
(1, 'Alice Johnson', 'alice@email.com', 'New York'),
(2, 'Bob Smith', 'bob@email.com', 'Los Angeles'),
(3, 'David Brown', 'david@email.com', 'New York');`,
      expectedOutput: JSON.stringify([
        { customer_id: 1, name: 'Alice Johnson', email: 'alice@email.com', city: 'New York' },
        { customer_id: 3, name: 'David Brown', email: 'david@email.com', city: 'New York' },
      ]),
      pointsReward: 50,
      order: 2,
      topics: ['select', 'where', 'filtering'],
    },
    {
      title: 'Count Total Orders',
      slug: 'count-total-orders',
      difficulty: 'beginner',
      description: 'Write a query to count the total number of orders in the `orders` table.',
      sampleSchema: `CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  total DECIMAL(10,2)
);

INSERT INTO orders VALUES
(1, 1, '2024-01-15', 150.00),
(2, 2, '2024-01-16', 250.00),
(3, 1, '2024-01-17', 75.00),
(4, 3, '2024-01-18', 300.00),
(5, 2, '2024-01-19', 125.00);`,
      expectedOutput: JSON.stringify([{ count: 5 }]),
      pointsReward: 50,
      order: 3,
      topics: ['aggregate', 'count'],
    },
    {
      title: 'Basic INNER JOIN',
      slug: 'basic-inner-join',
      difficulty: 'intermediate',
      description: 'Write a query to get customer names with their order totals using INNER JOIN.',
      sampleSchema: `CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  total DECIMAL(10,2)
);

INSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Carol');
INSERT INTO orders VALUES (1, 1, 100.00), (2, 1, 200.00), (3, 2, 150.00);`,
      expectedOutput: JSON.stringify([
        { name: 'Alice', total: 100.0 },
        { name: 'Alice', total: 200.0 },
        { name: 'Bob', total: 150.0 },
      ]),
      pointsReward: 100,
      order: 4,
      topics: ['join', 'inner-join'],
    },
    {
      title: 'Window Function - Row Number',
      slug: 'window-row-number',
      difficulty: 'advanced',
      description: 'Use ROW_NUMBER() to assign a sequential number to each order per customer.',
      sampleSchema: `CREATE TABLE orders (
  order_id INT,
  customer_id INT,
  order_date DATE
);

INSERT INTO orders VALUES
(1, 1, '2024-01-01'),
(2, 1, '2024-01-05'),
(3, 2, '2024-01-03'),
(4, 2, '2024-01-07');`,
      expectedOutput: JSON.stringify([
        { order_id: 1, customer_id: 1, row_num: 1 },
        { order_id: 2, customer_id: 1, row_num: 2 },
        { order_id: 3, customer_id: 2, row_num: 1 },
        { order_id: 4, customer_id: 2, row_num: 2 },
      ]),
      pointsReward: 200,
      order: 5,
      topics: ['window-functions', 'row-number'],
    },
  ];

  const insertedQuestions = await db.insert(questions).values(questionData).returning();
  console.log('✅ Questions seeded');

  // Seed hints for questions
  const hintData = [
    {
      questionId: insertedQuestions[0].id,
      level: 1,
      content: 'Use the SELECT statement with an asterisk (*) to select all columns.',
      pointsCost: 5,
      order: 1,
    },
    {
      questionId: insertedQuestions[0].id,
      level: 2,
      content: 'The syntax is: SELECT * FROM table_name',
      pointsCost: 15,
      order: 2,
    },
    {
      questionId: insertedQuestions[1].id,
      level: 1,
      content: 'Use the WHERE clause to filter results.',
      pointsCost: 5,
      order: 1,
    },
    {
      questionId: insertedQuestions[1].id,
      level: 2,
      content: "Compare the city column to 'New York' using the = operator.",
      pointsCost: 15,
      order: 2,
    },
    {
      questionId: insertedQuestions[2].id,
      level: 1,
      content: 'Use the COUNT() aggregate function.',
      pointsCost: 5,
      order: 1,
    },
    {
      questionId: insertedQuestions[3].id,
      level: 1,
      content: 'INNER JOIN returns only matching rows from both tables.',
      pointsCost: 5,
      order: 1,
    },
    {
      questionId: insertedQuestions[3].id,
      level: 2,
      content: 'Join ON customers.customer_id = orders.customer_id',
      pointsCost: 15,
      order: 2,
    },
    {
      questionId: insertedQuestions[4].id,
      level: 1,
      content: 'ROW_NUMBER() assigns a unique number to each row within a partition.',
      pointsCost: 5,
      order: 1,
    },
    {
      questionId: insertedQuestions[4].id,
      level: 2,
      content: 'Use PARTITION BY customer_id to restart numbering for each customer.',
      pointsCost: 15,
      order: 2,
    },
  ];

  await db.insert(hints).values(hintData);
  console.log('✅ Hints seeded');

  console.log('🎉 Database seeding complete!');
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
