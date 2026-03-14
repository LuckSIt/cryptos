import type { FC } from 'react';
import styles from './BusinessHowWeWork.module.css';

const STEPS = [
  {
    title: 'Заключение договора',
    description: 'Подписываем договор поставки/услуг (можно ЭДО).',
  },
  {
    title: 'Выставление счета',
    description: 'Выставляем инвойс на оплату в рублях/валюте',
  },
  {
    title: 'Оплата',
    description: 'Вы оплачиваете счет с расчетного счета компании.',
  },
  {
    title: 'Обмен и перевод',
    description: 'Мы фиксируем курс и отправляем крипту на ваш кошелек (или фиат на счет контрагента)',
  },
  {
    title: 'Документы',
    description: 'Отправляем закрывающие документы курьером или по ЭДО.',
  },
] as const;

const BusinessHowWeWork: FC = () => (
  <section className={styles.section} aria-labelledby="how-we-work-title">
    <h2 id="how-we-work-title" className={styles.title}>
      Как мы работаем
    </h2>
    <div className={styles.timelineContentWrap}>
    <div className={styles.timelineWrap}>
      <div className={styles.lineRowWrapper}>
        <div className={styles.lineRow}>
          <img
            src="/crypto/Линия 1.svg"
            alt=""
            className={styles.timelineLine}
            aria-hidden
          />
        </div>
      </div>
      {STEPS.map((step, i) => (
        <div key={i} className={styles.stepCard}>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <div className={styles.markerCell}>
            <span className={styles.stepMarker} aria-hidden />
          </div>
          <p className={styles.stepDescription}>{step.description}</p>
        </div>
      ))}
    </div>
    </div>
  </section>
);

export default BusinessHowWeWork;
