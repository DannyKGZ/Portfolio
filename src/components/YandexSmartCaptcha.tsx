import { SmartCaptcha } from '@yandex/smart-captcha';

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
  <SmartCaptcha
    key={resetKey}
    sitekey={siteKey}
    onSuccess={onSuccess}
    onTokenExpired={onExpired}
    onNetworkError={onNetworkError}
  />
);

export default YandexSmartCaptcha;
