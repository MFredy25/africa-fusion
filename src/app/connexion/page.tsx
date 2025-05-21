'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ConnexionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/hub';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem('isAuth', 'true');
      router.push(redirectTo);
    } else {
      alert('Veuillez entrer un email et un mot de passe');
    }
  };

  const handleGoogleLogin = () => {
    // Simulation Google login
    alert('Connexion via Google (simulation)');
    localStorage.setItem('isAuth', 'true');
    router.push(redirectTo);
  };

  return (
    <main
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Partie gauche */}
      <section
        style={{
          flex: 1,
          backgroundColor: '#f3f8ff',
          padding: '4rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRight: '2px solid #cce0f7'
        }}
      >
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e3a8a' }}>
            Bienvenue sur Africa Fusion
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#334155' }}>
            Connectez-vous pour accéder aux opportunités de business,
            aux opérations M&A confidentielles et aux projets d’investissement à impact.
          </p>
        </div>
      </section>

      {/* Partie droite */}
      <section
        style={{
          flex: 1,
          padding: '4rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Connexion</h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1e3a8a',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Se connecter
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem' }}>Ou</p>
            <button
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#db4437',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Se connecter avec Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
