'use client';

import { useRouter } from 'next/navigation';

export default function FormPartSociale() {
  const router = useRouter();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Formulaire – Cession de Part Sociale</h1>

      {/* Identification du cédant */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Identification du cédant (KYC)</h2>
        <input placeholder="Nom complet" style={{ width: '100%', marginBottom: '0.5rem' }} /><br />
        <input placeholder="Fonction" style={{ width: '100%', marginBottom: '0.5rem' }} /><br />
        <input placeholder="Type d’identification" style={{ width: '100%', marginBottom: '0.5rem' }} /><br />
        <input placeholder="Numéro d'identification" style={{ width: '100%', marginBottom: '0.5rem' }} /><br />
        <input placeholder="Justificatif de domicile" style={{ width: '100%', marginBottom: '0.5rem' }} />
      </section>

      {/* Informations entreprise */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Informations générales sur l’entreprise</h2>
        <textarea placeholder="Nom, secteur, description, localisation..." style={{ width: '100%', height: '80px' }} />
      </section>

      {/* Parts à céder */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Détails sur les parts sociales à céder</h2>
        <input placeholder="% du capital à céder" style={{ width: '100%', marginBottom: '0.5rem' }} /><br />
        <input placeholder="Nombre de parts" style={{ width: '100%', marginBottom: '0.5rem' }} /><br />
        <input placeholder="Prix total souhaité (FCFA)" style={{ width: '100%', marginBottom: '0.5rem' }} />
      </section>

      {/* Situation financière */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Situation financière</h2>
        <textarea placeholder="Chiffre d'affaires, bénéfices, dettes..." style={{ width: '100%', height: '80px' }} />
      </section>

      <button style={{
        background: '#003087',
        color: 'white',
        padding: '0.6rem 1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginRight: '1rem'
      }}>
        Enregistrer l’offre
      </button>

      <button onClick={() => router.back()} style={{
        padding: '0.6rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '6px',
        background: 'white',
        cursor: 'pointer'
      }}>
        Annuler
      </button>
    </main>
  );
}
