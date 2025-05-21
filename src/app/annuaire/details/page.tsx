'use client';

import { useSearchParams } from 'next/navigation';

const mockCompanies = [
  {
    id: '1',
    name: 'Mercury Global Tech',
    description: 'Spécialisée en IA et cybersécurité pour les entreprises d’Afrique de l’Ouest.',
    category: 'Technologie',
    revenue: '37 000 000 F CFA',
    location: 'Abidjan - Plateau',
    email: 'contact@mercurytech.ci'
  },
  {
    id: '2',
    name: 'Wealth Assets Inc',
    description: 'Cabinet de gestion de patrimoine pour les particuliers et entreprises.',
    category: 'Finance',
    revenue: '15 500 000 F CFA',
    location: 'Abidjan - Cocody',
    email: 'info@wealthassets.ci'
  },
  {
    id: '3',
    name: 'Maritim International',
    description: 'Solutions de transport interrégional et services d’import/export.',
    category: 'Logistique',
    revenue: '22 000 000 F CFA',
    location: 'Bouaké',
    email: 'contact@maritim-int.ci'
  },
  {
    id: '4',
    name: 'Ventur Kaptal',
    description: 'Fonds d’investissement dédié aux startups africaines.',
    category: 'Capital-risque',
    revenue: '8 000 000 F CFA',
    location: 'Abidjan - Koumassi',
    email: 'hello@venturkaptal.ci'
  }
];

export default function AnnuaireDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Entreprise introuvable</h1>
        <p>Aucune entreprise ne correspond à cet identifiant.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', color: '#003087' }}>{company.name}</h1>
      <p style={{ margin: '1rem 0', fontSize: '1rem', color: '#444' }}>{company.description}</p>

      <div style={{ background: '#f4f4f4', borderRadius: '8px', padding: '1rem', marginBottom: '2rem' }}>
        <p><strong>📂 Catégorie :</strong> {company.category}</p>
        <p><strong>💰 Chiffre d'affaires :</strong> {company.revenue}</p>
        <p><strong>📍 Localisation :</strong> {company.location}</p>
        <p><strong>📧 Email :</strong> <a href={`mailto:${company.email}`} style={{ color: '#003087' }}>{company.email}</a></p>
      </div>

      <button style={{ background: '#003087', color: 'white', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        📝 Commander une étude
      </button>
    </main>
  );
}