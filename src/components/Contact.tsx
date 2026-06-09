import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, Envelope, Phone, MapPin } from 'phosphor-react';
import { PROFILE } from '@/constants/profile';
import { submitContactForm } from '@/lib/contactForm';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    const result = await submitContactForm(formData);

    if (result.ok) {
      setStatus('success');
      setStatusMessage('Сообщение отправлено! Отвечу в ближайшее время.');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    setStatus('error');
    setStatusMessage(result.message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="flex items-start justify-between mb-16">
          <div>
            <p className="section-label mb-3">Контакты</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Связаться со мной<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="section-num hidden md:block">04</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={formRef} className="card-flat">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="ваш@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              {statusMessage && (
                <p
                  role="status"
                  className={`text-sm px-4 py-3 border ${
                    status === 'success'
                      ? 'text-primary border-primary/30 bg-primary/5'
                      : 'text-red-400 border-red-500/30 bg-red-500/10'
                  }`}
                >
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Отправка…' : 'Отправить сообщение'}
                <PaperPlaneTilt size={18} />
              </button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Я всегда рад работать над новыми проектами и сотрудничать с интересными людьми.
              Будь то конкретная идея или просто желание обсудить возможности —
              буду рад услышать вас.
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
