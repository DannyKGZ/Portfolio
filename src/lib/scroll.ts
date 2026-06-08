import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -72;

export function initSmoothScroll() {
  // Нативный скролл — стабильнее на всех хостингах
}

export function destroySmoothScroll() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export function scrollToSection(sectionId: string, offset = NAV_OFFSET) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function pauseSmoothScroll() {}

export function resumeSmoothScroll() {}
