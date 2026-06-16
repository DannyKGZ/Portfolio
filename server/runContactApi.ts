import { createServer, type IncomingMessage } from 'node:http';
import { loadEnv } from 'vite';
import { handleContactSubmission } from '../src/lib/contactFormServer';
import { getWeb3FormsAccessKeyFromEnv } from '../src/lib/contactFormConfig.server';
import type { ContactFormPayload } from '../src/lib/contactFormSchema';

const env = loadEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development', process.cwd(), '');
const PORT = Number(process.env.CONTACT_API_PORT || 8787);

function readJson(req: IncomingMessage): Promise<ContactFormPayload> {
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

createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url !== '/api/contact' || req.method !== 'POST') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, message: 'Not found' }));
    return;
  }

  try {
    const payload = await readJson(req);
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

    res.writeHead(result.ok ? 200 : result.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result.ok ? { ok: true } : { ok: false, message: result.message, field: result.field }));
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, message: 'Некорректный запрос.' }));
  }
}).listen(PORT, () => {
  console.log(`Contact API: http://localhost:${PORT}/api/contact`);
});
