/* -------------------------------------------------------------------------- */
/*  app/annuaire/details/page.tsx                                             */
/*  ▸ Résout l’erreur `useSearchParams()` en supprimant la tentative          */
/*    de pré-rendu avec Suspense.                                             */
/*  ▸ Rendu exclusivement côté client via `dynamic()` + `ssr: false`.         */
/* -------------------------------------------------------------------------- */

'use client';

import dynamic from 'next/dynamic';

/* ⛔ Pas de Suspense ni SSR – chargement pur client */
const AnnuaireDetailsClient = dynamic(() => import('./AnnuaireDetailsClient'), {
  ssr: false,
});

export default AnnuaireDetailsClient;
