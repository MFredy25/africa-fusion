'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/hub.module.css';

export default function HubHeader() {
  /* ─── Thème clair / sombre détecté depuis l’OS ─── */
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setIsDark(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  const colors = {
    bg: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#e0e0e0' : '#333333',
    border: isDark ? '#444' : '#ccc',
  };

  return (
    <header
      className={styles.navbar}
      style={{
        background: colors.bg,
        color: colors.text,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div className={styles.logo} style={{ color: colors.text }}>
        <Image
          src="/images/fusion_africa.png"
          alt="Logo"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
        />
        <span>Logo</span>
      </div>

      <nav className={styles.navLinks} style={{ color: colors.text }}>
        <Link href="/home" style={{ color: 'inherit' }}>
          Accueil
        </Link>
        <Link href="/services" style={{ color: 'inherit' }}>
          Nos Services
        </Link>
        <Link href="/annuaire" style={{ color: 'inherit' }}>
          Annuaire
        </Link>
        <Link href="/deals-m-a" style={{ color: 'inherit' }}>
          Deals M&A
        </Link>
        <Link href="/crowdfunding" style={{ color: 'inherit' }}>
          Crowdfunding
        </Link>
        <Link href="/connexion" style={{ color: 'inherit' }}>
          Connexion /
        </Link>
      </nav>
    </header>
  );
}