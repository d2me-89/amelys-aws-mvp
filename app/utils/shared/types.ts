/**
 * Types TypeScript partagés entre collège et lycée
 * 
 * Ces types sont identiques pour les deux cycles, donc on les centralise ici.
 */

export type Matiere = {
  id: string;        // Identifiant unique (ex: "mathematiques")
  nom: string;       // Nom affiché (ex: "Mathématiques")
  emoji: string;     // Emoji représentatif (ex: "📐")
  seances: number;   // Nombre de séances disponibles
  path: string;      // Chemin de navigation Next.js
};

export type Epreuve = {
  id: string;        // Identifiant unique (ex: "grand-oral")
  nom: string;       // Nom de l'épreuve (ex: "Grand oral")
  emoji: string;     // Emoji représentatif (ex: "📣")
  seances: number;   // Nombre de séances de préparation
  path: string;      // Chemin de navigation Next.js
};

export type Classe = {
  id: string;        // Identifiant (ex: "sixieme" ou "seconde")
  label: string;     // Label affiché (ex: "Sixième" ou "Seconde")
};

/**
 * Type pour identifier le cycle scolaire
 * Permet de différencier collège et lycée dans le code partagé
 */
export type Cycle = 'college' | 'lycee';
