// File: app/annuaire/AnnuaireDetailsClient.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/company';

export default function AnnuaireDetailsClient() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isDark, setIsDark] = useState(false);

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
        })
      );
    })();
  }, []);

  // détecte le thème de l'utilisateur
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    return () =>
      mq.removeEventListener
        ? mq.removeEventListener('change', handler)
        : mq.removeListener(handler);
  }, []);

  const colors = {
    bg: isDark ? '#0f0f0f' : 'white',
    cardBg: isDark ? '#1d1d1d' : '#f9f9f9',
    border: isDark ? '#333' : '#ccc',
    text: isDark ? '#e5e5e5' : '#333',
    subText: isDark ? '#bbb' : '#555',
    link: isDark ? '#69b1ff' : '#003087',
    shadow: isDark ? '0 0 8px rgba(255,255,255,0.05)' : '0 0 8px rgba(0,0,0,0.05)',
  };

  const filteredCompanies = useMemo(
    () =>
      companies.filter(
        (c) =>
          (!typeFilter || c.category === typeFilter) &&
          (!sectorFilter || c.location.startsWith(sectorFilter)) &&
          (!search || c.name.toLowerCase().includes(search.toLowerCase()))
      ),
    [companies, typeFilter, sectorFilter, search]
  );

  const totalPages = Math.ceil(filteredCompanies.length / pageSize);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    setTypeFilter('');
    setSectorFilter('');
    setSearch('');
  };

  const uniqueTypes = [...new Set(companies.map((c) => c.category))];
  const uniqueSectors = [
    ...new Set(companies.map((c) => c.location.split(' - ')[0]))
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              background: colors.border,
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />{' '}
          Logo
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/hub" style={{ color: colors.link }}>Accueil</Link>
          <Link href="/annuaire" style={{ color: colors.link }}>Annuaire</Link>
          <Link href="/deals-m-a" style={{ color: colors.link }}>Deals M&A</Link>
          <Link href="/crowdfunding" style={{ color: colors.link }}>Crowdfunding</Link>
          <Link href="/connexion" style={{ color: colors.link }}>Connexion /</Link>
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Annuaire</h1>
        <p style={{ marginBottom: '1.5rem', color: colors.subText }}>
          Recherchez des entreprises innovantes et en pleine croissance
        </p>

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
              borderRadius: '5px',
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
              borderRadius: '5px',
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
              borderRadius: '5px',
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
              borderRadius: '5px',
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
              borderRadius: '5px',
              padding: '0.4rem 0.7rem',
              background: colors.bg,
              color: colors.text,
              cursor: 'pointer',
            }}
          >
            {viewMode === 'grid' ? '📃' : '🔲'}
          </button>
        </div>

        {viewMode === 'grid' ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
          >
            {paginatedCompanies.map((c) => (
              <div
                key={c.id}
                style={{
                  background: colors.cardBg,
                  borderRadius: 10,
                  padding: '0.8rem',
                  flex: '0 1 calc(20% - 1rem)',
                  boxShadow: colors.shadow,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <h3 style={{ color: colors.link, marginBottom: '0.5rem', fontSize: '1rem' }}>{c.name}</h3>
                <div
                  style={{
                    width: '100%',
                    height: 120,
                    background: colors.border,
                    borderRadius: 6,
                    marginBottom: '1rem',
                  }}
                />
                <p style={{ fontSize: '0.85rem', color: colors.text, marginBottom: '0.8rem' }}>{c.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: colors.text }}>
                  <span>📂 <strong>{c.category}</strong></span>
                  <span>📍 {c.location}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: colors.text }}>
                  <span>💰 <strong>{c.revenue}</strong></span>
                  <a href={`mailto:${c.email}`} style={{ textDecoration: 'none', color: colors.link }}>
                    📧 Contact
                  </a>
                </div>
              </div>
            ))}
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
                  padding: '1rem',
                  background: colors.cardBg,
                  boxShadow: colors.shadow,
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: colors.link }}>{c.name}</h3>
                  <p style={{ margin: '0.5rem 0', color: colors.text }}>{c.description}</p>
                  <p style={{ margin: 0, color: colors.text }}>
                    📂 <strong>{c.category}</strong> · 📍 {c.location} · 💰 {c.revenue}
                  </p>
                </div>
                <a
                  href={`mailto:${c.email}`}
                  style={{
                    textDecoration: 'none',
                    color: colors.link,
                    fontWeight: 'bold',
                  }}
                >
                  📧 Contact
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.3rem 0.7rem',
                borderRadius: 5,
                border: `1px solid ${colors.border}`,
                background: colors.bg,
                color: colors.text,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              ⬅
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                style={{
                  padding: '0.3rem 0.7rem',
                  borderRadius: 5,
                  border: `1px solid ${colors.border}`,
                  background: n === currentPage ? colors.link : colors.bg,
                  color: n === currentPage ? colors.bg : colors.text,
                  cursor: 'pointer',
                }}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.3rem 0.7rem',
                borderRadius: 5,
                border: `1px solid ${colors.border}`,
                background: colors.bg,
                color: colors.text,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              ➡
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// File: app/annuaire/page.tsx
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import AnnuaireDetailsClient from './AnnuaireDetailsClient';

export default function Page() {
  return <AnnuaireDetailsClient />;
}