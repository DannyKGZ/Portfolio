import type { SVGProps } from 'react';

/**
 * Локальный набор иконок.
 *
 * Раньше использовался phosphor-react: каждый модуль иконки тянет за собой
 * все шесть начертаний (thin, light, regular, bold, fill, duotone), из-за чего
 * 16 иконок весили около 60 КБ в бандле. Здесь лежит ровно то, что реально
 * рисуется на странице — разметка снята с тех же компонентов phosphor,
 * поэтому выглядят иконки один в один.
 *
 * Как обновить или добавить иконку: отрендерить компонент phosphor через
 * renderToStaticMarkup и вставить внутренности <svg> новой константой.
 */

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string;
  weight?: 'regular' | 'bold';
};

type BaseProps = IconProps & { body: string };

const Icon = ({ body, size = 24, weight: _weight, ...rest }: BaseProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden
    focusable="false"
    {...rest}
    dangerouslySetInnerHTML={{ __html: body }}
  />
);

const ICON_ARROW_RIGHT = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><line x1=\"40\" y1=\"128\" x2=\"216\" y2=\"128\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><polyline points=\"144 56 216 128 144 200\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></polyline>";
const ICON_ARROW_UP = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><line x1=\"128\" y1=\"216\" x2=\"128\" y2=\"40\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><polyline points=\"56 112 128 40 200 112\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></polyline>";
const ICON_ARROW_UP_RIGHT = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><line x1=\"64\" y1=\"192\" x2=\"192\" y2=\"64\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><polyline points=\"88 64 192 64 192 168\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></polyline>";
const ICON_CHAT_CIRCLE = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><path d=\"M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_CHECK = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><polyline points=\"216 72 104 184 48 128\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></polyline>";
const ICON_DOWNLOAD_SIMPLE = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><polyline points=\"86 110 128 152 170 110\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></polyline><line x1=\"128\" y1=\"40\" x2=\"128\" y2=\"152\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><path d=\"M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_ENVELOPE = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><polyline points=\"224 56 128 144 32 56\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></polyline><path d=\"M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><line x1=\"110.5\" y1=\"128\" x2=\"34.5\" y2=\"197.7\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><line x1=\"221.5\" y1=\"197.7\" x2=\"145.5\" y2=\"128\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line>";
const ICON_GITHUB_LOGO = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><path d=\"M84,240a23.9,23.9,0,0,0,24-24V168\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M172,240a23.9,23.9,0,0,1-24-24V168\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M152,168h16a23.9,23.9,0,0,1,24,24v8a23.9,23.9,0,0,0,24,24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M104,168H88a23.9,23.9,0,0,0-24,24v8a23.9,23.9,0,0,1-24,24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M111.8,64A52,52,0,0,0,68,40a52,52,0,0,0-3.5,44.7A49.3,49.3,0,0,0,56,112v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.3,49.3,0,0,0-8.5-27.3A52,52,0,0,0,188,40a52,52,0,0,0-43.8,24Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_HANDSHAKE = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><path d=\"M240.7,121.8,216,134.1,184,72.9l25-12.5a7.9,7.9,0,0,1,10.6,3.4l24.6,47.1A8,8,0,0,1,240.7,121.8Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M40,133.1,15.3,120.7a7.9,7.9,0,0,1-3.5-10.8L36.4,62.8A8,8,0,0,1,47,59.3L72,71.8Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M216,134.1l-16,18.8-36.8,36.8a8.5,8.5,0,0,1-7.6,2.1l-58-14.5a8,8,0,0,1-2.9-1.5L40,133.1\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M200,152.9l-44-32-12.8,9.6a32.1,32.1,0,0,1-38.4,0l-5.4-4.1a8.1,8.1,0,0,1-.9-12.1l39.2-39.1a7.9,7.9,0,0,1,5.6-2.3H184\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M72.6,71.8l51.3-15a8,8,0,0,1,5.5.4L164,72.9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><path d=\"M112,212.9l-30.1-7.6a7.4,7.4,0,0,1-3.3-1.7L56,184\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_LIST = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><line x1=\"40\" y1=\"128\" x2=\"216\" y2=\"128\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><line x1=\"40\" y1=\"64\" x2=\"216\" y2=\"64\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><line x1=\"40\" y1=\"192\" x2=\"216\" y2=\"192\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line>";
const ICON_MAP_PIN = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><circle cx=\"128\" cy=\"104\" r=\"32\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></circle><path d=\"M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_PAPER_PLANE_TILT = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><path d=\"M210.3,35.9,23.9,88.4a8,8,0,0,0-1.2,15l85.6,40.5a7.8,7.8,0,0,1,3.8,3.8l40.5,85.6a8,8,0,0,0,15-1.2L220.1,45.7A7.9,7.9,0,0,0,210.3,35.9Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><line x1=\"110.9\" y1=\"145.1\" x2=\"156.1\" y2=\"99.9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line>";
const ICON_PHONE = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><path d=\"M92.5,124.8a83.6,83.6,0,0,0,39,38.9,8,8,0,0,0,7.9-.6l25-16.7a7.9,7.9,0,0,1,7.6-.7l46.8,20.1a7.9,7.9,0,0,1,4.8,8.3A48,48,0,0,1,176,216,136,136,0,0,1,40,80,48,48,0,0,1,81.9,32.4a7.9,7.9,0,0,1,8.3,4.8l20.1,46.9a8,8,0,0,1-.6,7.5L93,117A8,8,0,0,0,92.5,124.8Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_ROBOT = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><rect x=\"32\" y=\"56\" width=\"192\" height=\"160\" rx=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></rect><rect x=\"72\" y=\"144\" width=\"112\" height=\"40\" rx=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></rect><line x1=\"148\" y1=\"144\" x2=\"148\" y2=\"184\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><line x1=\"108\" y1=\"144\" x2=\"108\" y2=\"184\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><line x1=\"128\" y1=\"56\" x2=\"128\" y2=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><circle cx=\"84\" cy=\"108\" r=\"12\"></circle><circle cx=\"172\" cy=\"108\" r=\"12\"></circle>";
const ICON_TELEGRAM_LOGO = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><path d=\"M88,134.9,177.9,214a8,8,0,0,0,13.1-4.2L228.6,45.6a8,8,0,0,0-10.7-9.2L33.3,108.9c-7.4,2.9-6.4,13.7,1.4,15.3Z\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path><line x1=\"88\" y1=\"134.9\" x2=\"224.1\" y2=\"36.6\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><path d=\"M132.9,174.4l-31.2,31.2A8,8,0,0,1,88,200V134.9\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></path>";
const ICON_X = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><line x1=\"200\" y1=\"56\" x2=\"56\" y2=\"200\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line><line x1=\"200\" y1=\"200\" x2=\"56\" y2=\"56\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"16\"></line>";
const ICON_CHECK_BOLD = "<rect width=\"256\" height=\"256\" fill=\"none\"></rect><polyline points=\"216 72 104 184 48 128\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"24\"></polyline>";

export const ArrowRight = (props: IconProps) => <Icon body={ICON_ARROW_RIGHT} {...props} />;
export const ArrowUp = (props: IconProps) => <Icon body={ICON_ARROW_UP} {...props} />;
export const ArrowUpRight = (props: IconProps) => <Icon body={ICON_ARROW_UP_RIGHT} {...props} />;
export const ChatCircle = (props: IconProps) => <Icon body={ICON_CHAT_CIRCLE} {...props} />;
export const DownloadSimple = (props: IconProps) => <Icon body={ICON_DOWNLOAD_SIMPLE} {...props} />;
export const Envelope = (props: IconProps) => <Icon body={ICON_ENVELOPE} {...props} />;
export const GithubLogo = (props: IconProps) => <Icon body={ICON_GITHUB_LOGO} {...props} />;
export const Handshake = (props: IconProps) => <Icon body={ICON_HANDSHAKE} {...props} />;
export const List = (props: IconProps) => <Icon body={ICON_LIST} {...props} />;
export const MapPin = (props: IconProps) => <Icon body={ICON_MAP_PIN} {...props} />;
export const PaperPlaneTilt = (props: IconProps) => <Icon body={ICON_PAPER_PLANE_TILT} {...props} />;
export const Phone = (props: IconProps) => <Icon body={ICON_PHONE} {...props} />;
export const Robot = (props: IconProps) => <Icon body={ICON_ROBOT} {...props} />;
export const TelegramLogo = (props: IconProps) => <Icon body={ICON_TELEGRAM_LOGO} {...props} />;
export const X = (props: IconProps) => <Icon body={ICON_X} {...props} />;

/** Единственная иконка, которой нужно жирное начертание (кнопка «Скачано») */
export const Check = ({ weight = 'regular', ...props }: IconProps) => (
  <Icon body={weight === 'bold' ? ICON_CHECK_BOLD : ICON_CHECK} weight={weight} {...props} />
);
