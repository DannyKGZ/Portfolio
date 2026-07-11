export type TechItem = {
  name: string;
  /** simple-icons slug или 'custom' */
  slug: string;
  color: string;
};

/** Технологии из раздела «Стек и компетенции» */
export const TECH_STACK: TechItem[] = [
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'Next.js', slug: 'nextdotjs', color: 'FFFFFF' },
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'HTML5', slug: 'html5', color: 'E34F26' },
  { name: 'CSS3', slug: 'custom-css', color: '1572B6' },
  { name: 'Sass', slug: 'sass', color: 'CC6699' },
  { name: 'Less', slug: 'less', color: '1D365D' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '7952B3' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'MUI', slug: 'mui', color: '007FFF' },
  { name: 'Shadcn/UI', slug: 'shadcnui', color: 'FFFFFF' },
  { name: 'React Hook Form', slug: 'reacthookform', color: 'EC5990' },
  { name: 'Zod', slug: 'zod', color: '3B82F6' },
  { name: '1С-Битрикс', slug: 'custom-bitrix', color: 'D71921' },
  { name: 'REST API', slug: 'custom-rest', color: '22C55E' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'Docker', slug: 'docker', color: '2496ED' },
  { name: 'Vite', slug: 'vite', color: '646CFF' },
  { name: 'Webpack', slug: 'webpack', color: '8DD6F9' },
  { name: 'Figma', slug: 'figma', color: 'F24E1E' },
];
