import type { FC } from 'react';
import { useState } from 'react';
import styles from './Reviews.module.css';

const REVIEW_TEXT =
  'Continually fashion strategic metrics through interdependent partnerships. Dramatically disseminate enterprise-wide initiatives vis-a-vis distributed alignments. Phosfluorescently leverage existing revolutionary alignments rather';

const REVIEWS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: 'Han Solo',
  date: '2 days ago',
  text: REVIEW_TEXT,
}));

const PAGES_COUNT = 4;

const Reviews: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Отзывы</h2>
        <div className={styles.listWrap}>
          <ul className={styles.list}>
            {REVIEWS.map(({ id, name, date, text }) => (
              <li key={id} className={styles.card}>
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
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
