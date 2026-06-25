import { useEffect, useRef } from 'react';
import { isAnalyticsEnabled, trackSectionView } from '@/lib/analytics';

const SECTIONS = [
  { id: 'hero', title: 'Главная' },
  { id: 'about', title: 'Обо мне' },
  { id: 'projects', title: 'Проекты' },
  { id: 'contact', title: 'Контакты' },
] as const;

export function useSectionAnalytics() {
  const seen = useRef(new Set<string>());

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) continue;

          const sectionId = entry.target.id;
          if (seen.current.has(sectionId)) continue;

          seen.current.add(sectionId);
          const section = SECTIONS.find((item) => item.id === sectionId);
          trackSectionView(sectionId, section?.title);
        }
      },
      { threshold: [0.35, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
