export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/** Публичный ключ Web3Forms — fallback, если .env не задан. */
export const DEFAULT_WEB3FORMS_ACCESS_KEY = 'e4d1d56e-3254-40b3-b162-67284e142c4e';

export function getWeb3FormsAccessKey(): string {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_ACCESS_KEY;
}
