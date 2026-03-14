import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Reviews.module.css';

const REVIEW_TEXT =
  'Continually fashion strategic metrics through interdependent partnerships. Dramatically disseminate enterprise-wide initiatives vis-a-vis distributed alignments. Phosfluorescently leverage existing revolutionary alignments rather';

const REVIEWS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: 'Han Solo',
  date: '2 days ago',
  text: REVIEW_TEXT,
}));

const LOOP_COPIES = 3;
const LOOP_ITEMS = Array.from({ length: LOOP_COPIES }, () => REVIEWS).flat().map((item, index) => ({
  ...item,
  key: `${item.id}-${Math.floor(index / REVIEWS.length)}-${index}`,
}));

const PAGES_COUNT = REVIEWS.length;

type ReviewsProps = { variant?: 'buyer' | 'business' };

const Reviews: FC<ReviewsProps> = ({ variant = 'buyer' }) => {
  const isBusiness = variant === 'business';
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
    <section id="reviews" className={`${styles.section} ${isBusiness ? styles.sectionBusiness : ''}`}>
      <div className={styles.content}>
        <h2 className={styles.title}>Отзывы</h2>
        <div ref={listWrapRef} className={styles.listWrap} onScroll={handleScroll}>
          <ul className={styles.list}>
            {LOOP_ITEMS.map(({ key, id, name, date, text }) => (
              <li key={key} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatar} aria-hidden />
                  <div className={styles.cardMeta}>
                    <span className={styles.cardName}>{name}</span>
                    <span className={styles.cardDate}>{date}</span>
                  </div>
                </div>
                <p className={styles.cardText}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.pagination} role="tablist" aria-label="Страницы отзывов">
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

export default Reviews;
