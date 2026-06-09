import { TECH_STACK } from '@/constants/techStack';

const BitrixIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#D71921" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fill="white"
      fontSize="9"
      fontWeight="700"
      fontFamily="Space Grotesk, sans-serif"
    >
      1C
    </text>
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <path
      fill="#1572B6"
      d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.101 1.188h-6.64l.24 2.7h6.338l-.366 4.125-3.271.918-3.27-.916-.204-2.325H6.123l.33 4.692L12 19.351l5.379-1.536.599-6.85.061-.732.188-2.172H8.887l-.135-1.583h9.025z"
    />
  </svg>
);

const PhotoshopIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#001E36" />
    <path
      fill="#31A8FF"
      d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248h15.926L8.884 1.376z"
    />
  </svg>
);

const CursorIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#0C0C0C" />
    <path
      fill="#EDEDED"
      d="M7 5.5l9.5 7.2-4.2 1.1v4.7l-1.8-2.4L7 5.5z"
    />
    <path fill="#888" d="M7 5.5l5.5 10.5 1.8-2.4V13.8l4.2-1.1L7 5.5z" />
  </svg>
);

const DeepSeekIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#4D6BFE" />
    <path
      fill="white"
      d="M16.5 9.5c-.8-2.2-3-3.5-5.5-3-2 .4-3.4 2.2-3.4 4.3 0 2.8 2.2 4.7 4.8 6.1l.6 1.1.6-1.1c1.4-.7 2.6-1.6 3.4-2.7.9-1.2 1.2-2.5.5-4.7zM12 8.2c1.5 0 2.7 1 2.7 2.4S13.5 13 12 13s-2.7-1-2.7-2.4 1.2-2.4 2.7-2.4z"
    />
  </svg>
);

const MobileFirstIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#1A1D24" />
    <rect x="3" y="8" width="11" height="8" rx="1" fill="none" stroke="#F97316" strokeWidth="1" opacity="0.35" />
    <line x1="5" y1="15" x2="12" y2="15" stroke="#F97316" strokeWidth="1" opacity="0.35" />
    <rect x="10" y="4" width="9" height="15" rx="1.5" fill="none" stroke="#F97316" strokeWidth="1.5" />
    <circle cx="14.5" cy="17" r="0.75" fill="#F97316" />
    <text x="14.5" y="11.5" textAnchor="middle" fill="#F97316" fontSize="5" fontWeight="700" fontFamily="Space Grotesk, sans-serif">1</text>
  </svg>
);

const DesktopFirstIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#1A1D24" />
    <rect x="13" y="9" width="7" height="11" rx="1" fill="none" stroke="#F97316" strokeWidth="1" opacity="0.35" />
    <circle cx="16.5" cy="18.5" r="0.6" fill="#F97316" opacity="0.35" />
    <rect x="3" y="5" width="16" height="10" rx="1.5" fill="none" stroke="#F97316" strokeWidth="1.5" />
    <path d="M9 15h6v1.5H9z" fill="#F97316" opacity="0.7" />
    <line x1="8" y1="16.5" x2="16" y2="16.5" stroke="#F97316" strokeWidth="1.5" />
    <text x="11" y="11.5" textAnchor="middle" fill="#F97316" fontSize="5" fontWeight="700" fontFamily="Space Grotesk, sans-serif">1</text>
  </svg>
);

const ResponsiveIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#1A1D24" />
    <rect x="3" y="7" width="5" height="9" rx="1" fill="none" stroke="#F97316" strokeWidth="1.2" />
    <circle cx="5.5" cy="14" r="0.5" fill="#F97316" />
    <rect x="9.5" y="6" width="6" height="11" rx="1" fill="none" stroke="#F97316" strokeWidth="1.2" />
    <line x1="10.5" y="8" x2="14.5" y2="8" stroke="#F97316" strokeWidth="0.8" opacity="0.6" />
    <rect x="17" y="5" width="5" height="8" rx="1" fill="none" stroke="#F97316" strokeWidth="1.2" />
    <line x1="18" y1="7" x2="21" y2="7" stroke="#F97316" strokeWidth="0.8" opacity="0.6" />
    <path d="M7.5 18h9" stroke="#F97316" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M9 16.5l-1.5 1.5L9 19.5M15 16.5l1.5 1.5-1.5 1.5" stroke="#F97316" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const CrossBrowserIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
    <rect width="24" height="24" rx="4" fill="#1A1D24" />
    <rect x="3" y="6" width="6" height="7" rx="1" fill="none" stroke="#4285F4" strokeWidth="1.1" />
    <circle cx="4.5" cy="7.5" r="0.5" fill="#4285F4" />
    <rect x="9" y="6" width="6" height="7" rx="1" fill="none" stroke="#FF7139" strokeWidth="1.1" />
    <circle cx="10.5" cy="7.5" r="0.5" fill="#FF7139" />
    <rect x="15" y="6" width="6" height="7" rx="1" fill="none" stroke="#0FB5EE" strokeWidth="1.1" />
    <circle cx="16.5" cy="7.5" r="0.5" fill="#0FB5EE" />
    <path d="M7 16.5l2.5 2.5L17 11.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const CUSTOM_ICONS: Record<string, () => JSX.Element> = {
  'custom-bitrix': BitrixIcon,
  'custom-css': CssIcon,
  'custom-photoshop': PhotoshopIcon,
  'custom-cursor': CursorIcon,
  'custom-deepseek': DeepSeekIcon,
  'custom-mobile-first': MobileFirstIcon,
  'custom-desktop-first': DesktopFirstIcon,
  'custom-responsive': ResponsiveIcon,
  'custom-cross-browser': CrossBrowserIcon,
};

const TechStackIcons = () => (
  <div className="tech-stack">
    <p className="section-label mb-5">Стек и инструменты</p>
    <ul className="flex flex-wrap gap-3">
      {TECH_STACK.map((tech) => {
        const CustomIcon = CUSTOM_ICONS[tech.slug];

        return (
          <li key={tech.name}>
            <div className="tech-stack__item group" title={tech.name}>
              {CustomIcon ? (
                <CustomIcon />
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt=""
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
              )}
              <span className="tech-stack__label">{tech.name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default TechStackIcons;
