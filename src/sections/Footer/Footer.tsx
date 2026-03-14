import type { FC } from 'react';
import styles from './Footer.module.css';

const CRYPTO_PATH = '/crypto/';

const PARTNER_LOGOS = [
  { image: 'binance.svg', imageHover: 'binance (Состояние наведения).svg', name: 'Binance' },
  { image: 'Компонент 12 – 30.svg', imageHover: 'Компонент 12 – 30 (Состояние наведения).svg', name: 'РБК' },
  { image: 'Компонент 17 – 3.svg', imageHover: 'Компонент 17 – 3 (Состояние наведения).svg', name: 'Партнёр' },
  { image: 'Компонент 18 – 4.svg', imageHover: 'Компонент 18 – 4 (Состояние наведения).svg', name: 'Партнёр' },
  { image: 'logo-orig.svg', imageHover: 'logo-orig (Состояние наведения).svg', name: 'Flarex' },
] as const;

/** Копий в ленте: чтобы полоса заполняла экран и бесконечно крутилась без пустого края */
const PARTNER_STRIP_COPIES = 4;

type FooterProps = { variant?: 'buyer' | 'business' };

const Footer: FC<FooterProps> = ({ variant = 'buyer' }) => {
  const isBusiness = variant === 'business';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${styles.footer} ${isBusiness ? styles.footerBusiness : ''}`}>
      <div className={styles.partnersBar}>
        <div className={styles.partnersBarTrack} aria-hidden>
          {Array.from({ length: PARTNER_STRIP_COPIES }, () => PARTNER_LOGOS).flat().map(({ image, imageHover }, i) => (
            <span key={i} className={styles.partnerLogoWrap}>
              <img src={CRYPTO_PATH + encodeURIComponent(image)} alt="" className={styles.partnerLogoImg} />
              <img src={CRYPTO_PATH + encodeURIComponent(imageHover)} alt="" className={styles.partnerLogoImgHover} />
            </span>
          ))}
          <span className={styles.partnerTrackSpacer} />
        </div>
      </div>

      <div className={styles.scrollTopWrap}>
        <button
          type="button"
          className={styles.scrollTopBtn}
          onClick={scrollToTop}
          aria-label="Наверх"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>

      <div id="contacts" className={styles.mainBlock}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <a href="#main" className={styles.brandLink}>
              Binary Flow
            </a>
          </div>

          <div className={styles.columns}>
            <div>
              <h3 className={styles.columnTitle}>Техническая поддержка</h3>
              <p className={styles.columnText}>
                <strong>Время работы:</strong> Ежедневно с 11:00 до 22:00
              </p>
              <p className={styles.columnText}>
                <strong>Поддержка по почте:</strong> support@binaryflow.example
              </p>
            </div>
            <div>
              <h3 className={styles.columnTitle}>Сотрудничество и PR</h3>
              <p className={styles.columnText}>
                <strong>Время работы:</strong> Ежедневно с 11:00 до 22:00
              </p>
              <p className={styles.columnText}>
                <strong>Поддержка по почте:</strong> support@binaryflow.example
              </p>
            </div>
            <nav aria-label="Футер" className={styles.linksWrap}>
              <h3 className={styles.columnTitle}>Разделы</h3>
              <ul className={styles.links}>
                <li><a href="#exchange">Обмен</a></li>
                <li><a href="#rules">Правила обмена</a></li>
                <li><a href="#reviews">Отзывы</a></li>
                <li><a href="#rules">Ответы на вопросы</a></li>
                <li><a href="#rules">AML/KYC</a></li>
                <li><a href="#contacts">Контакты</a></li>
              </ul>
            </nav>
          </div>

          <p className={styles.copyright}>
            Binary Flow – Сервис обмена электронных валют. Copyright © 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
