import type { FC } from 'react';
import styles from './BusinessScenarios.module.css';

const CRYPTO_PATH = '/crypto/';

const SCENARIOS = [
  {
    icon: '32. Worldwide.svg',
    title: 'ВЭД и Импорт',
    description: 'Оплата поставщикам в Китае, Турции, ОАЭ и Европе за считанные часы без SWIFT.',
  },
  {
    icon: '15. Insurance.svg',
    title: 'Защита капитала',
    description: 'Диверсификация активов компании в стейблкоины (USDT/USDC).',
  },
  {
    icon: '19. Send.svg',
    title: 'Выплаты партнерам',
    description: 'Трансграничные переводы фрилансерам и удаленным сотрудникам.',
  },
] as const;

const MAP_SVG = CRYPTO_PATH + encodeURIComponent('Сгруппировать 2130.svg');

const BusinessScenarios: FC = () => (
  <section className={styles.section} aria-labelledby="scenarios-title">
    <div className={styles.mapLayer} aria-hidden>
      <img src={MAP_SVG} alt="" className={styles.mapImage} />
    </div>
    <div className={styles.content}>
      <h2 id="scenarios-title" className={styles.title}>
        Сценарии использования
      </h2>
      <p className={styles.subtitle}>Зачем это вашему бизнесу?</p>
      <ul className={styles.list}>
        {SCENARIOS.map(({ icon, title, description }, i) => (
          <li key={i} className={styles.card}>
            <img
              src={CRYPTO_PATH + encodeURIComponent(icon)}
              alt=""
              className={styles.cardIcon}
              aria-hidden
            />
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default BusinessScenarios;
