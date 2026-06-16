import type { Plugin, PreviewServer, ViteDevServer } from 'vite';
import { handleContactSubmission } from './src/lib/contactFormServer';
import { getWeb3FormsAccessKeyFromEnv } from './src/lib/contactFormConfig.server';
import type { ContactFormPayload } from './src/lib/contactFormSchema';

function readJsonBody(req: import('node:http').IncomingMessage): Promise<ContactFormPayload> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(raw ? (JSON.parse(raw) as ContactFormPayload) : ({} as ContactFormPayload));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function attachContactApi(
  server: ViteDevServer | PreviewServer,
  env: Record<string, string>,
) {
  server.middlewares.use('/api/contact', async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      next();
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.socket.remoteAddress;

      const result = await handleContactSubmission(
        payload,
        {
          web3formsAccessKey: getWeb3FormsAccessKeyFromEnv(env),
          yandexCaptchaServerKey: env.YANDEX_SMARTCAPTCHA_SERVER_KEY,
          yandexCaptchaClientKey: env.VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY,
        },
        ip,
      );

      res.statusCode = result.ok ? 200 : result.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result.ok ? { ok: true } : { ok: false, message: result.message, field: result.field }));
    } catch {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, message: 'Некорректный запрос.' }));
    }
  });
}

export function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      attachContactApi(server, env);
    },
    configurePreviewServer(server) {
      attachContactApi(server, env);
    },
  };
}
