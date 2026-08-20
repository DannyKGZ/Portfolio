/**
 * Лимитер запросов в памяти процесса: защищает /api/contact от перебора и спама.
 * Без внешних зависимостей — достаточно для одного Node-процесса за nginx.
 */

type Bucket = { count: number; resetAt: number };

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

export type RateLimiterOptions = {
  /** Сколько запросов разрешено в окне */
  limit: number;
  /** Длина окна в миллисекундах */
  windowMs: number;
  /** Максимум отслеживаемых ключей — страховка от переполнения памяти */
  maxKeys?: number;
};

export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: RateLimiterOptions) {
  const buckets = new Map<string, Bucket>();

  function sweep(now: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  return function check(key: string): RateLimitResult {
    const now = Date.now();

    if (buckets.size > maxKeys) sweep(now);

    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, remaining: limit - 1 };
    }

    if (bucket.count >= limit) {
      return { ok: false, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
    }

    bucket.count += 1;
    return { ok: true, remaining: limit - bucket.count };
  };
}

/** Реальный IP клиента: за nginx/Cloudflare берём первый адрес из X-Forwarded-For. */
export function getClientIp(
  headers: Record<string, string | string[] | undefined>,
  fallback?: string,
): string {
  const cfIp = headers['cf-connecting-ip'];
  if (typeof cfIp === 'string' && cfIp.trim()) return cfIp.trim();

  const realIp = headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) return realIp.trim();

  const forwarded = headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(',')[0]?.trim();

  return first || fallback || 'unknown';
}
