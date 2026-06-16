type CaptchaValidateResult =
  | { ok: true }
  | { ok: false; message: string };

export async function validateYandexCaptchaToken(
  token: string,
  serverKey: string,
  ip?: string,
): Promise<CaptchaValidateResult> {
  if (!serverKey) {
    return { ok: false, message: 'Капча не настроена на сервере.' };
  }

  if (!token.trim()) {
    return { ok: false, message: 'Подтвердите, что вы не робот.' };
  }

  const body = new URLSearchParams({
    secret: serverKey,
    token,
  });

  if (ip) body.set('ip', ip);

  try {
    const response = await fetch('https://smartcaptcha.cloud.yandex.ru/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const result = (await response.json()) as { status?: string; message?: string };

    if (result.status === 'ok') {
      return { ok: true };
    }

    return {
      ok: false,
      message: result.message ?? 'Проверка капчи не пройдена. Попробуйте ещё раз.',
    };
  } catch {
    return { ok: false, message: 'Не удалось проверить капчу. Попробуйте позже.' };
  }
}
