import type { Plugin, PreviewServer, ViteDevServer } from 'vite';
import { handleContactRequest } from './server/contactRequestHandler';

function attachContactApi(server: ViteDevServer | PreviewServer, env: Record<string, string>) {
  server.middlewares.use('/api/contact', (req, res, next) => {
    if (req.method !== 'POST' && req.method !== 'OPTIONS') {
      next();
      return;
    }

    void handleContactRequest(req, res, env);
  });
}

/**
 * Локальный /api/contact для `npm run dev` и `npm run preview`.
 * В проде тот же обработчик поднимается отдельным процессом: `npm run start:api`.
 */
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
