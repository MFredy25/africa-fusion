'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/hub.module.css';

export default function HubHeader() {
  /* Thème clair / sombre */
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
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
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
        }}
      >
        {/* Logo 100×100 commun */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/fusion_africa.png"
            alt="Logo"
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Navigation */}
        <nav
          className={styles.navLinks}
          style={{
            display: 'flex',
            gap: '1rem',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
            color: colors.text,
          }}
        >
          <Link href="/home" style={{ color: 'inherit' }}>Accueil</Link>
          <Link href="/services" style={{ color: 'inherit' }}>Nos Services</Link>
          <Link href="/annuaire" style={{ color: 'inherit' }}>Annuaire</Link>
          <Link href="/deals-m-a" style={{ color: 'inherit' }}>Deals M&A</Link>
          <Link href="/crowdfunding" style={{ color: 'inherit' }}>Crowdfunding</Link>
          <Link href="/connexion" style={{ color: 'inherit' }}>Connexion /</Link>
        </nav>
      </div>
    </header>
  );
}