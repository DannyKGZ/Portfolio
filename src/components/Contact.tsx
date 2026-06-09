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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      });

      gsap.from(formRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%"
        }
      });

      gsap.from(infoRef.current?.children || [], {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }

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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Связаться <span className="text-primary-glow">со мной</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={formRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-foreground mb-2 font-medium">
                  Имя
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-input glass border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="Ваше имя" />
              </div>

              <div>
                <label htmlFor="email" className="block text-foreground mb-2 font-medium">
                  Email
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-input glass border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="ваш@email.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-foreground mb-2 font-medium">
                  Сообщение
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 bg-input glass border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none" placeholder="Расскажите о вашем проекте..." />
              </div>

              {statusMessage && (
                <p
                  role="status"
                  className={`text-sm rounded-lg px-4 py-3 border ${
                    status === 'success'
                      ? 'text-primary-glow border-primary/30 bg-primary/10'
                      : 'text-red-400 border-red-500/30 bg-red-500/10'
                  }`}
                >
                  {statusMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Отправка…' : 'Отправить сообщение'}
                <PaperPlaneTilt size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Я всегда рад работать над новыми проектами и сотрудничать с интересными людьми.
                Будь то конкретная идея или просто желание обсудить возможности —
                буду рад услышать вас.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-primary transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Envelope size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Почта</p>
                  <a href={`mailto:${PROFILE.email}`} className="text-muted-foreground hover:text-primary-glow transition-colors">{PROFILE.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-secondary transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Телефон</p>
                  <a href={`tel:${PROFILE.phoneTel}`} className="text-muted-foreground hover:text-primary-glow transition-colors">{PROFILE.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-primary transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Местоположение</p>
                  <p className="text-muted-foreground">{PROFILE.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default Contact;