import type { FC } from 'react';
import { useState } from 'react';
import styles from './News.module.css';

const LOREM =
  'Continually fashion strategic metrics through interdependent partnerships. Dramatically disseminate enterprise-wide initiatives vis-a-vis distributed alignments. Phosfluorescently leverage existing';

const NEWS_ITEMS = [
  { id: 1, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
  { id: 2, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
  { id: 3, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
  { id: 4, title: 'Мы запустились', date: '2 дня назад в 9:41', text: LOREM },
] as const;

const PAGES_COUNT = 5;

const News: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section id="news" className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Новости</h2>
        <div className={styles.listWrap}>
          <ul className={styles.list}>
        {NEWS_ITEMS.map(({ id, title, date, text }) => (
          <li key={id} className={styles.article}>
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
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default News;
