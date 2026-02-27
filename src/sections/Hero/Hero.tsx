import type { FC } from 'react';
import styles from './Hero.module.css';

const Hero: FC = () => (
  <section id="about" className={styles.section} aria-labelledby="hero-title">
    <div className={styles.inner}>
      <h1 id="hero-title" className={styles.title}>
        Добро пожаловать!
      </h1>
      <p className={styles.text}>
        Наш пункт обмена электронных валют – система, созданная на базе современного программного обеспечения и содержащая весь набор необходимых функций для удобной и безопасной конвертации наиболее распространенных видов электронных денег. За время работы мы приобрели репутацию проверенного партнера и делаем все возможное, чтобы ваши впечатления от нашего сервиса были только благоприятными.
      </p>
    </div>
  </section>
);

export default Hero;
