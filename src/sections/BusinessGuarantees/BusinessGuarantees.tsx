import type { FC } from 'react';
import styles from './BusinessGuarantees.module.css';

const CRYPTO_PATH = '/crypto/';

/* Для hover подставьте файлы вида "Сгруппировать -1 (Состояние наведения).svg" в imageHover */
const ITEMS = [
  {
    image: 'Сгруппировать -1.svg',
    imageHover: 'Сгруппировать -1.svg',
    title: 'Лицензированный партнер',
    description:
      'Работаем в правовом поле, имеем официальную лицензию Кыргызстана (можно указать номер).',
  },
  {
    image: 'Сгруппировать -6.svg',
    imageHover: 'Сгруппировать -6.svg',
    title: 'Оплата\nпо безналу',
    description:
      'Принимаем и отправляем платежи с расчетных счетов юрлиц. Никаких сомнительных P2P переводов.',
  },
  {
    image: 'Сгруппировать -7.svg',
    imageHover: 'Сгруппировать -7.svg',
    title: '100% «Чистая» криптовалюта',
    description:
      'Проверка каждой транзакции через AML-сервисы. Вы получаете актив без «черной» истории.',
  },
  {
    image: 'Сгруппировать -8.svg',
    imageHover: 'Сгруппировать -8.svg',
    title: 'Бухгалтерская отчетность',
    description:
      'Предоставляем акты выполненных работ/услуг, счета-фактуры. У бухгалтерии не будет вопросов.',
  },
] as const;

const BusinessGuarantees: FC = () => (
  <section className={styles.section} aria-labelledby="guarantees-title">
    <h2 id="guarantees-title" className={styles.title}>
      Ваши гарантии и безопасность
    </h2>
    <p className={styles.intro}>
      Наш пункт обмена электронных валют – система, созданная на базе современного
      программного обеспечения и содержащая весь набор необходимых функций для удобной
      и безопасной конвертации наиболее востребованных активов.
    </p>
    <div className={styles.inner}>
      {ITEMS.map(({ image, imageHover, title, description }, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.cardImageWrap} aria-hidden>
            <img src={CRYPTO_PATH + encodeURIComponent(image)} alt="" className={styles.cardImageDefault} />
            <img src={CRYPTO_PATH + encodeURIComponent(imageHover)} alt="" className={styles.cardImageHover} />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default BusinessGuarantees;
