import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChatCircle, X, PaperPlaneTilt, Robot } from 'phosphor-react';
import { PROFILE, WORK_EXPERIENCE } from '@/constants/profile';

type ChatMessage = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

const QUICK_REPLIES = [
  'Опыт работы',
  'Стек технологий',
  'Проекты',
  'Контакты',
];

const getBotReply = (input: string): string => {
  const q = input.toLowerCase().trim();

  if (/привет|здравств|добр|хай|hello|hi\b/.test(q)) {
    return `Привет! Я помогу узнать о ${PROFILE.displayName} — опыт, стек, проекты и контакты. Спросите или нажмите кнопку ниже.`;
  }

  if (/кто ты|кто такой|имя|фио|руслан|рысбеков/.test(q)) {
    return `${PROFILE.fullName} — ${PROFILE.title}. ${PROFILE.portfolioTagline}`;
  }

  if (/опыт|стаж|сколько лет|работаешь|где работа|ип барков|барков/.test(q)) {
    return `${PROFILE.title} в ${PROFILE.employer} ${WORK_EXPERIENCE.since} — ${WORK_EXPERIENCE.duration}. ${PROFILE.projectsCount} коммерческих проектов на React и 1С-Битрикс.`;
  }

  if (/стек|технолог|навык|умени|умеешь|знаешь|компетенц|fsd|next/.test(q)) {
    return 'Стек: React, TypeScript, Next.js, 1С-Битрикс, FSD, MUI, Framer Motion, Tailwind, Zod + react-hook-form, Git, Docker. Вёрстка по Figma, React-виджеты в Bitrix и отдельные проекты на Next.js.';
  }

  if (/контакт|связ|почт|email|телефон|telegram|телеграм|написать|связаться/.test(q)) {
    return `Почта: ${PROFILE.email} · Телефон: ${PROFILE.phone} · Telegram: ${PROFILE.telegramHandle} · ${PROFILE.location}. WhatsApp и Viber тоже доступны.`;
  }

  if (/react|реакт/.test(q)) {
    return 'React — основной инструмент: функциональные компоненты, хуки, MUI, Framer Motion, FSD. Виджеты внутри Bitrix и отдельные приложения на Next.js.';
  }

  if (/битрикс|bitrix|php/.test(q)) {
    return '1С-Битрикс: кастомные компоненты, инфоблоки, REST API, интеграция React в шаблоны. PHP-задачи подключал при необходимости для ускорения релиза.';
  }

  if (/проект|портфолио|сайт|работ|кейс|yuliawave|fta45|alpine|bojeni|varde|medstandart|gnature/.test(q)) {
    return `${PROFILE.projectsCount} проектов: yuliawave.com, fta45.ru, alpinefloor.su, bojeni.ru, varde-home.ru, medstandart-market.ru, gnature.ru. Подробности — в разделе «Мои работы».`;
  }

  if (/резюме|cv|скачать/.test(q)) {
    return `Резюме можно скачать кнопкой «Скачать резюме» в шапке или написать на ${PROFILE.email}. Также есть профиль на HH.ru.`;
  }

  if (/github|гитхаб|gitlab|гитлаб|hh|хедхантер/.test(q)) {
    return `GitHub: ${PROFILE.github} · GitLab: ${PROFILE.gitlab} · HH.ru: профиль в резюме · Telegram: ${PROFILE.telegramHandle}`;
  }

  if (/сочи|город|где жив|локац|переезд|командиров/.test(q)) {
    return `${PROFILE.location}. ${PROFILE.relocation}, ${PROFILE.businessTrips.toLowerCase()}.`;
  }

  if (/образован|учил|тмтт|метро|машинист|карьер|истори/.test(q)) {
    return PROFILE.careerStory;
  }

  if (/занятост|фриланс|удалён|удален|part|полная|частичн/.test(q)) {
    return `Открыт к: ${PROFILE.employment.join(', ').toLowerCase()}.`;
  }

  if (/ai|cursor|deepseek|нейросет|ассистент/.test(q)) {
    return 'В работе активно использую AI-инструменты: Cursor, DeepSeek Agent — для ускорения разработки и рефакторинга.';
  }

  if (/спасибо|благодар|пока|до свид/.test(q)) {
    return 'Рад помочь! Для связи — почта или Telegram. Удачи!';
  }

  if (/помощь|help|что умеешь|что знаешь|вопрос/.test(q)) {
    return 'Могу рассказать об опыте, стеке, проектах, контактах, резюме и карьере. Попробуйте: «опыт», «стек», «проекты», «контакты».';
  }

  return 'Не совсем понял вопрос. Попробуйте: «опыт», «стек», «проекты», «контакты» или «резюме».';
};

let messageId = 1;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: messageId++,
      text: `Привет! Я помощник ${PROFILE.displayName}. Спросите об опыте, стеке, проектах или контактах.`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, delay: 1, ease: 'back.out(1.7)' },
    );
  }, []);

  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      gsap.fromTo(
        chatboxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const toggleChat = () => {
    if (isOpen) {
      gsap.to(chatboxRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(true);
    }
  };

  const sendText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: messageId++,
      text: trimmed,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: messageId++,
        text: getBotReply(trimmed),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = () => sendText(message);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          ref={chatboxRef}
          className="mb-4 w-[min(90vw,20rem)] h-[26rem] glass rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-glow-primary"
        >
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-primary rounded-full">
                  <Robot size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Помощник портфолио</h3>
                  <p className="text-xs text-muted-foreground">Отвечает по резюме и сайту</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleChat}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Закрыть чат"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.isBot
                      ? 'bg-muted/30 text-foreground border border-white/5'
                      : 'bg-gradient-primary text-primary-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl text-sm bg-muted/30 text-muted-foreground border border-white/5">
                  Печатает...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => sendText(label)}
                disabled={isTyping}
                className="px-2.5 py-1 text-xs rounded-full border border-primary/25 text-primary-glow hover:bg-primary/10 transition-colors disabled:opacity-50"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                disabled={isTyping}
                className="flex-1 px-3 py-2 glass border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isTyping || !message.trim()}
                className="p-2 w-9 h-9 shrink-0 bg-gradient-primary rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                aria-label="Отправить"
              >
                <PaperPlaneTilt size={16} className="text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={toggleChat}
        className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform"
        aria-label={isOpen ? 'Закрыть чат' : 'Открыть чат'}
      >
        {isOpen ? (
          <X size={22} className="text-primary-foreground" />
        ) : (
          <ChatCircle size={22} className="text-primary-foreground" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
