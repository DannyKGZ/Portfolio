import type { SimpleIcon } from 'simple-icons';
import {
  siDocker,
  siFigma,
  siGit,
  siHtml5,
  siJavascript,
  siMui,
  siReact,
  siReacthookform,
  siStyledcomponents,
  siSwiper,
  siTailwindcss,
  siTypescript,
  siWebpack,
  siWordpress,
  siZod,
} from 'simple-icons';

/** Локальные SVG-path из simple-icons — без внешних запросов к CDN */
export const SIMPLE_ICON_MAP: Record<string, SimpleIcon> = {
  html5: siHtml5,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  mui: siMui,
  tailwindcss: siTailwindcss,
  styledcomponents: siStyledcomponents,
  reacthookform: siReacthookform,
  zod: siZod,
  swiper: siSwiper,
  wordpress: siWordpress,
  git: siGit,
  docker: siDocker,
  webpack: siWebpack,
  figma: siFigma,
};
