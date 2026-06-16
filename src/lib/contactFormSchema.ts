import { z } from 'zod';

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'yopmail.com',
  'throwaway.email',
  'temp-mail.org',
]);

const SPAM_KEYWORDS = [
  'viagra',
  'casino',
  'crypto airdrop',
  'click here now',
  'buy followers',
  'seo services cheap',
];

const URL_REGEX = /https?:\/\/|www\./gi;

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Имя должно содержать минимум 2 символа')
  .max(80, 'Имя не должно превышать 80 символов')
  .refine((value) => /[\p{L}]/u.test(value), 'Укажите имя буквами')
  .refine((value) => !/https?:\/\//i.test(value), 'Имя не должно содержать ссылки')
  .refine((value) => !/[<>{}]/.test(value), 'Имя содержит недопустимые символы');

const emailSchema = z
  .string()
  .trim()
  .min(5, 'Укажите email')
  .max(254, 'Email слишком длинный')
  .email('Некорректный формат email')
  .refine((value) => {
    const domain = value.split('@')[1]?.toLowerCase();
    return domain ? !DISPOSABLE_EMAIL_DOMAINS.has(domain) : true;
  }, 'Временные email-адреса не принимаются');

const messageSchema = z
  .string()
  .trim()
  .min(10, 'Сообщение должно быть не короче 10 символов')
  .max(2000, 'Сообщение не должно превышать 2000 символов')
  .refine((value) => !/<[^>]+>/.test(value), 'HTML-теги в сообщении запрещены')
  .refine((value) => {
    const urls = value.match(URL_REGEX);
    return !urls || urls.length <= 3;
  }, 'Слишком много ссылок в сообщении')
  .refine((value) => {
    const lower = value.toLowerCase();
    return !SPAM_KEYWORDS.some((word) => lower.includes(word));
  }, 'Сообщение похоже на спам')
  .refine((value) => !/^(.)\1{8,}$/u.test(value.replace(/\s/g, '')), 'Сообщение выглядит некорректно');

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  company: z.string().optional(),
  formStartedAt: z.number().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormPayload = ContactFormValues & {
  captchaToken?: string;
};

export function validateContactForm(
  data: ContactFormPayload,
  options?: { requireCaptcha?: boolean; minFillMs?: number },
): { ok: true; data: ContactFormValues } | { ok: false; message: string; field?: keyof ContactFormValues } {
  if (data.company?.trim()) {
    return { ok: false, message: 'Не удалось отправить форму.' };
  }

  const minFillMs = options?.minFillMs ?? 3000;
  if (data.formStartedAt && Date.now() - data.formStartedAt < minFillMs) {
    return { ok: false, message: 'Подождите несколько секунд перед отправкой.' };
  }

  if (options?.requireCaptcha && !data.captchaToken?.trim()) {
    return { ok: false, message: 'Подтвердите, что вы не робот.' };
  }

  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue.path[0];
    return {
      ok: false,
      message: issue.message,
      field: typeof field === 'string' ? (field as keyof ContactFormValues) : undefined,
    };
  }

  return { ok: true, data: parsed.data };
}
