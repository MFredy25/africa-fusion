import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// ✅ Chargement du composant client désactivant le SSR
const AnnuaireDetailsClient = dynamic(
  () => import('./AnnuaireDetailsClient'),
  { ssr: false }
);

export default function AnnuaireDetailsPage() {
  return (
    <Suspense fallback={<main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Chargement…</main>}>
      <AnnuaireDetailsClient />
    </Suspense>
  );
}
