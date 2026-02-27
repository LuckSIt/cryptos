import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './IntroScreen.module.css';

const LOGO_IMAGE = '/img/logo.png';
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
  onReachMainPage?: () => void;
};

const IntroScreen = ({ onReachMainPage }: IntroScreenProps) => {
  const [step, setStep] = useState<Step>(0);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('buyer');
  const [lang, setLang] = useState<Lang>('RU');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const businessVideoRef = useRef<HTMLVideoElement>(null);
  const langCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showLogo = step >= 1;
  const showVideo = step >= 2;
  const showPage = step >= 3;
  const showBusinessVideo = showPage && audienceMode === 'business';

  useEffect(() => {
    if (step === 3) onReachMainPage?.();
  }, [step, onReachMainPage]);

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
        style={{ backgroundImage: `url(${LOGO_IMAGE})` }}
        aria-hidden
      />

      <div
        className={`${styles.page} ${showPage ? styles.pageVisible : ''}`}
        aria-hidden={!showPage}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={`${styles.pageHeader} ${audienceMode === 'business' ? styles.pageHeaderBusiness : ''}`}>
          <div className={styles.headerTop}>
            <div className={styles.headerLogo}>
              <span className={styles.headerLogoText}>Binary Flow</span>
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
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </span>
                WhatsApp
              </a>
              <a href="https://t.me/" className={styles.headerMessengerLink} aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                <span className={`${styles.headerMessengerIcon} ${styles.headerMessengerIconTelegram}`} aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M19.985 5.54a.69.69 0 0 0-.61-.31.78.78 0 0 0-.41.11L3.435 11.23a.75.75 0 0 0 .04 1.36l3.86 1.48 1.48 4.71a.75.75 0 0 0 1.34.22l2.36-3.14 4.5 3.32a.75.75 0 0 0 1.18-.53l2.25-12.51a.75.75 0 0 0-.46-.6zm-9.3 9.45l-.47 1.95-.91-2.91 8.87-6.04-7.49 7z" />
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
