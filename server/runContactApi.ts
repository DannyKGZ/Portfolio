import { createServer } from 'node:http';
import { loadEnv } from 'vite';
import { handleContactRequest } from './contactRequestHandler';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');

const PORT = Number(process.env.CONTACT_API_PORT || 8787);
// По умолчанию слушаем только localhost: наружу порт публикует nginx
const HOST = process.env.CONTACT_API_HOST || '127.0.0.1';

const server = createServer((req, res) => {
  if (req.url === '/health' || req.url === '/api/contact/health') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ok: true, uptime: Math.round(process.uptime()) }));
    return;
  }

  const path = (req.url || '').split('?')[0];
  if (path !== '/api/contact') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, message: 'Not found' }));
    return;
  }

  void handleContactRequest(req, res, env);
});

// Обрываем медленные и висящие соединения — базовая защита от slowloris
server.headersTimeout = 10_000;
server.requestTimeout = 15_000;
server.keepAliveTimeout = 5_000;
server.maxHeadersCount = 50;

server.listen(PORT, HOST, () => {
  console.log(`Contact API: http://${HOST}:${PORT}/api/contact (${mode})`);
});

function shutdown(signal: string) {
  console.log(`${signal} — останавливаю Contact API`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
