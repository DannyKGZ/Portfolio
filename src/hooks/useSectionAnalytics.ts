import { useEffect } from 'react';
import { SECTIONS_CHANGED_EVENT } from '@/constants/sections';
import { isAnalyticsEnabled, trackSectionView } from '@/lib/analytics';

const SECTIONS = [
  { id: 'hero', title: 'Главная' },
  { id: 'about', title: 'Обо мне' },
  { id: 'projects', title: 'Проекты' },
  { id: 'contact', title: 'Контакты' },
] as const;

export function useSectionAnalytics() {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const seen = new Set<string>();
    const observed = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;

          const sectionId = entry.target.id;
          if (seen.has(sectionId)) continue;

          seen.add(sectionId);
          const section = SECTIONS.find((item) => item.id === sectionId);
          trackSectionView(sectionId, section?.title);
        }
      },
      { threshold: [0.35, 0.5] },
    );

    // Секции, которые грузятся отдельными чанками, появляются в DOM позже —
    // поэтому подписка не одноразовая, а повторяемая.
    const attach = () => {
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (!element || observed.has(element)) continue;
        observed.add(element);
        observer.observe(element);
      }
    };

    attach();
    window.addEventListener(SECTIONS_CHANGED_EVENT, attach);

    return () => {
      window.removeEventListener(SECTIONS_CHANGED_EVENT, attach);
      observer.disconnect();
    };
  }, []);
}
