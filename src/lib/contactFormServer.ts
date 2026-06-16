import { validateContactForm, type ContactFormPayload } from './contactFormSchema';
import { validateYandexCaptchaToken } from './yandexCaptchaValidate';
import { DEFAULT_WEB3FORMS_ACCESS_KEY, WEB3FORMS_URL } from './contactFormConfig';

type ContactApiEnv = {
  web3formsAccessKey: string;
  yandexCaptchaServerKey?: string;
  yandexCaptchaClientKey?: string;
};

type ContactApiResult =
  | { ok: true }
  | { ok: false; status: number; message: string; field?: string };

export async function handleContactSubmission(
  payload: ContactFormPayload,
  env: ContactApiEnv,
  ip?: string,
): Promise<ContactApiResult> {
  const requireCaptcha = Boolean(env.yandexCaptchaClientKey);

  const validation = validateContactForm(payload, { requireCaptcha });
  if (!validation.ok) {
    return { ok: false, status: 400, message: validation.message, field: validation.field };
  }

  if (requireCaptcha) {
    const captcha = await validateYandexCaptchaToken(
      payload.captchaToken ?? '',
      env.yandexCaptchaServerKey ?? '',
      ip,
    );

    if (!captcha.ok) {
      return { ok: false, status: 400, message: captcha.message };
    }
  }

  const accessKey = env.web3formsAccessKey || DEFAULT_WEB3FORMS_ACCESS_KEY;

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: validation.data.name,
        email: validation.data.email,
        message: validation.data.message,
        subject: `Портфолио: сообщение от ${validation.data.name}`,
        from_name: 'Портфолио Рысбеков Руслан',
      }),
    });

    const result = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !result.success) {
      return {
        ok: false,
        status: 502,
        message: result.message ?? 'Не удалось отправить сообщение. Попробуйте позже.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      status: 502,
      message: 'Ошибка сети. Проверьте интернет или напишите на почту напрямую.',
    };
  }
}
