import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Reviews.module.css';

const AVATAR_SVG = '/crypto/' + encodeURIComponent('Avatar - Circle - Icon - Medium.svg');

const REVIEW_TEXT =
  'Continually fashion strategic metrics through interdependent partnerships. Dramatically disseminate enterprise-wide initiatives vis-a-vis distributed alignments. Phosfluorescently leverage existing revolutionary alignments rather';

const REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: 'Han Solo',
  date: i % 3 === 0 ? '2 days ago' : i % 3 === 1 ? '5 days ago' : '7 days ago',
  text: REVIEW_TEXT,
}));

const LOOP_COPIES = 2;
const PAGES_COUNT = 2;

type ReviewsProps = { variant?: 'buyer' | 'business' };

const Reviews: FC<ReviewsProps> = ({ variant = 'buyer' }) => {
  const isBusiness = variant === 'business';
  const [currentPage, setCurrentPage] = useState(0);
  const gridWrapRef = useRef<HTMLDivElement>(null);

  const updatePageFromScroll = useCallback(() => {
    const el = gridWrapRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const page = el.scrollLeft < maxScroll / 2 ? 0 : 1;
    setCurrentPage(page);
  }, []);

  const handleScroll = useCallback(() => {
    updatePageFromScroll();
  }, [updatePageFromScroll]);

  const handleWheel = useCallback((e: WheelEvent) => {
    const el = gridWrapRef.current;
    if (!el || !e.deltaY) return;
    const hasHorizontalScroll = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScroll) return;
    e.preventDefault();
    const setWidth = el.scrollWidth / LOOP_COPIES;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft += e.deltaY;
    if (el.scrollLeft >= maxScroll) {
      el.scrollLeft -= setWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += setWidth;
    }
    updatePageFromScroll();
  }, [updatePageFromScroll]);

  const scrollToPage = useCallback((page: number) => {
    const el = gridWrapRef.current;
    if (!el) return;
    const setWidth = el.scrollWidth / LOOP_COPIES;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const targetLeft = maxScroll <= 0 ? 0 : (page === 0 ? 0 : maxScroll);
    el.scrollTo({ left: targetLeft, behavior: 'smooth' });
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const el = gridWrapRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const el = gridWrapRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <section id="reviews" className={`${styles.section} ${isBusiness ? styles.sectionBusiness : ''}`}>
      <div className={styles.content}>
        <h2 className={styles.title}>Отзывы</h2>
        <div ref={gridWrapRef} className={styles.gridWrap}>
        <ul className={styles.grid}>
          {Array.from({ length: LOOP_COPIES }, () => REVIEWS).flat().map(({ id, name, date, text }, index) => (
            <li key={`${id}-${index}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <img
                  src={AVATAR_SVG}
                  alt=""
                  className={styles.avatar}
                  width={48}
                  height={48}
                  aria-hidden
                />
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
