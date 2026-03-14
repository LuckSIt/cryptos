import type { FC } from 'react';
import styles from './Header.module.css';

const LOGO_SVG = '/crypto/Компонент%2067%20%E2%80%93%201.svg';

type HeaderProps = {
  visible?: boolean;
  variant?: 'buyer' | 'business';
};

const Header: FC<HeaderProps> = ({ visible = true, variant = 'buyer' }) => (
  <header
    className={`${styles.header} ${visible ? styles.headerVisible : ''} ${variant === 'business' ? styles.headerBusiness : ''}`}
    role="banner"
    aria-hidden={!visible}
  >
    <div className={styles.logo}>
      <a href="#main" className={styles.logoLink} aria-label="Binary Flow">
        <img src={LOGO_SVG} alt="" width="80" height="30" className={styles.logoImg} />
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
    <div className={styles.messengers}>
      <a href="#" className={`${styles.navLink} ${styles.navLinkMessenger}`} aria-label="WhatsApp">
        <span className={styles.navLinkIcon} aria-hidden>
          <svg viewBox="0 0 16 17" fill="currentColor">
            <path d="M12.466,9.49c-.218-.09-1.261-.54-1.455-.61s-.332-.09-.481.1-.55.6-.676.73-.241.14-.458,0a6.076,6.076,0,0,1-1.707-.92A5.414,5.414,0,0,1,6.542,7.5c-.126-.18,0-.28.092-.38s.206-.21.321-.32a1.36,1.36,0,0,0,.206-.31.337.337,0,0,0,0-.33c0-.09-.481-1-.665-1.37s-.344-.32-.47-.32H5.568a.881.881,0,0,0-.573.23A1.978,1.978,0,0,0,4.25,6.25,3.339,3.339,0,0,0,5.109,8.2,9.259,9.259,0,0,0,8.765,11c.5.19.894.3,1.2.39a3.307,3.307,0,0,0,1.341.07,2.232,2.232,0,0,0,1.444-.88,1.476,1.476,0,0,0,.126-.88A1.232,1.232,0,0,0,12.466,9.49Z" transform="translate(0 0.552)" />
            <path d="M14.229,2.841A7.9,7.9,0,0,0,8.548.5,7.99,7.99,0,0,0,1.664,12.474L.59,16.609l4.231-1.074a7.947,7.947,0,0,0,3.812.967H8.548a7.99,7.99,0,0,0,5.681-13.66ZM8.548,15.127a6.572,6.572,0,0,1-3.383-.934l-.236-.14-2.513.655.666-2.449-.15-.247a6.631,6.631,0,1,1,5.617,3.114Z" />
          </svg>
        </span>
        <span className={styles.navLinkText}>WhatsApp</span>
      </a>
      <a href="https://t.me/" className={`${styles.navLink} ${styles.navLinkMessenger}`} aria-label="Telegram" target="_blank" rel="noopener noreferrer">
        <span className={styles.navLinkIcon} aria-hidden>
          <svg viewBox="2136 -4 24 24" fill="currentColor">
            <path transform="translate(2138 -4)" d="M17.636,7.118s1.48-.577,1.357.824c-.041.577-.411,2.6-.7,4.782L17.307,19.2s-.082.948-.822,1.113a3.276,3.276,0,0,1-2.056-.742c-.164-.124-3.084-1.979-4.111-2.886a.782.782,0,0,1,.041-1.319l4.317-4.122c.493-.495.987-1.649-1.069-.247L7.851,14.909a2.41,2.41,0,0,1-1.891.041l-2.672-.824s-.987-.618.7-1.237C8.1,10.952,13.154,8.973,17.636,7.118Z" />
          </svg>
        </span>
        <span className={styles.navLinkText}>Telegram</span>
      </a>
    </div>
  </header>
);

export default Header;
