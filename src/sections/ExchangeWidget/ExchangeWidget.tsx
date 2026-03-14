import { useState, useRef, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import styles from './ExchangeWidget.module.css';

const SWAP_ICON_SVG = '/crypto/' + encodeURIComponent('icon-outlined-editor-column-width.svg');
const SWAP_ICON_HOVER_SVG = '/crypto/' + encodeURIComponent('icon-outlined-editor-column-width (Состояние наведения).svg');

const TABS = ['All', 'Crypto', 'Fiat', 'Stable', 'Cash'] as const;
const TABS_BUSINESS = ['Fiat', 'Crypto', 'Stable'] as const;
const TAB_LABELS_BUSINESS: Record<string, string> = { Fiat: 'Безнал', Crypto: 'Крипто', Stable: 'Стейбл' };

const SEND_OPTIONS = ['Сбербанк', 'Тинькоф', 'Альфа-банк', 'Райффайзен', 'ПСБ', 'ВТБ'] as const;
const RECEIVE_OPTIONS = ['USDT Tether TRC-20', 'Bitcoin BTC', 'Ethereum ETH', 'BNB BNB', 'XRP XRP', 'Solana SOL'] as const;

const getCurrencyLabel = (option: string): string => {
  if ((SEND_OPTIONS as readonly string[]).includes(option)) return 'RUB';
  if (option.startsWith('USDT')) return 'USDT';
  const parts = option.split(' ');
  return parts[parts.length - 1] || option;
};

const INSTRUCTION_STEPS = [
  'Создайте заявку, указав сумму, Ваш e-mail, контакт и номер вашей карты. Будьте внимательны при вводе данных. Нажмите продолжить.',
  'Ознакомьтесь с условиями договора на оказание услуг обмена, если вы принимаете их, поставьте галочку в соответствующем поле/нажмите кнопку («Согласен»). Еще раз проверьте данные заявки и нажмите создать заявку.',
  'Оплатите заявку. Переводите точную сумму, указанною в системе, в противном случае обмен может затянуться, т.к. потребуются дополнительные уточнения.',
  'После перевода нажмите «Я оплатил». С этого момента заявка начнет обрабатываться.',
  'После выполнения указанных действий, система переместит Вас на страницу «Состояние заявки», где будет указан статус вашего перевода',
  'Операция занимает от 5 до 60 минут в рабочее время (11.00 – 22.00 по МСК), иногда возможны задержки из за очереди или технических моментов.',
];

const PersonIcon = ({ className }: { className?: string } = {}) => (
  <svg className={className ?? styles.optionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const renderOptionLabel = (text: string, isTrigger = true) => {
  const i = text.indexOf(' ');
  const strongClass = isTrigger ? styles.selectTriggerTextStrong : styles.optionTextStrong;
  const regularClass = isTrigger ? styles.selectTriggerTextRegular : styles.optionTextRegular;
  const wrapClass = isTrigger ? styles.selectTriggerText : undefined;
  if (i === -1) {
    return wrapClass ? <span className={wrapClass}>{text}</span> : <><span className={strongClass}>{text}</span></>;
  }
  const first = text.slice(0, i);
  const rest = text.slice(i + 1);
  if (wrapClass) {
    return (
      <span className={wrapClass}>
        <span className={strongClass}>{first}</span>{' '}
        <span className={regularClass}>{rest}</span>
      </span>
    );
  }
  return (
    <>
      <span className={strongClass}>{first}</span> <span className={regularClass}>{rest}</span>
    </>
  );
};

type ExchangeWidgetProps = { variant?: 'buyer' | 'business' };

const ExchangeWidget: FC<ExchangeWidgetProps> = ({ variant = 'buyer' }) => {
  const isBusiness = variant === 'business';
  const visibleTabs = isBusiness ? (TABS_BUSINESS as unknown as readonly string[]) : TABS;
  const getTabLabel = (tab: string) => (isBusiness ? TAB_LABELS_BUSINESS[tab] ?? tab : tab);

  const [sendTab, setSendTab] = useState<(typeof TABS)[number]>('Fiat');
  const [receiveTab, setReceiveTab] = useState<(typeof TABS)[number]>('Crypto');
  const [sendAmount, setSendAmount] = useState('100');
  const [receiveAmount, setReceiveAmount] = useState('7895');
  const [sendOption, setSendOption] = useState<string>('Сбербанк');
  const [receiveOption, setReceiveOption] = useState<string>('USDT Tether TRC-20');
  const [sendOpen, setSendOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [instructionExpanded, setInstructionExpanded] = useState(false);
  const [backdropClip, setBackdropClip] = useState<string | null>(null);
  const [backdropTop, setBackdropTop] = useState(0);
  const sendRef = useRef<HTMLDivElement>(null);
  const receiveRef = useRef<HTMLDivElement>(null);
  const instructionWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const leftOptions: readonly string[] = (RECEIVE_OPTIONS as readonly string[]).includes(sendOption)
    ? RECEIVE_OPTIONS
    : SEND_OPTIONS;
  const rightOptions: readonly string[] = (SEND_OPTIONS as readonly string[]).includes(receiveOption)
    ? SEND_OPTIONS
    : RECEIVE_OPTIONS;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (sendRef.current && !sendRef.current.contains(e.target as Node)) setSendOpen(false);
      if (receiveRef.current && !receiveRef.current.contains(e.target as Node)) setReceiveOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    if (!instructionExpanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInstructionExpanded(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [instructionExpanded]);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#rules') setInstructionExpanded(true);
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const updateBackdropClip = useCallback(() => {
    const wrap = instructionWrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;
    const sectionRect = section.getBoundingClientRect();
    const top = Math.max(0, sectionRect.top);
    setBackdropTop(top);
    const r = wrap.getBoundingClientRect();
    const w = window.innerWidth;
    const h = window.innerHeight - top;
    if (h <= 0) return;
    const l = Math.max(0, Math.min(100, (r.left / w) * 100));
    const t = Math.max(0, Math.min(100, ((r.top - top) / h) * 100));
    const right = Math.max(0, Math.min(100, (r.right / w) * 100));
    const bottom = Math.max(0, Math.min(100, ((r.bottom - top) / h) * 100));
    setBackdropClip(
      `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${l}% ${t}%, ${l}% ${bottom}%, ${right}% ${bottom}%, ${right}% ${t}%, ${l}% ${t}%)`
    );
  }, []);

  useEffect(() => {
    if (!instructionExpanded) {
      setBackdropClip(null);
      setBackdropTop(0);
      return;
    }
    updateBackdropClip();
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(updateBackdropClip);
    });
    window.addEventListener('scroll', updateBackdropClip, true);
    window.addEventListener('resize', updateBackdropClip);
    const wrap = instructionWrapRef.current;
    const ro = wrap ? new ResizeObserver(updateBackdropClip) : null;
    if (ro && wrap) ro.observe(wrap);
    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener('scroll', updateBackdropClip, true);
      window.removeEventListener('resize', updateBackdropClip);
      ro?.disconnect();
    };
  }, [instructionExpanded, updateBackdropClip]);

  const handleSwap = () => {
    setSendOption(receiveOption);
    setReceiveOption(sendOption);
    setSendAmount(receiveAmount);
    setReceiveAmount(sendAmount);
    setSendTab(receiveTab);
    setReceiveTab(sendTab);
  };

  return (
    <section
          ref={sectionRef}
          id="exchange"
          className={`${styles.section} ${instructionExpanded ? styles.sectionInstructionOpen : ''} ${isBusiness ? styles.sectionBusiness : ''}`}
          aria-labelledby="exchange-title"
        >
      <div className={styles.sectionInner}>
        <div className={styles.container}>
          <div className={styles.grid}>
          <div>
            <h2 id="exchange-title" className={styles.columnTitle}>
              Отправляете
            </h2>
            <div className={styles.tabs} role="tablist">
              {visibleTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={sendTab === tab}
                  className={sendTab === tab ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                  onClick={() => setSendTab(tab as (typeof TABS)[number])}
                >
                  {getTabLabel(tab)}
                </button>
              ))}
            </div>
            <div className={styles.selectWrap} ref={sendRef}>
              <div
                className={sendOpen ? `${styles.selectField} ${styles.selectFieldOpen}` : styles.selectField}
                role="combobox"
                aria-expanded={sendOpen}
                aria-haspopup="listbox"
                aria-controls="send-listbox"
                aria-label="Способ отправки"
              >
                <span className={styles.selectIcon} aria-hidden />
                <button
                  type="button"
                  className={styles.selectTrigger}
                  onClick={(e) => { e.stopPropagation(); setSendOpen((v) => !v); }}
                  aria-label="Способ отправки"
                >
                  {renderOptionLabel(sendOption)}
                  <span className={styles.selectChevron} aria-hidden />
                </button>
              </div>
              <ul
                id="send-listbox"
                className={sendOpen ? styles.selectDropdown : styles.selectDropdownHidden}
                role="listbox"
                aria-hidden={!sendOpen}
              >
                {([...leftOptions] as string[]).filter((opt: string) => opt !== sendOption).map((opt: string) => (
                    <li
                      key={opt}
                      role="option"
                      aria-selected={opt === sendOption}
                      className={styles.selectOption}
                      onClick={() => { setSendOption(opt); setSendOpen(false); }}
                    >
                      <span className={styles.optionIconWrap}>
                        <PersonIcon />
                      </span>
                      {renderOptionLabel(opt, false)}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  className={styles.input}
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  aria-describedby="send-error"
                  aria-invalid
                />
              </div>
              <p id="send-error" className={styles.error}>
                <span className={styles.errorIcon} aria-hidden />
                {isBusiness ? (
                  <>Сумма должна быть больше <strong>15 000 000</strong> {getCurrencyLabel(sendOption)}</>
                ) : (
                  <>Сумма должна быть больше <strong>15 000</strong> {getCurrencyLabel(sendOption)}</>
                )}
              </p>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  className={styles.input}
                  value="78,95"
                  readOnly
                  aria-hidden
                />
              </div>
              <p className={styles.error}>
                <span className={styles.errorIcon} aria-hidden />
                {isBusiness ? (
                  <>Сумма должна быть больше <strong>15 000 000</strong> {getCurrencyLabel(sendOption)}</>
                ) : (
                  <>Сумма должна быть больше <strong>15 000</strong> {getCurrencyLabel(sendOption)}</>
                )}
              </p>
            </div>
          </div>

          <div className={styles.swapWrap}>
            <button
              type="button"
              className={styles.swapBtn}
              aria-label="Поменять местами"
              onClick={handleSwap}
            >
              <span className={styles.swapIconWrap}>
                <img src={SWAP_ICON_SVG} alt="" className={styles.swapIconDefault} aria-hidden />
                <img src={SWAP_ICON_HOVER_SVG} alt="" className={styles.swapIconHover} aria-hidden />
              </span>
            </button>
          </div>

          <div>
            <h2 className={styles.columnTitle}>
              Получаете
            </h2>
            <div className={styles.tabs} role="tablist">
              {visibleTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={receiveTab === tab}
                  className={receiveTab === tab ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                  onClick={() => setReceiveTab(tab as (typeof TABS)[number])}
                >
                  {getTabLabel(tab)}
                </button>
              ))}
            </div>
            <div className={styles.selectWrap} ref={receiveRef}>
              <div
                className={receiveOpen ? `${styles.selectField} ${styles.selectFieldOpen}` : styles.selectField}
                role="combobox"
                aria-expanded={receiveOpen}
                aria-haspopup="listbox"
                aria-controls="receive-listbox"
                aria-label="Валюта получения"
              >
                <span className={styles.selectIcon} aria-hidden />
                <button
                  type="button"
                  className={styles.selectTrigger}
                  onClick={(e) => { e.stopPropagation(); setReceiveOpen((v) => !v); }}
                  aria-label="Валюта получения"
                >
                  {renderOptionLabel(receiveOption)}
                  <span className={styles.selectChevron} aria-hidden />
                </button>
              </div>
              <ul
                id="receive-listbox"
                className={receiveOpen ? styles.selectDropdown : styles.selectDropdownHidden}
                role="listbox"
                aria-hidden={!receiveOpen}
              >
                  {([...rightOptions] as string[]).filter((opt: string) => opt !== receiveOption).map((opt: string) => (
                    <li
                      key={opt}
                      role="option"
                      aria-selected={opt === receiveOption}
                      className={styles.selectOption}
                      onClick={() => { setReceiveOption(opt); setReceiveOpen(false); }}
                    >
                      <span className={styles.optionIconWrap}>
                        <PersonIcon />
                      </span>
                      {renderOptionLabel(opt, false)}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  className={styles.input}
                  value={receiveAmount}
                  onChange={(e) => setReceiveAmount(e.target.value)}
                  aria-describedby="receive-error"
                  aria-invalid
                />
              </div>
              <p id="receive-error" className={styles.error}>
                <span className={styles.errorIcon} aria-hidden />
                {isBusiness ? (
                  <>Сумма должна быть больше <strong>200 000</strong> {getCurrencyLabel(receiveOption)}</>
                ) : (
                  <>Сумма должна быть больше <strong>200</strong> {getCurrencyLabel(receiveOption)}</>
                )}
              </p>
            </div>
            <div className={styles.infoBlock}>
              <p className={styles.info}>
                <span className={styles.infoIconWrap} aria-hidden>
                  <PersonIcon className={styles.infoPersonIcon} />
                </span>
                1 {getCurrencyLabel(sendOption)} = <strong>78,95</strong> {getCurrencyLabel(receiveOption)}
              </p>
              <p className={styles.info}>
                <span className={styles.infoIconWrap} aria-hidden>
                  <PersonIcon className={styles.infoPersonIcon} />
                </span>
                Резерв: <strong>12 564,55</strong> {getCurrencyLabel(receiveOption)}
              </p>
            </div>
          </div>
        </div>

          <div className={styles.ctaWrap}>
            <a href="#exchange" className={styles.cta}>
              {isBusiness ? 'Получить офер' : 'Обменять криптовалюту'}
            </a>
          </div>
        </div>

        {!isBusiness && (
        <div
            id="rules"
            ref={instructionWrapRef}
            className={`${styles.instructionWrap} ${instructionExpanded ? styles.instructionWrapOpen : ''}`}
          >
          <button
            type="button"
            id="instruction-title"
            className={`${styles.instructionBlock} ${instructionExpanded ? styles.instructionBlockOpen : ''}`}
            onClick={() => setInstructionExpanded((v) => !v)}
            aria-expanded={instructionExpanded}
            aria-controls="instruction-content"
          >
            <span className={styles.instructionLink}>
              <svg
                className={styles.instructionChevron}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
              Внимательно изучите инструкцию полностью
            </span>
            <span className={styles.instructionWarning} aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 22h20L12 2z" />
                <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {instructionExpanded && (
            <div
              id="instruction-content"
              className={styles.instructionExpanded}
              role="region"
              aria-labelledby="instruction-title"
            >
              <ol className={styles.instructionList}>
                {INSTRUCTION_STEPS.map((step, i) => (
                  <li key={i} className={styles.instructionStep}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        )}
      </div>

      {!isBusiness && instructionExpanded && (
        <div
          className={styles.instructionBackdrop}
          style={{ top: backdropTop, clipPath: backdropClip ?? undefined }}
          onClick={() => setInstructionExpanded(false)}
          aria-hidden
        />
      )}
    </section>
  );
};

export default ExchangeWidget;
