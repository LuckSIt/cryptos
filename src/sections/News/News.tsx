import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './News.module.css';

const LOREM =
  'Continually fashion strategic metrics through interdependent partnerships. Dramatically disseminate enterprise-wide initiatives vis-a-vis distributed alignments. Phosfluorescently leverage existing';

const NEWS_ITEMS = [
  { id: 1, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
  { id: 2, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
  { id: 3, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
  { id: 4, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
] as const;

const LOOP_COPIES = 3;
const LOOP_ITEMS = Array.from({ length: LOOP_COPIES }, () => NEWS_ITEMS).flat().map((item, index) => ({ ...item, key: `${item.id}-${Math.floor(index / NEWS_ITEMS.length)}-${index}` }));

const PAGES_COUNT = NEWS_ITEMS.length;

const News: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const listWrapRef = useRef<HTMLDivElement>(null);

  const setScrollToMiddleSet = useCallback(() => {
    const el = listWrapRef.current;
    if (!el) return;
    const totalSetWidth = el.scrollWidth / LOOP_COPIES;
    el.scrollLeft = totalSetWidth;
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setScrollToMiddleSet());
    return () => cancelAnimationFrame(raf);
  }, [setScrollToMiddleSet]);

  const handleScroll = useCallback(() => {
    const el = listWrapRef.current;
    if (!el) return;
    const totalSetWidth = el.scrollWidth / LOOP_COPIES;
    let { scrollLeft } = el;
    if (scrollLeft <= 0) {
      el.scrollLeft = totalSetWidth * 2 - 2;
      scrollLeft = totalSetWidth * 2 - 2;
    } else if (scrollLeft >= totalSetWidth * 2 - 1) {
      el.scrollLeft = totalSetWidth;
      scrollLeft = totalSetWidth;
    }
    const positionInSet = totalSetWidth > 0 ? Math.min(1, (scrollLeft - totalSetWidth) / totalSetWidth) : 0;
    const page = Math.max(0, Math.min(PAGES_COUNT - 1, Math.floor(positionInSet * PAGES_COUNT)));
    setCurrentPage(page);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    const el = listWrapRef.current;
    if (!el || !e.deltaY) return;
    const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScroll) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  useEffect(() => {
    const el = listWrapRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const scrollToPage = useCallback((pageIndex: number) => {
    const el = listWrapRef.current;
    if (!el) return;
    const totalSetWidth = el.scrollWidth / LOOP_COPIES;
    const targetScroll = totalSetWidth + (pageIndex / PAGES_COUNT) * totalSetWidth;
    el.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }, []);

  return (
    <section id="news" className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Новости</h2>
        <div ref={listWrapRef} className={styles.listWrap} onScroll={handleScroll}>
          <ul className={styles.list}>
        {LOOP_ITEMS.map(({ key, id, title, date, text }) => (
          <li key={key} className={styles.article}>
            <h3 className={styles.articleTitle}>{title}</h3>
            <time className={styles.articleDate} dateTime="">
              {date}
            </time>
            <p className={styles.articleText}>{text}</p>
            <a href="#news" className={styles.readBtn}>Читать</a>
          </li>
        ))}
          </ul>
        </div>
      </div>
      <div className={styles.pagination} role="tablist" aria-label="Страницы новостей">
        {Array.from({ length: PAGES_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === currentPage}
            aria-label={`Страница ${i + 1}`}
            className={i === currentPage ? `${styles.dot} ${styles.dotActive}` : styles.dot}
            onClick={() => scrollToPage(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default News;
