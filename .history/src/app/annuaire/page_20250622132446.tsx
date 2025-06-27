'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/company';

export default function Annuaire() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [columns, setColumns] = useState(5); // 5 desktop, 3 mobile

  /* ── Thème + responsive ── */
  useEffect(() => {
    const mqDark = window.matchMedia('(prefers-color-scheme: dark)');
    const applyDark = () => setIsDark(mqDark.matches);
    applyDark();
    mqDark.addEventListener('change', applyDark);

    const applyCols = () => setColumns(window.innerWidth < 768 ? 3 : 5);
    applyCols();
    window.addEventListener('resize', applyCols);

    return () => {
      mqDark.removeEventListener('change', applyDark);
      window.removeEventListener('resize', applyCols);
    };
  }, []);

  /* ── Firebase ── */
  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(collection(db, 'companies'), orderBy('createdAt', 'desc')),
      );
      setCompanies(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            rccm: data.rccm || '',
            name: data.name,
            description: data.description,
            category: data.category,
            revenue: data.revenue,
            location: data.location,
            email: data.email,
            createdAt: data.createdAt || null,
          } as Company;
        }),
      );
    })();
  }, []);

  /* ── Pagination ── */
  const ITEMS_PER_PAGE = columns * 10; // 50 desktop / 30 mobile
  const filteredCompanies = companies.filter(
    (c) =>
      (!typeFilter || c.category === typeFilter) &&
      (!sectorFilter || c.location.startsWith(sectorFilter)) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase())),
  );
  const pageCount = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  useEffect(() => setPage(1), [typeFilter, sectorFilter, search, columns]);

  /* ── Filtres uniques ── */
  const uniqueTypes = [...new Set(companies.map((c) => c.category))];
  const uniqueSectors = [
    ...new Set(companies.map((c) => c.location.split(' - ')[0])),
  ];

  /* ── Couleurs ── */
  const colors = {
    bg: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#e0e0e0' : '#333333',
    cardBg: isDark ? '#2a2a2a' : '#f9f9f9',
    border: isDark ? '#444' : '#ccc',
  };
  const isMobile = columns === 3;

  /* ── Reset filtres ── */
  const resetFilters = () => {
    setTypeFilter('');
    setSectorFilter('');
    setSearch('');
  };

  /* ────────── RENDER ────────── */
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: colors.bg,
        color: colors.text,
        fontFamily: 'sans-serif',
      }}
    >
      {/* ── Header ── */}
      <header
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
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            gap: '1rem',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/fusion_africa.png"
              alt="Logo"
              width={28}
              height={28}
              style={{ objectFit: 'contain' }}
            />
          </Link>

          <nav
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'nowrap',
              whiteSpace: 'nowrap',
            }}
          >
            <Link href="/hub" style={{ color: 'inherit' }}>
              Accueil
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
        </div>
      </header>

     {/* ── Contenu principal ── */}
<main
  style={{
    flex: '1 0 auto',
    padding: '3rem 40px', // ← 30 px à gauche et à droite
    width: '100%',
  }}
>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#003087' }}>
          Annuaire
        </h1>
        <p style={{ marginBottom: '1.5rem' }}>
          Recherchez des entreprises innovantes et en pleine croissance
        </p>

        {/* Filtres */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: 5,
              border: `1px solid ${colors.border}`,
              background: colors.bg,
              color: colors.text,
            }}
          >
            <option value="">Filtrer par type</option>
            {uniqueTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: 5,
              border: `1px solid ${colors.border}`,
              background: colors.bg,
              color: colors.text,
            }}
          >
            <option value="">Filtrer par localisation</option>
            {uniqueSectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Recherche"
            style={{
              padding: '0.5rem',
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              flex: 1,
              minWidth: 180,
              background: colors.bg,
              color: colors.text,
            }}
          />

          <button
            onClick={resetFilters}
            style={{
              padding: '0.5rem 1rem',
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              background: colors.bg,
              color: colors.text,
              cursor: 'pointer',
            }}
          >
            Réinitialiser mes filtres
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              padding: '0.4rem 0.7rem',
              background: colors.bg,
              color: colors.text,
              cursor: 'pointer',
            }}
          >
            {viewMode === 'grid' ? '📃' : '🔲'}
          </button>
        </div>

        {/* Cartes / liste */}
        {viewMode === 'grid' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: '1rem',
            }}
          >
            {paginatedCompanies.map((c) => {
              const base = {
                background: colors.cardBg,
                borderRadius: 10,
                padding: '0.6rem',
                border: `1px solid ${colors.border}`,
              } as const;

              return (
                <div
                  key={c.id}
                  style={
                    isMobile
                      ? {
                          ...base,
                          aspectRatio: '1 / 1',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }
                      : base
                  }
                >
                  <h3
                    style={{
                      color: '#003087',
                      fontSize: '1rem',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {c.name}
                  </h3>

                  <div
                    style={{
                      width: '100%',
                      height: isMobile ? '40%' : 120,
                      background: colors.border,
                      borderRadius: 6,
                      marginBottom: '0.8rem',
                    }}
                  />

                  <p
                    style={{
                      fontSize: '0.8rem',
                      marginBottom: '0.8rem',
                      color: colors.text,
                    }}
                  >
                    {c.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                    }}
                  >
                    <span>
                      📂 <strong>{c.category}</strong>
                    </span>
                    <span>📍 {c.location}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                    }}
                  >
                    <span>
                      💰 <strong>{c.revenue}</strong>
                    </span>
                    <a
                      href={`mailto:${c.email}`}
                      style={{ textDecoration: 'none', color: '#003087' }}
                    >
                      📧 Contact
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {paginatedCompanies.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  padding: '0.8rem',
                  background: colors.cardBg,
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#003087' }}>{c.name}</h3>
                  <p
                    style={{
                      margin: '0.4rem 0',
                      fontSize: '0.85rem',
                      color: colors.text,
                    }}
                  >
                    {c.description}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: colors.text }}>
                    📂 <strong>{c.category}</strong> · 📍 {c.location} · 💰{' '}
                    {c.revenue}
                  </p>
                </div>
                <a
                  href={`mailto:${c.email}`}
                  style={{
                    textDecoration: 'none',
                    color: '#003087',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                  }}
                >
                  📧 Contact
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Pagination en bas de page ── */}
      {pageCount > 1 && (
        <div
          style={{
            flexShrink: 0,
            marginTop: isMobile ? 'auto' : 0,
            padding: '1rem 0 2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '0.3rem 0.7rem',
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
              background: colors.bg,
              color: colors.text,
              cursor: page === 1 ? 'default' : 'pointer',
            }}
          >
            ‹
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              style={{
                padding: '0.3rem 0.7rem',
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                background: n === page ? '#003087' : colors.bg,
                color: n === page ? '#fff' : colors.text,
                cursor: 'pointer',
              }}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            style={{
              padding: '0.3rem 0.7rem',
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
              background: colors.bg,
              color: colors.text,
              cursor: page === pageCount ? 'default' : 'pointer',
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
