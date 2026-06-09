export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// Access key Web3Forms — публичный, безопасен в клиентском коде
const DEFAULT_ACCESS_KEY = 'e4d1d56e-3254-40b3-b162-67284e142c4e';

export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || DEFAULT_ACCESS_KEY;

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name,
        email: data.email,
        message: data.message,
        subject: `Портфолио: сообщение от ${data.name}`,
        from_name: 'Портфолио Рысбеков Руслан',
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        ok: false,
        message: result.message ?? 'Не удалось отправить сообщение. Попробуйте позже.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: 'Ошибка сети. Проверьте интернет или напишите на почту напрямую.',
    };
  }
}
