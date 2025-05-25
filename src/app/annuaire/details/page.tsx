/* ========================================================================= */
/*  app/annuaire/details/page.tsx                                            */
/*  ➤ Corrige la collision `dynamic` (fonction vs const)                    */
/*  ➤ Empêche le pré-rendering pour `useSearchParams()`                    */
/* ========================================================================= */

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import dynamicImport from 'next/dynamic'; // ✅ pas de collision de nom

// ⬇️ CSR uniquement
const AnnuaireDetailsClient = dynamicImport(() => import('./AnnuaireDetailsClient'), {
  ssr: false,
});

export default AnnuaireDetailsClient;
