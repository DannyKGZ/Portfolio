import { Suspense, lazy } from 'react';

// Капча грузится отдельным чанком и только когда реально нужна:
// без ключа VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY код в бандл не попадает.
const SmartCaptcha = lazy(() =>
  import('@yandex/smart-captcha').then((module) => ({ default: module.SmartCaptcha })),
);

type YandexSmartCaptchaProps = {
  siteKey: string;
  resetKey: number;
  onSuccess: (token: string) => void;
  onExpired: () => void;
  onNetworkError?: () => void;
};

const YandexSmartCaptcha = ({
  siteKey,
  resetKey,
  onSuccess,
  onExpired,
  onNetworkError,
}: YandexSmartCaptchaProps) => (
  <Suspense fallback={<div className="h-[102px] w-full border border-border/60 bg-input/40" aria-hidden />}>
    <SmartCaptcha
      key={resetKey}
      sitekey={siteKey}
      onSuccess={onSuccess}
      onTokenExpired={onExpired}
      onNetworkError={onNetworkError}
    />
  </Suspense>
);

export default YandexSmartCaptcha;
