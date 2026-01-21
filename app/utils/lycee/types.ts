/**
 * Types TypeScript pour les entités du lycée
 * 
 * Ce fichier centralise tous les types utilisés dans l'application lycée.
 * Identiques aux types du collège pour garantir la cohérence.
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
  id: string;        // Identifiant (ex: "seconde")
  label: string;     // Label affiché (ex: "Seconde")
};

