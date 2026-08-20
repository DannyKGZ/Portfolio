import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleContactSubmission } from '../src/lib/contactFormServer';
import { getWeb3FormsAccessKeyFromEnv } from '../src/lib/contactFormConfig.server';
import { PayloadTooLargeError, readJsonBody } from '../src/lib/httpBody';
import { createRateLimiter, getClientIp } from '../src/lib/rateLimit';
import type { ContactFormPayload } from '../src/lib/contactFormSchema';

/** Не больше 2 отправок за 30 секунд с одного IP */
const burstLimiter = createRateLimiter({ limit: 2, windowMs: 30_000 });
/** И не больше 5 за 10 минут */
const ipLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });
/** Общий предохранитель на весь процесс — против распределённого спама */
const globalLimiter = createRateLimiter({ limit: 60, windowMs: 60_000, maxKeys: 4 });

const DEFAULT_ORIGINS = [
  'https://rrysbekov.ru',
  'https://www.rrysbekov.ru',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];

function getAllowedOrigins(env: Record<string, string>): string[] {
  const raw = env.CONTACT_ALLOWED_ORIGINS?.trim();
  if (!raw) return DEFAULT_ORIGINS;
  return raw.split(',').map((item) => item.trim()).filter(Boolean);
}

function applyBaseHeaders(res: ServerResponse, allowedOrigin?: string) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Vary', 'Origin');

  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');
  }
}

function sendJson(res: ServerResponse, status: number, body: unknown, allowedOrigin?: string) {
  applyBaseHeaders(res, allowedOrigin);
  res.statusCode = status;
  res.end(JSON.stringify(body));
}

/**
 * Общий обработчик POST /api/contact — используется и dev-сервером Vite,
 * и отдельным Node-процессом в проде. Логика одна, расхождений быть не может.
 */
export async function handleContactRequest(
  req: IncomingMessage,
  res: ServerResponse,
  env: Record<string, string>,
): Promise<void> {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins(env);
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : undefined;

  if (req.method === 'OPTIONS') {
    applyBaseHeaders(res, allowedOrigin);
    res.statusCode = allowedOrigin ? 204 : 403;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    sendJson(res, 405, { ok: false, message: 'Метод не поддерживается.' }, allowedOrigin);
    return;
  }

  // Кросс-доменные POST принимаем только с известных origin
  if (origin && !allowedOrigin) {
    sendJson(res, 403, { ok: false, message: 'Запрос отклонён.' });
    return;
  }

  if (!globalLimiter('all').ok) {
    res.setHeader('Retry-After', '60');
    sendJson(res, 503, { ok: false, message: 'Сервис перегружен, попробуйте через минуту.' }, allowedOrigin);
    return;
  }

  const ip = getClientIp(req.headers, req.socket.remoteAddress ?? undefined);

  const burst = burstLimiter(ip);
  if (!burst.ok) {
    res.setHeader('Retry-After', String(burst.retryAfterSec));
    sendJson(res, 429, { ok: false, message: 'Слишком часто. Подождите немного.' }, allowedOrigin);
    return;
  }

  const perIp = ipLimiter(ip);
  if (!perIp.ok) {
    res.setHeader('Retry-After', String(perIp.retryAfterSec));
    sendJson(
      res,
      429,
      { ok: false, message: 'Слишком много сообщений. Попробуйте позже или напишите на почту.' },
      allowedOrigin,
    );
    return;
  }

  let payload: ContactFormPayload;
  try {
    payload = await readJsonBody<ContactFormPayload>(req);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      sendJson(res, 413, { ok: false, message: 'Сообщение слишком большое.' }, allowedOrigin);
      return;
    }
    sendJson(res, 400, { ok: false, message: 'Некорректный запрос.' }, allowedOrigin);
    return;
  }

  try {
    const result = await handleContactSubmission(
      payload,
      {
        web3formsAccessKey: getWeb3FormsAccessKeyFromEnv(env),
        yandexCaptchaServerKey: env.YANDEX_SMARTCAPTCHA_SERVER_KEY,
        yandexCaptchaClientKey: env.VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY,
      },
      ip,
    );

    if (result.ok) {
      sendJson(res, 200, { ok: true }, allowedOrigin);
      return;
    }

    sendJson(res, result.status, { ok: false, message: result.message, field: result.field }, allowedOrigin);
  } catch {
    sendJson(res, 500, { ok: false, message: 'Внутренняя ошибка. Напишите на почту напрямую.' }, allowedOrigin);
  }
}
