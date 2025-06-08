"use client";

import Link from "next/link";
import styles from "../styles/hub.module.css";

export default function HubHeader() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon} />
        <span>Logo</span>
      </div>

      <nav className={styles.navLinks}>
        <Link href="/home">Accueil</Link>
        <Link href="/services">Nos Services</Link>
        <Link href="/annuaire">Annuaire</Link>
        <Link href="/deals-m-a">Deals M&A</Link>
        <Link href="/crowdfunding">Crowdfunding</Link>
        <Link href="/connexion">Connexion /</Link>
      </nav>
    </header>
  );
}
