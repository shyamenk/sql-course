import { RateLimitResult, QUERY_LIMITS } from './types';

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000;

export function checkRateLimit(userId: string): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(userId);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    rateLimitStore.set(userId, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: QUERY_LIMITS.RATE_LIMIT_PER_MINUTE - 1,
      resetAt: new Date(now + WINDOW_MS),
    };
  }

  if (entry.count >= QUERY_LIMITS.RATE_LIMIT_PER_MINUTE) {
    const resetAt = new Date(entry.windowStart + WINDOW_MS);
    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }

  entry.count++;
  rateLimitStore.set(userId, entry);

  return {
    allowed: true,
    remaining: QUERY_LIMITS.RATE_LIMIT_PER_MINUTE - entry.count,
    resetAt: new Date(entry.windowStart + WINDOW_MS),
  };
}

export function resetRateLimit(userId: string): void {
  rateLimitStore.delete(userId);
}

export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [userId, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart >= WINDOW_MS) {
      rateLimitStore.delete(userId);
    }
  }
}

if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, WINDOW_MS);
}
