/**
 * Константы формы. Без обращений к import.meta.env — файл общий
 * для браузера и Node-процесса API, у которых разные окружения.
 */
export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/** Публичный ключ Web3Forms — fallback, если .env не задан. */
export const DEFAULT_WEB3FORMS_ACCESS_KEY = 'e4d1d56e-3254-40b3-b162-67284e142c4e';
