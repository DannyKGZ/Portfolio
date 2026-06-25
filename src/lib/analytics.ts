declare global {
  interface Window {
    ym?: YandexMetrikaFn;
  }
}

type YandexMetrikaFn = (
  counterId: number,
  method: string,
  ...args: unknown[]
) => void;

const DEFAULT_METRICA_ID = '110152126';

const METRICA_ID = import.meta.env.VITE_YANDEX_METRICA_ID?.trim() || DEFAULT_METRICA_ID;

function getCounterId(): number | null {
  if (!METRICA_ID) return null;
  const id = Number(METRICA_ID);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function getYandexMetricaId(): string {
  return METRICA_ID;
}

export function isAnalyticsEnabled(): boolean {
  return getCounterId() !== null;
}

function callMetrica(method: string, ...args: unknown[]): void {
  const counterId = getCounterId();
  if (!counterId || typeof window.ym !== 'function') return;
  window.ym(counterId, method, ...args);
}

/** Виртуальный просмотр секции одностраничника */
export function trackSectionView(sectionId: string, title?: string): void {
  callMetrica('hit', `/#${sectionId}`, { title: title ?? sectionId });
}

/** Цель: contact_form, project_click, chatbot_open, chatbot_message, resume_download */
export function trackGoal(goal: string, params?: Record<string, string | number | boolean>): void {
  callMetrica('reachGoal', goal, params);
}
