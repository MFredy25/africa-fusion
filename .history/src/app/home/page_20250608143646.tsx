//Premier deployement

import styles from "../../styles/hub.module.css";
import Link from "next/link";
import HubHeader from "../../components/HubHeader";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HubHeader />

      <section className={styles.hero}>
        <h1>
          Bienvenue sur votre plate-forme<br />
          d'opportunités d’affaires inédites
        </h1>

        <p>
          Connectez-vous à un écosystème dynamique pour repérer, suivre
          et soutenir des initiatives économiques à fort potentiel.
        </p>

        <div className={styles.actions}>
          <Link href="/annuaire" className={styles.primaryBtn}>
            Explorer l’Annuaire
          </Link>
          <Link href="/deals-m-a" className={styles.secondaryBtn}>
            Découvrir les Deals
          </Link>
          <Link href="/crowdfunding" className={styles.tertiaryBtn}>
            Investir en&nbsp;Crowdfunding
          </Link>
        </div>
      </section>

      <section className={styles.cards}>
        <div className={`${styles.card} ${styles.card1}`}>
          <div className={styles.cardContent}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="4" width="7" height="16" rx="1.5" />
              <rect x="14" y="9" width="7" height="11" rx="1.5" />
              <path d="M6.5 8v2M6.5 13v2M17.5 13v2" />
            </svg>
            <p className={styles.cardTitle}>
              Découvrez les entre­prises qui façonnent l’avenir
            </p>
            <Link href="/annuaire" className={styles.cardBtn}>
              Voir plus
            </Link>
          </div>
        </div>

        <div className={`${styles.card} ${styles.card2}`}>
          <div className={styles.cardContent}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="4" y="4" width="16" height="13" rx="1.5" />
              <path d="M4 11h16M9 4v13" />
            </svg>
            <p className={styles.cardTitle}>Accédez à des deals M&A exclusifs</p>
            <Link href="/deals-m-a" className={styles.cardBtn}>
              Détails
            </Link>
          </div>
        </div>

        <div className={`${styles.card} ${styles.card3}`}>
          <div className={styles.cardContent}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 2a5 5 0 0 1 5 5c0 3-2 4-2 4H9s-2-1-2-4a5 5 0 0 1 5-5Z" />
              <path d="M9.5 11h5" />
              <path d="M12 13v7" />
              <path d="M8 20h8" />
            </svg>
            <p className={styles.cardTitle}>
              Soutenez des projets innovants et impactants
            </p>
            <Link href="/crowdfunding" className={styles.cardBtn}>
              Participer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
