export const MAIN_SECTIONS = [
  { id: 'hero', num: '01' },
  { id: 'about', num: '02' },
  { id: 'projects', num: '03' },
  { id: 'contact', num: '04' },
] as const;

/**
 * Секция контактов подгружается отдельным чанком: когда она появляется в DOM,
 * она сообщает об этом событием, чтобы аналитика успела её отследить.
 */
export const SECTIONS_CHANGED_EVENT = 'sections:changed';
