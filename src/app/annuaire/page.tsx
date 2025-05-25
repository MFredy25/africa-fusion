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

  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(collection(db, 'companies'), orderBy('createdAt', 'desc')),
      );
      setCompanies(
        snap.docs.map((d) => ({
          id: d.id,
          rccm: '',
          ...d.data(),
        } as Omit<Company, 'id'> & { id: string }))
      );
    })();
  }, []);

  const filteredCompanies = companies.filter(
    (c) =>
      (!typeFilter || c.category === typeFilter) &&
      (!sectorFilter || c.location.startsWith(sectorFilter)) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()))
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
    <div style={{ fontFamily: 'sans-serif' }}>
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
          />{' '}Logo
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/hub">Accueil</Link>
          <Link href="/annuaire">Annuaire</Link>
          <Link href="/deals-m-a">Deals M&A</Link>
          <Link href="/crowdfunding">Crowdfunding</Link>
          <Link href="/connexion">Connexion /</Link>
        </nav>
      </header>

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

        {/* Cartes entreprise */}
        {/* (contenu inchangé ici) */}
      </main>
    </div>
  );
}
