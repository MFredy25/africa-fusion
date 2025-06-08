'use client';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function ConnexionContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      console.error("Erreur de connexion :", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
            Une erreur est survenue : {error}
          </div>
        )}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Se connecter
          </button>
        </form>
        <p className="text-sm mt-4">
          Vous n’avez pas de compte ?{" "}
          <Link href="/inscription" className="text-blue-600 hover:underline">
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
}
