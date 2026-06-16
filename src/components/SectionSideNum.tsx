import { useEffect, useRef, useState } from 'react';
import { MAIN_SECTIONS } from '@/constants/sections';

const SectionSideNum = () => {
  const [activeNum, setActiveNum] = useState(MAIN_SECTIONS[0].num);
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const elements = MAIN_SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const updateActive = () => {
      let maxRatio = 0;
      let activeId = MAIN_SECTIONS[0].id;

      ratiosRef.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      const section = MAIN_SECTIONS.find((item) => item.id === activeId);
      if (section) setActiveNum(section.num);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        });
        updateActive();
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    updateActive();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-num-fixed" aria-hidden>
      <p key={activeNum} className="section-num section-num-fixed__value">
        {activeNum}
      </p>
    </div>
  );
};

export default SectionSideNum;
