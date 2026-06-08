import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

const NAV_OFFSET = -72;

export function initSmoothScroll() {
  if (lenis) return lenis;

  try {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const originalDestroy = lenis.destroy.bind(lenis);
    lenis.destroy = () => {
      gsap.ticker.remove(onTick);
      originalDestroy();
    };

    return lenis;
  } catch {
    return null;
  }
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function scrollToSection(sectionId: string, offset = NAV_OFFSET) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  if (lenis) {
    lenis.scrollTo(element, { offset, duration: 1.2 });
    return;
  }

  element.scrollIntoView({ behavior: 'smooth' });
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function pauseSmoothScroll() {
  lenis?.stop();
}

export function resumeSmoothScroll() {
  lenis?.start();
}
