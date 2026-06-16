import { DEFAULT_WEB3FORMS_ACCESS_KEY } from './contactFormConfig';

export { DEFAULT_WEB3FORMS_ACCESS_KEY, WEB3FORMS_URL } from './contactFormConfig';

export function getWeb3FormsAccessKeyFromEnv(env: Record<string, string>): string {
  return env.VITE_WEB3FORMS_ACCESS_KEY || env.WEB3FORMS_ACCESS_KEY || DEFAULT_WEB3FORMS_ACCESS_KEY;
}
