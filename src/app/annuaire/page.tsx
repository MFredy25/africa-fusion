'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/company';

export default function AnnuairePage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  /* — chargement Firestore — */
  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(collection(db, 'companies'), orderBy('createdAt', 'desc')),
      );
      setCompanies(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    })();
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      (!typeFilter || c.category === typeFilter) &&
      (!sectorFilter || c.location.startsWith(sectorFilter)) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase())),
  );

  const resetFilters = () => {
    setTypeFilter('');
    setSectorFilter('');
    setSearch('');
  };

  const uniqueTypes   = [...new Set(companies.map((c) => c.category))];
  const uniqueSectors = [...new Set(companies.map((c) => c.location.split(' - ')[0]))];

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* — Header simplifié — */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: 'white',
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
              background: '#ccc',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />{' '}
          Logo
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/hub">Accueil</Link>
          <Link href="/annuaire">Annuaire</Link>
          <Link href="/deals-m-a">Deals M&A</Link>
          <Link href="/crowdfunding">Crowdfunding</Link>
          <Link href="/connexion">Connexion /</Link>
        </nav>
      </header>

      {/* — Contenu — */}
      <main style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Annuaire</h1>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
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
              borderRadius: '5px',
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
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
              border: '1px solid #ccc',
              borderRadius: '5px',
              flex: 1,
              minWidth: 180,
            }}
          />
          <button
            onClick={resetFilters}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              background: 'white',
            }}
          >
            Réinitialiser mes filtres
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '0.4rem 0.7rem',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            {viewMode === 'grid' ? '📃' : '🔲'}
          </button>
        </div>

        {/* Affichage */}
        {viewMode === 'grid' ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
          >
            {filteredCompanies.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#f9f9f9',
                  borderRadius: 10,
                  padding: '1rem',
                  flex: '0 1 calc(25% - 1rem)',
                  boxShadow: '0 0 8px rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ color: '#003087', marginBottom: '0.5rem' }}>
                  {c.name}
                </h3>
                <div
                  style={{
                    width: '100%',
                    height: 160,
                    background: '#ccc',
                    borderRadius: 6,
                    marginBottom: '1rem',
                  }}
                />
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#444',
                    marginBottom: '1rem',
                  }}
                >
                  {c.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#333',
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
                    fontSize: '0.85rem',
                    color: '#333',
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
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredCompanies.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  borderRadius: 8,
                  padding: '1rem',
                  background: '#f9f9f9',
                  boxShadow: '0 0 4px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#003087' }}>{c.name}</h3>
                  <p style={{ margin: '0.5rem 0' }}>{c.description}</p>
                  <p style={{ margin: 0 }}>
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
                  }}
                >
                  📧 Contact
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
