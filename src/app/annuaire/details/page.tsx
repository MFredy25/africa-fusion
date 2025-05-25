/* -------------------------------------------------------------------------- */
/*  app/annuaire/details/page.tsx                                             */
/*  ▸ Corrige l’erreur de build Next.js (useSearchParams + suspense).          */
/*  ▸ garde la Suspense côté page.                                            */
/*  ▸ utilise dynamic() avec ssr:false uniquement.                            */
/* -------------------------------------------------------------------------- */

export const dynamicParams = true;        // permet /annuaire/details?id=xxx
export const dynamic       = 'force-dynamic';

import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';

/* ⬇️  CSR uniquement – pas de rendu au build */
const AnnuaireDetailsClient = dynamicImport(
  () => import('./AnnuaireDetailsClient'),
  { ssr: false }                // (plus de 'suspense' ici)
);

export default function AnnuaireDetailsPage() {
  return (
    <Suspense
      fallback={
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          Chargement…
        </main>
      }
    >
      <AnnuaireDetailsClient />
    </Suspense>
  );
}
