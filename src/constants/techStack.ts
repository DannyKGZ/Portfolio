export type TechItem = {
  name: string;
  /** simple-icons slug или 'custom' */
  slug: string;
  color: string;
};

/** Технологии из раздела «Обо мне» и проектов */
export const TECH_STACK: TechItem[] = [
  { name: 'HTML5', slug: 'html5', color: 'E34F26' },
  { name: 'CSS3', slug: 'custom-css', color: '1572B6' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', color: 'FFFFFF' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Mobile First', slug: 'custom-mobile-first', color: 'F97316' },
  { name: 'Desktop First', slug: 'custom-desktop-first', color: 'F97316' },
  { name: 'Адаптивная вёрстка', slug: 'custom-responsive', color: 'F97316' },
  { name: 'Кроссбраузерность', slug: 'custom-cross-browser', color: 'F97316' },
  { name: 'PHP', slug: 'php', color: '777BB4' },
  { name: '1С-Битрикс', slug: 'custom-bitrix', color: 'D71921' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'Docker', slug: 'docker', color: '2496ED' },
  { name: 'Ubuntu', slug: 'ubuntu', color: 'E95420' },
  { name: 'jQuery', slug: 'jquery', color: '0769AD' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '7952B3' },
  { name: 'WordPress', slug: 'wordpress', color: '21759B' },
  { name: 'MUI', slug: 'mui', color: '007FFF' },
  { name: 'Styled Components', slug: 'styledcomponents', color: 'DB7093' },
  { name: 'Figma', slug: 'figma', color: 'F24E1E' },
  { name: 'Photoshop', slug: 'custom-photoshop', color: '31A8FF' },
  { name: 'npm', slug: 'npm', color: 'CB3837' },
  { name: 'Zod', slug: 'zod', color: '3B82F6' },
  { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
  { name: 'Swiper', slug: 'swiper', color: '6332F6' },
  { name: 'Cursor', slug: 'custom-cursor', color: '0C0C0C' },
  { name: 'DeepSeek', slug: 'custom-deepseek', color: '4D6BFE' },
];
