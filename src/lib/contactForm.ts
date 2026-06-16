import type { ContactFormPayload } from './contactFormSchema';
import {
  DEFAULT_WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_URL,
  getWeb3FormsAccessKey,
} from './contactFormConfig';

type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; field?: 'name' | 'email' | 'message' };

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
const CAPTCHA_CLIENT_KEY = import.meta.env.VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY ?? '';

function buildWeb3FormsBody(data: ContactFormPayload) {
  return {
    access_key: getWeb3FormsAccessKey(),
    name: data.name,
    email: data.email,
    message: data.message,
    subject: `Портфолио: сообщение от ${data.name}`,
    from_name: 'Портфолио Рысбеков Руслан',
  };
}

async function submitViaWeb3Forms(data: ContactFormPayload): Promise<SubmitResult> {
  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildWeb3FormsBody(data)),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    return {
      ok: false,
      message: result.message ?? 'Не удалось отправить сообщение. Попробуйте позже.',
    };
  }

  return { ok: true };
}

async function submitViaContactApi(data: ContactFormPayload): Promise<SubmitResult> {
  const response = await fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json()) as {
    ok?: boolean;
    message?: string;
    field?: keyof ContactFormPayload;
  };

  if (!response.ok || !result.ok) {
    return {
      ok: false,
      message: result.message ?? 'Не удалось отправить сообщение. Попробуйте позже.',
      field: result.field,
    };
  }

  return { ok: true };
}

export async function submitContactForm(data: ContactFormPayload): Promise<SubmitResult> {
  try {
    if (CAPTCHA_CLIENT_KEY) {
      return submitViaContactApi(data);
    }

    return submitViaWeb3Forms(data);
  } catch {
    return {
      ok: false,
      message: 'Ошибка сети. Проверьте интернет или напишите на почту напрямую.',
    };
  }
}

export type { ContactFormPayload } from './contactFormSchema';
export { DEFAULT_WEB3FORMS_ACCESS_KEY };
