import { Pool } from '@neondatabase/serverless';
import { ExecutionResult, QueryResult, QUERY_LIMITS } from './types';
import { validateQuery, sanitizeQuery } from './validator';
import { checkRateLimit } from './rate-limiter';
import { getSchemaName } from './schema-manager';

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL! });
}

export async function executeQuery(
  query: string,
  userId: string,
  questionSchemaSetup?: string
): Promise<ExecutionResult> {
  const rateLimitResult = checkRateLimit(userId);
  if (!rateLimitResult.allowed) {
    return {
      success: false,
      error: {
        type: 'rate_limit',
        message: 'Rate limit exceeded',
        details: `You can execute ${QUERY_LIMITS.RATE_LIMIT_PER_MINUTE} queries per minute. Try again at ${rateLimitResult.resetAt.toISOString()}`,
      },
    };
  }

  const sanitizedQuery = sanitizeQuery(query);
  const validation = validateQuery(sanitizedQuery);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const pool = getPool();
  const schemaName = getSchemaName(userId);
  const startTime = performance.now();

  try {
    const client = await pool.connect();

    try {
      await client.query(`SET statement_timeout = ${QUERY_LIMITS.TIMEOUT_MS}`);

      if (questionSchemaSetup) {
        await client.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
        await client.query(`CREATE SCHEMA "${schemaName}"`);
        await client.query(`SET search_path TO "${schemaName}", public`);

        const statements = questionSchemaSetup
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        for (const statement of statements) {
          await client.query(statement);
        }
      } else {
        await client.query(`SET search_path TO "${schemaName}", public`);
      }

      const limitedQuery = applyRowLimit(sanitizedQuery);
      const queryResult = await client.query(limitedQuery);
      const rows = queryResult.rows as Record<string, unknown>[];

      const executionTime = Math.round(performance.now() - startTime);
      const fields = rows.length > 0 ? Object.keys(rows[0]) : [];

      const result: QueryResult = {
        rows,
        rowCount: rows.length,
        executionTime,
        fields,
      };

      return {
        success: true,
        data: result,
      };
    } finally {
      client.release();
    }
  } catch (error) {
    const executionTime = Math.round(performance.now() - startTime);

    if (error instanceof Error) {
      if (error.message.includes('statement timeout') || executionTime >= QUERY_LIMITS.TIMEOUT_MS) {
        return {
          success: false,
          error: {
            type: 'timeout',
            message: 'Query execution timed out',
            details: `Query exceeded the ${QUERY_LIMITS.TIMEOUT_MS / 1000} second time limit`,
          },
        };
      }

      return {
        success: false,
        error: {
          type: 'execution',
          message: 'Query execution failed',
          details: error.message,
        },
      };
    }

    return {
      success: false,
      error: {
        type: 'execution',
        message: 'An unexpected error occurred',
      },
    };
  } finally {
    await pool.end();
  }
}

function applyRowLimit(query: string): string {
  const upperQuery = query.toUpperCase();

  if (upperQuery.includes(' LIMIT ')) {
    const limitMatch = upperQuery.match(/LIMIT\s+(\d+)/);
    if (limitMatch) {
      const currentLimit = parseInt(limitMatch[1], 10);
      if (currentLimit > QUERY_LIMITS.MAX_ROWS) {
        return query.replace(/LIMIT\s+\d+/i, `LIMIT ${QUERY_LIMITS.MAX_ROWS}`);
      }
    }
    return query;
  }

  return `${query.replace(/;?\s*$/, '')} LIMIT ${QUERY_LIMITS.MAX_ROWS}`;
}

export async function compareQueryResults(
  userQuery: string,
  expectedQuery: string,
  userId: string,
  schemaSetup: string
): Promise<{ match: boolean; userResult: ExecutionResult; expectedResult: ExecutionResult }> {
  const userResult = await executeQuery(userQuery, userId, schemaSetup);

  if (!userResult.success) {
    return {
      match: false,
      userResult,
      expectedResult: { success: false },
    };
  }

  const expectedResult = await executeQuery(expectedQuery, userId, schemaSetup);

  if (!expectedResult.success || !userResult.data || !expectedResult.data) {
    return {
      match: false,
      userResult,
      expectedResult,
    };
  }

  const match = compareResults(userResult.data.rows, expectedResult.data.rows);

  return {
    match,
    userResult,
    expectedResult,
  };
}

function compareResults(
  userRows: Record<string, unknown>[],
  expectedRows: Record<string, unknown>[]
): boolean {
  if (userRows.length !== expectedRows.length) {
    return false;
  }

  const normalizeRow = (row: Record<string, unknown>) =>
    JSON.stringify(
      Object.entries(row)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k.toLowerCase(), v])
    );

  const userNormalized = userRows.map(normalizeRow).sort();
  const expectedNormalized = expectedRows.map(normalizeRow).sort();

  return userNormalized.every((row, i) => row === expectedNormalized[i]);
}
