import type { FC } from 'react';
import { Fragment } from 'react';
import styles from './Benefits.module.css';

const CRYPTO_PATH = '/crypto/';

const BENEFITS = [
  {
    image: 'Компонент 64 – 1.svg',
    imageHover: 'Компонент 64 – 1 (Состояние наведения).svg',
    aspectH: 416,
    title: 'Мгновенный обмен',
    bodyLines: [
      'Автоматическая обработка заявок в течение ',
      'пяти минут. Выводите криптовалюту без ',
      'лишних пауз.',
    ] as const,
  },
  {
    image: 'Компонент 65 – 1.svg',
    imageHover: 'Компонент 65 – 1 (Состояние наведения).svg',
    aspectH: 408,
    title: 'Лучшие курсы',
    bodyLines: [
      'Минимальные комиссии и выгодный курс ',
      'обмена. Мы мониторим рынок, чтобы вы ',
      'получали больше.',
    ] as const,
  },
  {
    image: 'Компонент 66 – 2.svg',
    imageHover: 'Компонент 66 – 2 (Состояние наведения).svg',
    aspectH: 406.114,
    title: 'Живая поддержка',
    bodyLines: [
      'Автоматическая обработка заявок в течение ',
      'пяти минут. Выводите криптовалюту без ',
      'лишних пауз.',
    ] as const,
  },
] as const;

const Benefits: FC = () => (
  <section className={styles.section} aria-label="Преимущества">
    <div className={styles.inner}>
      {BENEFITS.map(({ image, imageHover, aspectH, title, bodyLines }, i) => (
        <article
          key={i}
          className={styles.card}
          aria-labelledby={`benefit-title-${i}`}
        >
          <div
            className={styles.cardImageWrap}
            style={{ aspectRatio: `352 / ${aspectH}` }}
          >
            <div className={styles.cardImgLayer} aria-hidden>
              <img
                src={CRYPTO_PATH + encodeURIComponent(image)}
                alt=""
                className={styles.cardImageDefault}
              />
              <img
                src={CRYPTO_PATH + encodeURIComponent(imageHover)}
                alt=""
                className={styles.cardImageHover}
              />
            </div>
            <div className={styles.cardText}>
              <h3 className={styles.cardTitle} id={`benefit-title-${i}`}>
                {title}
              </h3>
              <p className={styles.cardBody}>
                {bodyLines.map((line, j) => (
                  <Fragment key={j}>
                    {j > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Benefits;
