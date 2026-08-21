import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, Envelope, Phone, MapPin } from '@/components/icons';
import { PROFILE } from '@/constants/profile';
import { SECTIONS_CHANGED_EVENT } from '@/constants/sections';
import { submitContactForm } from '@/lib/contactForm';
import {
  contactFormSchema,
  validateContactForm,
  type ContactFormValues,
} from '@/lib/contactFormSchema';
import YandexSmartCaptcha from '@/components/YandexSmartCaptcha';
import { trackGoal } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const CAPTCHA_CLIENT_KEY = import.meta.env.VITE_YANDEX_SMARTCAPTCHA_CLIENT_KEY ?? '';

const formFieldsSchema = contactFormSchema.pick({
  name: true,
  email: true,
  message: true,
  company: true,
});

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formStartedAt = useRef(Date.now());

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(formFieldsSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      company: '',
    },
    mode: 'onTouched',
  });

  // Секция грузится отдельным чанком — сообщаем аналитике, что якорь появился
  useEffect(() => {
    window.dispatchEvent(new Event(SECTIONS_CHANGED_EVENT));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
      });
      gsap.from(formRef.current, {
        y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true },
      });
      gsap.from(infoRef.current?.children || [], {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const resetCaptcha = () => {
    setCaptchaToken('');
    setCaptchaResetKey((prev) => prev + 1);
  };

  const onSubmit = handleSubmit(async (values) => {
    setStatus('sending');
    setStatusMessage('');

    const validation = validateContactForm(
      {
        ...values,
        captchaToken,
        formStartedAt: formStartedAt.current,
      },
      { requireCaptcha: Boolean(CAPTCHA_CLIENT_KEY) },
    );

    if (validation.ok === false) {
      setStatus('error');
      setStatusMessage(validation.message);
      if (validation.field === 'name' || validation.field === 'email' || validation.field === 'message') {
        setError(validation.field, { message: validation.message });
      }
      return;
    }

    const result = await submitContactForm({
      ...validation.data,
      captchaToken: captchaToken || undefined,
      formStartedAt: formStartedAt.current,
    });

    if (result.ok) {
      trackGoal('contact_form');
      setStatus('success');
      setStatusMessage('Сообщение отправлено! Отвечу в ближайшее время.');
      reset({ name: '', email: '', message: '', company: '' });
      formStartedAt.current = Date.now();
      resetCaptcha();
      return;
    }

    if (result.ok === false) {
      setStatus('error');
      setStatusMessage(result.message);
      const field = result.field;
      if (field === 'name' || field === 'email' || field === 'message') {
        setError(field, { message: result.message });
      }
      resetCaptcha();
    }
  });

  const fieldError = (name: keyof ContactFormValues) =>
    errors[name] ? (
      <p className="text-red-400 text-xs mt-1.5" role="alert">
        {errors[name]?.message}
      </p>
    ) : null;

  return (
    <section id="contact" ref={sectionRef} className="py-24">
      <div className="container">
        <div ref={titleRef} className="mb-16">
          <p className="section-label mb-3">Контакты</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Связаться со мной<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={formRef} className="card-flat relative">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="company">Компания</label>
                <input
                  type="text"
                  id="company"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('company')}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  maxLength={80}
                  className={`input-field ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Ваше имя"
                  {...register('name')}
                />
                {fieldError('name')}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  maxLength={254}
                  className={`input-field ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="ваш@email.com"
                  {...register('email')}
                />
                {fieldError('email')}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Сообщение</label>
                <textarea
                  id="message"
                  rows={6}
                  maxLength={2000}
                  className={`input-field resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Опишите задачу или вопрос"
                  {...register('message')}
                />
                {fieldError('message')}
              </div>

              {CAPTCHA_CLIENT_KEY ? (
                <div className="space-y-2">
                  <YandexSmartCaptcha
                    siteKey={CAPTCHA_CLIENT_KEY}
                    resetKey={captchaResetKey}
                    onSuccess={setCaptchaToken}
                    onExpired={resetCaptcha}
                    onNetworkError={() => {
                      setStatus('error');
                      setStatusMessage('Не удалось загрузить капчу. Обновите страницу.');
                      resetCaptcha();
                    }}
                  />
                  {!captchaToken && status === 'error' && statusMessage.includes('робот') && (
                    <p className="text-red-400 text-xs" role="alert">
                      Подтвердите, что вы не робот.
                    </p>
                  )}
                </div>
              ) : null}

              {statusMessage && (
                <p
                  role="status"
                  className={`text-sm px-4 py-3 border ${
                    status === 'success'
                      ? 'text-emerald-400 border-emerald-400/60 bg-emerald-500/15 shadow-[0_0_20px_hsl(152_76%_50%_/_0.15)]'
                      : 'text-red-400 border-red-500/30 bg-red-500/10'
                  }`}
                >
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || (Boolean(CAPTCHA_CLIENT_KEY) && !captchaToken)}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Отправка…' : 'Отправить сообщение'}
                <PaperPlaneTilt size={18} />
              </button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Открыт к предложениям по фронтенду: React, TypeScript, Next.js, Bitrix.
              Напишите о вакансии или проекте — отвечу в течение дня.
            </p>

            <div className="space-y-3">
              <div className="card-flat flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <Envelope size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Почта</p>
                  <a href={`mailto:${PROFILE.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {PROFILE.email}
                  </a>
                </div>
              </div>

              <div className="card-flat flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Телефон</p>
                  <a href={`tel:${PROFILE.phoneTel}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {PROFILE.phone}
                  </a>
                </div>
              </div>

              <div className="card-flat flex items-center gap-4">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Местоположение</p>
                  <p className="text-sm text-muted-foreground">{PROFILE.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
