'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  title: string;
  collected: number;
  target: number;
  contributors: number;
  daysLeft: number;
};

export default function CrowdfundingDetails() {
  const router = useRouter();
  const [proj, setProj] = useState<Project | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentProject');
      if (saved) setProj(JSON.parse(saved));
    }
  }, []);

  if (!proj) return <main style={{ padding: '2rem' }}>Chargement…</main>;

  const percent = Math.min(100, Math.round(proj.collected / proj.target * 100));

  /* images fictives */
  const imgs = Array.from({ length: 10 }, (_, i) =>
    `https://placehold.co/800x500?text=Image+${i + 1}`
  );

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <button onClick={() => router.back()} style={{ marginBottom: '1rem', background: 'white', border: '1px solid #ccc', borderRadius: 5, padding: '0.4rem 0.8rem', cursor: 'pointer' }}>← Retour</button>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* carrousel simple */}
        <div style={{ flex: '1 1 60%', minWidth: 300 }}>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', scrollSnapType: 'x mandatory' }}>
            {imgs.map(src => (
              <img key={src} src={src} alt="" style={{ width: '100%', maxWidth: 600, borderRadius: 6, scrollSnapAlign: 'start' }} />
            ))}
          </div>
        </div>

        <aside style={{
          flex: '0 0 260px',
          background: '#f9f9f9',
          borderRadius: 10,
          padding: '1.2rem',
          boxShadow: '0 0 8px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem'
        }}>
          <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: 0, textAlign: 'center' }}>{proj.title}</h2>

          <p style={{ fontWeight: 600, marginTop: 0, marginBottom: 0 }}>{proj.daysLeft} jours restants</p>
          <p style={{ marginTop: 0, marginBottom: 0 }}>{new Intl.NumberFormat('fr-FR').format(proj.target)} F CFA requis</p>
          <p style={{ marginTop: 0, marginBottom: 0 }}>{proj.contributors} contributeurs</p>

          <div>
            <p style={{ fontWeight: 600, fontSize: '1.2rem', marginTop: 0, marginBottom: '0.2rem' }}>
              {new Intl.NumberFormat('fr-FR').format(proj.collected)} F CFA
            </p>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: 0, marginBottom: 0 }}>déjà collectés</p>
          </div>

          <div>
            <div style={{ height: 8, background: '#ddd', borderRadius: 4, marginBottom: '0.4rem' }}>
              <div style={{
                width: `${percent}%`,
                height: '100%',
                background: '#003087',
                borderRadius: 4
              }} />
            </div>
            <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>{percent}% financé</p>
          </div>

          <button style={{
            width: '100%',
            marginTop: '0.4rem',
            padding: '0.6rem 0',
            background: '#1ba94c',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600
          }}>
            Contribuer
          </button>
        </aside>
      </div>
    </main>
  );
}