import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById('root');

function showBootError(message: string) {
  if (!rootEl) return;
  rootEl.innerHTML = `<pre style="margin:0;padding:2rem;color:#f87171;background:#0a0a0a;min-height:100vh;white-space:pre-wrap;font-family:Consolas,monospace;">${message}</pre>`;
}

if (!rootEl) {
  showBootError('Ошибка: не найден контейнер #root');
} else {
  createRoot(rootEl).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
}

window.addEventListener('error', (event) => {
  console.error(event.error ?? event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error(event.reason);
});
