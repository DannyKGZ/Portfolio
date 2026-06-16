export type TechItem = {
  name: string;
  /** simple-icons slug или 'custom' */
  slug: string;
  color: string;
};

/** Технологии из раздела «Стек и компетенции» */
export const TECH_STACK: TechItem[] = [
  { name: 'HTML5', slug: 'html5', color: 'E34F26' },
  { name: 'CSS3', slug: 'custom-css', color: '1572B6' },
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'MUI', slug: 'mui', color: '007FFF' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Mobile First', slug: 'custom-mobile-first', color: 'F97316' },
  { name: 'Desktop First', slug: 'custom-desktop-first', color: 'F97316' },
  { name: 'Адаптивная вёрстка', slug: 'custom-responsive', color: 'F97316' },
  { name: 'Кроссбраузерность', slug: 'custom-cross-browser', color: 'F97316' },
  { name: 'Styled Components', slug: 'styledcomponents', color: 'DB7093' },
  { name: 'React Hook Form', slug: 'reacthookform', color: 'EC5990' },
  { name: 'Zod', slug: 'zod', color: '3B82F6' },
  { name: 'Swiper', slug: 'swiper', color: '6332F6' },
  { name: '1С-Битрикс', slug: 'custom-bitrix', color: 'D71921' },
  { name: 'WordPress', slug: 'wordpress', color: '21759B' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'Docker', slug: 'docker', color: '2496ED' },
  { name: 'Webpack', slug: 'webpack', color: '8DD6F9' },
  { name: 'Figma', slug: 'figma', color: 'F24E1E' },
  { name: 'Photoshop', slug: 'custom-photoshop', color: '31A8FF' },
  { name: 'Cursor', slug: 'custom-cursor', color: '0C0C0C' },
  { name: 'DeepSeek', slug: 'custom-deepseek', color: '4D6BFE' },
];
