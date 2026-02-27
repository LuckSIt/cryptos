import type { FC } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  visible?: boolean;
};

const Header: FC<HeaderProps> = ({ visible = true }) => (
  <header
    className={`${styles.header} ${visible ? styles.headerVisible : ''}`}
    role="banner"
    aria-hidden={!visible}
  >
    <div className={styles.logo}>
      <a href="#main" className={styles.logoLink}>
        Binary Flow
      </a>
    </div>
    <nav className={styles.nav} aria-label="Основное меню">
      <a href="#main" className={styles.navLink}>Главная</a>
      <a href="#exchange" className={styles.navLink}>Обмен</a>
      <a href="#about" className={styles.navLink}>О нас</a>
      <a href="#news" className={styles.navLink}>Новости</a>
      <a href="#reviews" className={styles.navLink}>Отзывы</a>
      <a href="#rules" className={styles.navLink}>Правила обмена</a>
      <a href="#rules" className={styles.navLink}>Политика AML/KYC</a>
      <a href="#contacts" className={styles.navLink}>Контакты</a>
    </nav>
  </header>
);

export default Header;
