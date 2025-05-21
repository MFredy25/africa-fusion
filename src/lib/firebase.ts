// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBtIFVLa-MUBFP_KRh8dC3kMeHjRumkGtk',
  authDomain: 'fusac-africa.firebaseapp.com',
  projectId: 'fusac-africa',
  storageBucket: 'fusac-africa.appspot.com', // ❗️corrigé ici (".app" → ".com")
  messagingSenderId: '607470663470',
  appId: '1:607470663470:web:12916cc75ea34573a3acbf',
  measurementId: 'G-M7GWTQNYBY',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Analytics (uniquement si navigateur supporte)
let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

export { db, auth, analytics };
