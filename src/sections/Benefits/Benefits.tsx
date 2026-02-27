import type { FC } from 'react';
import styles from './Benefits.module.css';

const BENEFITS = [
  {
    title: 'Мгновенный обмен',
    text: 'Автоматическая обработка заявок в течение пяти минут. Выводите криптовалюту без лишних пауз.',
  },
  {
    title: 'Лучшие курсы',
    text: 'Минимальные комиссии и выгодный курс обмена. Мы мониторим рынок, чтобы вы получали больше.',
  },
  {
    title: 'Живая поддержка',
    text: 'Наша команда поддержки всегда на связи. Ответим на вопросы и поможем с обменом в любое время.',
  },
] as const;

const Benefits: FC = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      {BENEFITS.map(({ title, text }) => (
        <article key={title} className={styles.card}>
          <div className={styles.imagePlaceholder} aria-hidden>
            Фото позже
          </div>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardText}>{text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Benefits;
