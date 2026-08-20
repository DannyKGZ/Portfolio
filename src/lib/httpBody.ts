import type { IncomingMessage } from 'node:http';

/** 16 КБ с запасом хватает форме: имя + email + 2000 символов сообщения + токен капчи. */
export const MAX_CONTACT_BODY_BYTES = 16 * 1024;

export class PayloadTooLargeError extends Error {
  constructor() {
    super('Payload too large');
    this.name = 'PayloadTooLargeError';
  }
}

/**
 * Читает JSON-тело с жёстким лимитом размера: при превышении соединение рвётся,
 * а не продолжает набивать память (как это было раньше).
 */
export function readJsonBody<T>(req: IncomingMessage, maxBytes = MAX_CONTACT_BODY_BYTES): Promise<T> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    let settled = false;

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      fn();
    };

    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > maxBytes) {
        finish(() => {
          req.destroy();
          reject(new PayloadTooLargeError());
        });
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      finish(() => {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (!raw) {
          resolve({} as T);
          return;
        }
        try {
          resolve(JSON.parse(raw) as T);
        } catch {
          reject(new Error('Invalid JSON'));
        }
      });
    });

    req.on('error', (error) => finish(() => reject(error)));
  });
}
