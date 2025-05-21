'use client';

import { useRouter } from 'next/navigation';

export default function FormFondsCommerce() {
  const router = useRouter();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Formulaire – Cession de Fonds de Commerce</h1>

      {/* Réception et Analyse Préliminaire */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Réception et Analyse Préliminaire du Dossier</h2>
        <label><input type="checkbox" /> Bail commercial fourni</label><br />
        <label><input type="checkbox" /> Inventaire détaillé fourni</label><br />
        <label><input type="checkbox" /> Chiffres d'affaires certifiés fournis</label><br />
        <label><input type="checkbox" /> Contrôle conformité juridique effectué</label>
      </section>

      {/* Validation Juridique et Financière */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Validation Juridique et Financière</h2>
        <textarea placeholder="Observations juridiques et financières..." style={{ width: '100%', height: '80px' }} />
      </section>

      {/* Estimation et Valorisation */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Estimation et Valorisation</h2>
        <textarea placeholder="Résumé du rapport de valorisation..." style={{ width: '100%', height: '80px' }} />
      </section>

      {/* Mise en ligne */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Mise en Ligne de l’Annonce</h2>
        <label><input type="checkbox" /> Annonce rédigée et validée</label>
      </section>

      {/* Gestion des Acheteurs */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Gestion des Contacts Acheteurs & Confidentialité</h2>
        <label><input type="checkbox" /> Accord de confidentialité signé</label><br />
        <label><input type="checkbox" /> Messagerie sécurisée activée</label>
      </section>

      {/* Négociation */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Négociation et Accord Préliminaire</h2>
        <textarea placeholder="Détails du protocole d'accord..." style={{ width: '100%', height: '80px' }} />
      </section>

      {/* Signature */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Signature de l’Acte de Vente</h2>
        <label>Date prévue : <input type="date" /></label>
      </section>

      {/* Post‑Vente */}
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Post‑Vente et Archivage</h2>
        <textarea placeholder="Notes post‑vente..." style={{ width: '100%', height: '80px' }} />
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
