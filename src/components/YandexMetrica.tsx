import { useEffect } from 'react';
import { getYandexMetricaId } from '@/lib/analytics';

const YandexMetrica = () => {
  const counterId = getYandexMetricaId();

  useEffect(() => {
    const id = Number(counterId);
    if (!Number.isFinite(id) || id <= 0) return;

    window.dataLayer = window.dataLayer || [];

    const scriptSrc = `https://mc.yandex.ru/metrika/tag.js?id=${id}`;

    if (typeof window.ym !== 'function') {
      const loader = window as Window & {
        ym?: { a?: unknown[]; l?: number } & ((...args: unknown[]) => void);
      };

      loader.ym =
        loader.ym ||
        function (...args: unknown[]) {
          (loader.ym!.a = loader.ym!.a || []).push(args);
        };
      loader.ym.l = Date.now();

      const alreadyLoaded = Array.from(document.scripts).some((script) => script.src === scriptSrc);
      if (!alreadyLoaded) {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptSrc;
        document.head.appendChild(script);
      }
    }

    window.ym?.(id, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });
  }, [counterId]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
};

export default YandexMetrica;
