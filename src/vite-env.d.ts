/// <reference types="vite/client" />

interface Window {
  dataLayer?: unknown[];
}

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY?: string;
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_YANDEX_METRICA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
