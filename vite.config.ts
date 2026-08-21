import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { contactApiPlugin } from './vite.contactApi';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  return {
    // './' — сайт работает и в корне домена, и в подпапке
    base: './',

    server: {
      host: '::',
      port: 8080,
      // dev-сервер только для локальной разработки, в прод он не выкладывается
    },

    preview: {
      host: '127.0.0.1',
      port: 4173,
    },

    plugins: [react(), contactApiPlugin(env)],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    build: {
      target: 'es2020',
      // sourcemap в прод не выкладываем — это раздача исходников
      sourcemap: !isProd,
      cssCodeSplit: true,
      minify: 'esbuild',
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          // Разбиваем вендоров: браузер кэширует их отдельно от кода сайта.
          // Функция, а не объект — не ломает сборку, если пакет переименуют.
          manualChunks(id: string) {
            // На Windows пути приходят с обратными слэшами — приводим к одному виду
            const file = id.replace(/\\/g, '/');
            if (!file.includes('node_modules')) return undefined;
            if (/node_modules\/(react|react-dom|scheduler)\//.test(file)) return 'react';
            if (file.includes('node_modules/gsap')) return 'animation';
            if (/node_modules\/(react-hook-form|@hookform|zod)/.test(file)) return 'form';
            if (file.includes('node_modules/simple-icons')) return 'icons';
            return undefined;
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },

    esbuild: {
      drop: isProd ? ['debugger'] : [],
      legalComments: 'none',
    },
  };
});
