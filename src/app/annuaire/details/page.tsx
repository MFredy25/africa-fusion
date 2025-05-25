// ✅ On change le nom de la constante pour éviter le conflit
export const dynamicParams = true;
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';

// ✅ On renomme `dynamic` en `dynamicImport` pour éviter le conflit de nom
const AnnuaireDetailsClient = dynamicImport(
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
