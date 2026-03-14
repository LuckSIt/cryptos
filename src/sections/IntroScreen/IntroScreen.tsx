import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './IntroScreen.module.css';

const LOGO_SVG = '/crypto/Компонент%2067%20%E2%80%93%201.svg';
const VIDEO_SRC = '/img/clouds.mp4';
const BUSINESS_VIDEO_SRC = '/img/business.mp4';

type AudienceMode = 'buyer' | 'business';

type Step = 0 | 1 | 2 | 3;

type Lang = 'RU' | 'ENG';

const FlagRU = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
    <rect y="0" width="20" height="4.67" fill="#fff" />
    <rect y="4.67" width="20" height="4.67" fill="#0039A6" />
    <rect y="9.33" width="20" height="4.67" fill="#D52B1E" />
  </svg>
);

const FlagUS = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
    <rect width="20" height="14" fill="#B22234" />
    <path fill="#fff" d="M0 0h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0zm0 2.16h20v1.08H0z" />
    <rect y="0" width="7.69" height="7.56" fill="#3C3B6E" />
  </svg>
);

const LANG_CLOSE_DELAY_MS = 200;

type IntroScreenProps = {
  onReachMainPage?: (audienceMode: AudienceMode) => void;
};

const IntroScreen = ({ onReachMainPage }: IntroScreenProps) => {
  const [step, setStep] = useState<Step>(0);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('buyer');
  const [lang, setLang] = useState<Lang>('RU');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const businessVideoRef = useRef<HTMLVideoElement>(null);
  const langCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showLogo = step >= 1 && step < 3;
  const showVideo = step >= 2;
  const showPage = step >= 3;
  const showBusinessVideo = showPage && audienceMode === 'business';

  useEffect(() => {
    if (step === 3) onReachMainPage?.(audienceMode);
  }, [step, audienceMode, onReachMainPage]);

  const clearLangCloseTimeout = useCallback(() => {
    if (langCloseTimeoutRef.current !== null) {
      clearTimeout(langCloseTimeoutRef.current);
      langCloseTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (showVideo && audienceMode === 'buyer') {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [showVideo, audienceMode]);

  useEffect(() => {
    const video = businessVideoRef.current;
    if (!video) return;
    if (showBusinessVideo) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [showBusinessVideo]);

  useEffect(() => () => clearLangCloseTimeout(), [clearLangCloseTimeout]);

  const handleReveal = useCallback(() => {
    setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  }, []);

  return (
    <section
      id="main"
      className={styles.screen}
      onClick={handleReveal}
      onTouchStart={handleReveal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleReveal();
      }}
      aria-label="Нажмите или коснитесь для следующего шага"
    >
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={`${styles.video} ${showVideo && audienceMode === 'buyer' ? styles.videoVisible : ''}`}
          src={VIDEO_SRC}
          muted
          loop
          playsInline
          aria-hidden
        />
        <video
          ref={businessVideoRef}
          className={`${styles.video} ${styles.businessVideo} ${showBusinessVideo ? styles.videoVisible : ''}`}
          src={BUSINESS_VIDEO_SRC}
          muted
          loop
          playsInline
          aria-hidden
        />
        <div
          className={`${styles.videoOverlay} ${showVideo && audienceMode === 'buyer' ? styles.videoOverlayVisible : ''}`}
          aria-hidden
        />
        <div
          className={`${styles.videoOverlayBusiness} ${showBusinessVideo ? styles.videoOverlayBusinessVisible : ''}`}
          aria-hidden
        />
      </div>
      <div
        className={`${styles.logo} ${showLogo ? styles.logoVisible : ''}`}
        aria-hidden
      >
        <img src={LOGO_SVG} alt="" className={styles.logoImg} />
      </div>

      <div
        className={`${styles.page} ${showPage ? styles.pageVisible : ''}`}
        aria-hidden={!showPage}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={`${styles.pageHeader} ${audienceMode === 'business' ? styles.pageHeaderBusiness : ''}`}>
          <div className={styles.headerTop}>
            <div className={styles.headerLogo}>
              <a href="#main" className={styles.headerLogoLink} aria-label="Binary Flow">
                <img src={LOGO_SVG} alt="" width="80" height="30" className={styles.headerLogoImg} />
              </a>
            </div>
            <div className={styles.headerTabs}>
              <button
                type="button"
                className={audienceMode === 'buyer' ? `${styles.headerTab} ${styles.headerTabActive}` : styles.headerTab}
                onClick={() => setAudienceMode('buyer')}
              >
                Покупателю
              </button>
              <button
                type="button"
                className={audienceMode === 'business' ? `${styles.headerTab} ${styles.headerTabActive}` : styles.headerTab}
                onClick={() => setAudienceMode('business')}
              >
                Бизнесу
              </button>
            </div>
          </div>
          <nav className={styles.headerNav}>
            <a href="#main">Главная</a>
            <a href="#exchange">Обмен</a>
            <a href="#about">О нас</a>
            <a href="#news">Новости</a>
            <a href="#reviews">Отзывы</a>
            <a href="#rules">Правила обмена</a>
            <a href="#rules">Политика AML/KYC</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className={styles.headerRight}>
            <div className={styles.headerContacts}>
              <a href="tel:88002000600" className={styles.headerPhone}>
                <span className={styles.headerPhoneIcon} aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                8 800 2000 600
              </a>
              <a href="mailto:info@flarex.pro" className={styles.headerEmail}>
                <span className={styles.headerEmailIcon} aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className={styles.headerEmailTextDefault}>info@binarflow.kg</span>
                <span className={styles.headerEmailTextHover}>info@flarex.pro</span>
              </a>
            </div>
            <div
              className={`${styles.headerLangWrap} ${isLangOpen ? styles.headerLangWrapOpen : ''}`}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => { clearLangCloseTimeout(); setIsLangOpen(true); }}
              onMouseLeave={() => {
                langCloseTimeoutRef.current = setTimeout(() => setIsLangOpen(false), LANG_CLOSE_DELAY_MS);
              }}
            >
              <button type="button" className={styles.headerLang} aria-haspopup="listbox" aria-expanded={isLangOpen}>
                <span className={styles.headerLangFlag} aria-hidden>
                  {lang === 'RU' ? <FlagRU /> : <FlagUS />}
                </span>
                {lang}
              </button>
              <div
                className={`${styles.headerLangDropdown} ${isLangOpen ? styles.headerLangDropdownVisible : ''}`}
                role="listbox"
                aria-activedescendant={lang === 'RU' ? 'lang-ru' : 'lang-eng'}
                tabIndex={-1}
                onMouseEnter={clearLangCloseTimeout}
              >
                <button
                  type="button"
                  id="lang-eng"
                  className={styles.headerLangOption}
                  role="option"
                  aria-selected={lang === 'ENG'}
                  onClick={() => { setLang('ENG'); setIsLangOpen(false); }}
                >
                  <span className={styles.headerLangOptionFlag} aria-hidden>
                    <FlagUS />
                  </span>
                  ENG
                </button>
                <button
                  type="button"
                  id="lang-ru"
                  className={styles.headerLangOption}
                  role="option"
                  aria-selected={lang === 'RU'}
                  onClick={() => { setLang('RU'); setIsLangOpen(false); }}
                >
                  <span className={styles.headerLangOptionFlag} aria-hidden>
                    <FlagRU />
                  </span>
                  RU
                </button>
              </div>
            </div>
            <div className={styles.headerLoginWrap}>
              <button type="button" className={styles.headerLogin}>
                <span className={styles.headerLoginIcon} aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                Войти
              </button>
            </div>
            <div className={styles.headerMessengers}>
              <a href="#" className={styles.headerMessengerLink} aria-label="WhatsApp">
                <span className={styles.headerMessengerIcon} aria-hidden>
                  <svg viewBox="0 0 16 17" fill="currentColor">
                    <path d="M12.466,9.49c-.218-.09-1.261-.54-1.455-.61s-.332-.09-.481.1-.55.6-.676.73-.241.14-.458,0a6.076,6.076,0,0,1-1.707-.92A5.414,5.414,0,0,1,6.542,7.5c-.126-.18,0-.28.092-.38s.206-.21.321-.32a1.36,1.36,0,0,0,.206-.31.337.337,0,0,0,0-.33c0-.09-.481-1-.665-1.37s-.344-.32-.47-.32H5.568a.881.881,0,0,0-.573.23A1.978,1.978,0,0,0,4.25,6.25,3.339,3.339,0,0,0,5.109,8.2,9.259,9.259,0,0,0,8.765,11c.5.19.894.3,1.2.39a3.307,3.307,0,0,0,1.341.07,2.232,2.232,0,0,0,1.444-.88,1.476,1.476,0,0,0,.126-.88A1.232,1.232,0,0,0,12.466,9.49Z" transform="translate(0 0.552)" />
                    <path d="M14.229,2.841A7.9,7.9,0,0,0,8.548.5,7.99,7.99,0,0,0,1.664,12.474L.59,16.609l4.231-1.074a7.947,7.947,0,0,0,3.812.967H8.548a7.99,7.99,0,0,0,5.681-13.66ZM8.548,15.127a6.572,6.572,0,0,1-3.383-.934l-.236-.14-2.513.655.666-2.449-.15-.247a6.631,6.631,0,1,1,5.617,3.114Z" />
                  </svg>
                </span>
                WhatsApp
              </a>
              <a href="https://t.me/" className={styles.headerMessengerLink} aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                <span className={`${styles.headerMessengerIcon} ${styles.headerMessengerIconTelegram}`} aria-hidden>
                  <svg viewBox="2136 -4 24 24" fill="currentColor">
                    <path transform="translate(2138 -4)" d="M17.636,7.118s1.48-.577,1.357.824c-.041.577-.411,2.6-.7,4.782L17.307,19.2s-.082.948-.822,1.113a3.276,3.276,0,0,1-2.056-.742c-.164-.124-3.084-1.979-4.111-2.886a.782.782,0,0,1,.041-1.319l4.317-4.122c.493-.495.987-1.649-1.069-.247L7.851,14.909a2.41,2.41,0,0,1-1.891.041l-2.672-.824s-.987-.618.7-1.237C8.1,10.952,13.154,8.973,17.636,7.118Z" />
                  </svg>
                </span>
                Telegram
              </a>
            </div>
          </div>
        </header>

        <div className={`${styles.hero} ${audienceMode === 'business' ? styles.heroBusiness : ''}`}>
          {audienceMode === 'buyer' ? (
            <>
              <h1 className={styles.heroTitle}>
                Ваш надежный проводник в мире цифровых активов.
              </h1>
              <p className={styles.heroSubtitle}>
                Меняйте криптовалюту за считанные минуты без лишних проверок и скрытых комиссий.
              </p>
              <a href="#exchange" className={styles.heroCta}>
                Обменять криптовалюту
              </a>
            </>
          ) : (
            <>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleAccent}>Легальные</span> операции с<br/> криптовалютой для юридических лиц.
              </h1>
              <p className={styles.heroSubtitle}>
                Покупайте и продавайте активы по договору с оплатой на расчетный счет.<br/> Полный пакет закрывающих документов для бухгалтерии и налоговой.
              </p>
              <a href="#contacts" className={styles.heroCta}>
                Получить коммерческое предложение
              </a>
            </>
          )}
        </div>

        <div className={styles.scrollHint} aria-hidden>
          <span className={styles.scrollHintIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.5 21.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <g transform="translate(-4.25 -1.25)">
                <path d="M5,15a7,7,0,1,0,14,0V9A7,7,0,0,0,5,9Z" />
                <path d="M12,6v8" />
                <path d="M15,11l-3,3L9,11" />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
};

export default IntroScreen;
