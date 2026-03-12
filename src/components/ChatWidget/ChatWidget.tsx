import type { FC } from 'react';
import styles from './ChatWidget.module.css';

const CHAT_ICON_SVG = '/crypto/' + encodeURIComponent('Компонент 12 – 29.svg');
const CHAT_ICON_HOVER_SVG = '/crypto/' + encodeURIComponent('Компонент 12 – 29 (Состояние наведения).svg');

const ChatWidget: FC = () => (
  <a
    href="#"
    className={styles.widget}
    aria-label="Открыть чат"
  >
    <span className={styles.widgetCircle}>
      <img src={CHAT_ICON_SVG} alt="" className={styles.widgetIconDefault} aria-hidden />
      <img src={CHAT_ICON_HOVER_SVG} alt="" className={styles.widgetIconHover} aria-hidden />
    </span>
  </a>
);

export default ChatWidget;
