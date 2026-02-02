export interface QueryResult {
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTime: number;
  fields: string[];
}

export interface QueryError {
  type: 'syntax' | 'security' | 'timeout' | 'limit' | 'rate_limit' | 'execution';
  message: string;
  details?: string;
}

export interface ExecutionResult {
  success: boolean;
  data?: QueryResult;
  error?: QueryError;
}

export interface ValidationResult {
  valid: boolean;
  error?: QueryError;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export interface UserSchema {
  schemaName: string;
  userId: string;
}

export const QUERY_LIMITS = {
  TIMEOUT_MS: 10000,
  MAX_ROWS: 1000,
  RATE_LIMIT_PER_MINUTE: 10,
} as const;

export const FORBIDDEN_KEYWORDS = [
  'INSERT',
  'UPDATE',
  'DELETE',
  'DROP',
  'CREATE',
  'ALTER',
  'TRUNCATE',
  'GRANT',
  'REVOKE',
  'EXECUTE',
  'COPY',
  'CALL',
  'DO',
  'SET',
  'RESET',
  'VACUUM',
  'ANALYZE',
  'CLUSTER',
  'COMMENT',
  'LOCK',
  'PREPARE',
  'DEALLOCATE',
  'LISTEN',
  'NOTIFY',
  'UNLISTEN',
  'LOAD',
  'REINDEX',
  'REFRESH',
  'SECURITY',
  'REASSIGN',
  'DISCARD',
] as const;
