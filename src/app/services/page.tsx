"use client";

import { FaBalanceScale, FaShieldAlt, FaChartLine } from "react-icons/fa";
import React from "react";
import styles from "../../styles/hub.module.css";

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.containerWrapper}>
        <div className={styles.hero}>
          <h1>Nos Services</h1>
        </div>

        <div className={styles.cards}>
          {/* Carte 1 */}
          <div className={styles.card}>
            <div className={styles.card1}>
              <FaBalanceScale className={styles.icon} />
              <h2 className={styles.cardTitle}>Conseils juridiques</h2>
              <p>
                Nos experts vous accompagnent dans toutes vos démarches
                juridiques, en vous apportant de solutions claires et
                personnalisées. Que ce soit pour la création d’entreprise, la
                rédaction de contrats ou la gestion de litiges, notre équipe
                veille à sécuriser juridiquement vos projets.
              </p>
            </div>
          </div>

          {/* Carte 2 */}
          <div className={styles.card}>
            <div className={styles.card2}>
              <FaShieldAlt className={styles.icon} />
              <h2 className={styles.cardTitle}>Conformité</h2>
              <p>
                Nous vous aidons à vous conformer aux réglementations en vigueur
                dans votre secteur. De l’audit à la mise en conformité, notre
                approche rigoureuse garantit une parfaite adéquation avec les
                exigences légales et normatives.
              </p>
            </div>
          </div>

          {/* Carte 3 */}
          <div className={styles.card}>
            <div className={styles.card3}>
              <FaChartLine className={styles.icon} />
              <h2 className={styles.cardTitle}>Analyses financières</h2>
              <p>
                Grâce à des outils d’analyse pointus, nous vous fournissons des
                diagnostics financiers détaillés. Nos services incluent
                l’évaluation des performances, la gestion des risques et
                l’optimisation de vos ressources pour une meilleure
                rentabilité.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
