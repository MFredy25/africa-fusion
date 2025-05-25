'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/company';

export default function AnnuaireDetails() {
  const searchParams = useSearchParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      const id = searchParams.get('id');
      if (!id) return;

      const docRef = doc(db, 'companies', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompany({
          id,
          name: data.name,
          rccm: data.rccm || '',
          description: data.description,
          category: data.category,
          revenue: data.revenue,
          location: data.location,
          email: data.email,
          createdAt: data.createdAt || null,
        });
      }
      setLoading(false);
    };

    fetchCompany();
  }, [searchParams]);

  if (loading) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <p>Chargement...</p>
      </main>
    );
  }

  if (!company) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Entreprise introuvable</h1>
        <p>Aucune entreprise ne correspond à cet identifiant.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      <h1 style={{ fontSize: '2rem', color: '#003087' }}>{company.name}</h1>
      <p style={{ margin: '1rem 0', fontSize: '1rem', color: '#444' }}>
        {company.description}
      </p>

      <div
        style={{
          background: '#f4f4f4',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem',
        }}
      >
        <p>
          <strong>📂 Catégorie :</strong> {company.category}
        </p>
        <p>
          <strong>💰 Chiffre d&apos;affaires :</strong> {company.revenue}
        </p>
        <p>
          <strong>📍 Localisation :</strong> {company.location}
        </p>
        <p>
          <strong>📧 Email :</strong>{' '}
          <a href={`mailto:${company.email}`} style={{ color: '#003087' }}>
            {company.email}
          </a>
        </p>
      </div>

      <button
        style={{
          background: '#003087',
          color: 'white',
          padding: '0.6rem 1.2rem',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        📝 Commander une étude
      </button>
    </main>
  );
}
