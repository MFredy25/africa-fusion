'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Company } from '@/types/company';

export default function AnnuaireDetailsClient() {
  const searchParams = useSearchParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setIsDark(match.matches);
    apply();
    match.addEventListener('change', apply);
    return () => match.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    const fetchCompany = async () => {
      try {
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
      } catch (error) {
        console.error('Erreur lors de la récupération de l’entreprise :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [searchParams]);

  const colors = {
    bg: isDark ? '#1a1a1a' : '#ffffff',
    cardBg: isDark ? '#2a2a2a' : '#f4f4f4',
    text: isDark ? '#e0e0e0' : '#444444',
    border: isDark ? '#444' : '#ddd',
  };

  if (loading) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif', background: colors.bg, color: colors.text, minHeight: '100vh' }}>
        <p>Chargement...</p>
      </main>
    );
  }

  if (!company) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif', background: colors.bg, color: colors.text, minHeight: '100vh' }}>
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
        background: colors.bg,
        color: colors.text,
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '2rem', color: '#003087' }}>{company.name}</h1>
      <p style={{ margin: '1rem 0', fontSize: '1rem' }}>
        {company.description}
      </p>

      <div
        style={{
          background: colors.cardBg,
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem',
          border: `1px solid ${colors.border}`,
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