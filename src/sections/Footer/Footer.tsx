import type { FC } from 'react';
import styles from './Footer.module.css';

const PARTNERS = ['BINANCE', 'РБК', 'Binary Flow', 'BEST CHANGE', 'CoinMarketCap', 'BINANCE', 'РБК'] as const;

const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.partnersBar}>
        {PARTNERS.map((name, i) => (
          <span key={`${name}-${i}`} className={styles.partnerLogo}>
            {name}
          </span>
        ))}
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
