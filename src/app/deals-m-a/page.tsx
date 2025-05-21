'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DealsPage() {
  const router = useRouter();

  const allDeals = [
    { title: 'Cession totale PME spécialisé dans la tech', type: 'Cession', sector: 'Technologie', location: 'Abidjan - Cocody', revenue: '120 000 000 F CFA', price: '150 000 000 F CFA' },
    { title: 'Entreprise logistique echerche acquéreur', type: 'Vente partielle', sector: 'Logistique', location: 'Bouaké', revenue: '65 000 000 F CFA', price: '40 000 000 F CFA' },
    { title: 'Ouverture de capital d’une fintech', type: 'Acquisition', sector: 'Finance', location: 'Abidjan - Plateau', revenue: '220 000 000 F CFA', price: '80 000 000 F CFA' },
    { title: 'Cession de parts dans une startup agro', type: 'Cession', sector: 'Agroalimentaire', location: 'Yamoussoukro', revenue: '90 000 000 F CFA', price: '60 000 000 F CFA' }
  ];

  const [typeFilter, setTypeFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showModal, setShowModal] = useState(false);

  const handleChoice = (choice: string) => {
    setShowModal(false);
    if (choice === 'Cession de fonds de commerce') router.push('/deals-m-a/fonds-commerce');
    else if (choice === 'Vente de part sociale') router.push('/deals-m-a/part-sociale');
    else if (choice === 'Vente d\'entreprise') router.push('/deals-m-a/vente-entreprise');
  };

  const filteredDeals = allDeals.filter(d =>
    (!typeFilter || d.type === typeFilter) &&
    (!sectorFilter || d.sector === sectorFilter) &&
    (!search || d.title.toLowerCase().includes(search.toLowerCase()))
  );

  const resetFilters = () => { setTypeFilter(''); setSectorFilter(''); setSearch(''); };

  const uniqueTypes = [...new Set(allDeals.map(d => d.type))];
  const uniqueSectors = [...new Set(allDeals.map(d => d.sector))];

  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuth') === 'true';
  const handleClick = () => isAuthenticated ? router.push('/deals-m-a/details') : router.push('/connexion?redirect=/deals-m-a/details');

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* AppBar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
          <span style={{ width: 20, height: 20, backgroundColor: '#ccc', borderRadius: '50%', display: 'inline-block' }} />
          Logo
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/hub">Accueil</Link><Link href="/annuaire">Annuaire</Link>
          <Link href="/deals-m-a">Deals M&A</Link><Link href="/crowdfunding">Crowdfunding</Link>
          <Link href="/connexion">Connexion /</Link>
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        {/* Titre + bouton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Deals M&A</h1>
          <button onClick={() => setShowModal(true)} style={{ background: '#003087', color: 'white', padding: '0.6rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>➕ Ajouter une offre</button>
        </div>

        <p style={{ marginBottom: '1.5rem', color: '#555' }}>Déposez votre entreprise à vendre, proposez des parts à céder ou explorez les opportunités de fusions et acquisitions.</p>

        {/* Filtres */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="">Type de deal</option>{uniqueTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="">Secteur</option>{uniqueSectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Rechercher un deal" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '5px', flex: 1, minWidth: 180 }} />
          <button onClick={resetFilters} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '5px', background: 'white' }}>Réinitialiser</button>
          <button onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '0.4rem 0.7rem', background: 'white', cursor: 'pointer' }}>{viewMode === 'list' ? '🔲' : '📃'}</button>
        </div>

        {/* Affichage */}
        {viewMode === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredDeals.map((d, i) => (
              <div key={i} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', background: '#f9f9f9', boxShadow: '0 0 4px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#003087' }}>{d.title}</h3>
                <p>📂 <strong>{d.type}</strong> · 🏭 <strong>{d.sector}</strong> · 📍 {d.location}</p>
                <p>💰 <strong>CA :</strong> {d.revenue} · 💵 <strong>Prix :</strong> {d.price}</p>
                <button onClick={handleClick} style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', background: '#003087', color: 'white', border: 'none', borderRadius: '5px' }}>Voir détails</button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
            {filteredDeals.map((d, i) => (
              <div key={i} style={{ background: '#f9f9f9', borderRadius: '10px', padding: '1rem', flex: '0 1 calc(25% - 1rem)', boxShadow: '0 0 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: '#003087', marginBottom: '0.5rem' }}>{d.title}</h3>
                <div style={{ width: '100%', height: 140, background: '#ccc', borderRadius: '6px', marginBottom: '1rem' }} />
                <p>📂 <strong>{d.type}</strong></p><p>🏭 <strong>{d.sector}</strong></p><p>📍 {d.location}</p>
                <p>💰 <strong>CA:</strong> {d.revenue}</p><p>💵 <strong>Prix:</strong> {d.price}</p>
                <button onClick={handleClick} style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', background: '#003087', color: 'white', border: 'none', borderRadius: '5px' }}>Voir détails</button>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', maxWidth: 600, width: '90%', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
              <h2 style={{ marginBottom: '1rem' }}>Quel type d'offre voulez-vous déposer ?</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Vente d\'entreprise', 'Vente de part sociale', 'Cession de fonds de commerce'].map(c => (
                  <div key={c} onClick={() => handleChoice(c)} style={{ flex: 1, minWidth: 160, cursor: 'pointer', border: '1px solid #ccc', borderRadius: 8, padding: '1rem', textAlign: 'center', background: '#f5f5f5' }} onMouseEnter={e => (e.currentTarget.style.background = '#e6f0ff')} onMouseLeave={e => (e.currentTarget.style.background = '#f5f5f5')}>
                    <strong>{c}</strong>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowModal(false)} style={{ marginTop: '1.5rem', background: '#ccc', border: 'none', padding: '0.5rem 1rem', borderRadius: 5, cursor: 'pointer' }}>Annuler</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}