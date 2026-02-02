import { parse, Statement } from 'pgsql-ast-parser';
import { ValidationResult, FORBIDDEN_KEYWORDS } from './types';

export function validateQuery(query: string): ValidationResult {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      valid: false,
      error: {
        type: 'syntax',
        message: 'Query cannot be empty',
      },
    };
  }

  const upperQuery = trimmedQuery.toUpperCase();
  for (const keyword of FORBIDDEN_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(upperQuery)) {
      return {
        valid: false,
        error: {
          type: 'security',
          message: `Forbidden operation: ${keyword} statements are not allowed`,
          details: 'Only SELECT queries are permitted in this environment',
        },
      };
    }
  }

  if (upperQuery.includes('--') || upperQuery.includes('/*')) {
    const commentRegex = /--.*$|\/\*[\s\S]*?\*\//gm;
    const withoutComments = trimmedQuery.replace(commentRegex, ' ').trim();
    if (!withoutComments) {
      return {
        valid: false,
        error: {
          type: 'syntax',
          message: 'Query cannot contain only comments',
        },
      };
    }
  }

  let ast: Statement[];
  try {
    ast = parse(trimmedQuery);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown parsing error';
    return {
      valid: false,
      error: {
        type: 'syntax',
        message: 'Invalid SQL syntax',
        details: errorMessage,
      },
    };
  }

  if (ast.length === 0) {
    return {
      valid: false,
      error: {
        type: 'syntax',
        message: 'No valid SQL statements found',
      },
    };
  }

  if (ast.length > 1) {
    return {
      valid: false,
      error: {
        type: 'security',
        message: 'Only single statements are allowed',
        details: 'Please submit one query at a time',
      },
    };
  }

  const statement = ast[0];
  if (statement.type !== 'select') {
    return {
      valid: false,
      error: {
        type: 'security',
        message: `Only SELECT statements are allowed, got: ${statement.type.toUpperCase()}`,
      },
    };
  }

  return { valid: true };
}

export function sanitizeQuery(query: string): string {
  return query
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}
