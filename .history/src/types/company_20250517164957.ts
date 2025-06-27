/** Modèle commun d’entreprise utilisé par l’annuaire */
export interface Company {
    id?: string;                // id Firestore
    name: string;               // Nom de l’entreprise
    rccm: string;               // Numéro / RCCM
    description: string;        // Brève description
    category: string;           // Secteur / Catégorie
    revenue: string;            // Chiffre d’affaires (ex : "37 000 000 F CFA")
    location: string;           // Localisation (ex : "Abidjan - Plateau")
    email: string;              // Contact e-mail
    createdAt?: Date | null;    // Date d’enregistrement
  }
  