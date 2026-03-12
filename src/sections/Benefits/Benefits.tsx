import type { FC } from 'react';
import styles from './Benefits.module.css';

const CRYPTO_PATH = '/crypto/';

const BENEFITS = [
  { image: 'Компонент 64 – 1.svg', imageHover: 'Компонент 64 – 1 (Состояние наведения).svg' },
  { image: 'Компонент 65 – 1.svg', imageHover: 'Компонент 65 – 1 (Состояние наведения).svg' },
  { image: 'Компонент 66 – 2.svg', imageHover: 'Компонент 66 – 2 (Состояние наведения).svg' },
] as const;

const Benefits: FC = () => (
  <section className={styles.section}>
    <div className={styles.inner}>
      {BENEFITS.map(({ image, imageHover }, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.cardImageWrap} aria-hidden>
            <img src={CRYPTO_PATH + encodeURIComponent(image)} alt="" className={styles.cardImageDefault} />
            <img src={CRYPTO_PATH + encodeURIComponent(imageHover)} alt="" className={styles.cardImageHover} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Benefits;
