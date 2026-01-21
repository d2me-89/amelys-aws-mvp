/**
 * Types TypeScript pour les entités du collège
 * 
 * Ce fichier centralise tous les types utilisés dans l'application collège.
 * Avantage : un seul endroit pour définir et modifier les structures de données.
 */

export type Matiere = {
  id: string;        // Identifiant unique (ex: "mathematiques")
  nom: string;       // Nom affiché (ex: "Mathématiques 6ème")
  emoji: string;     // Emoji représentatif (ex: "📐")
  seances: number;   // Nombre de séances disponibles
  path: string;      // Chemin de navigation Next.js
};

export type Epreuve = {
  id: string;        // Identifiant unique (ex: "francais")
  nom: string;       // Nom de l'épreuve (ex: "Français")
  emoji: string;     // Emoji représentatif (ex: "📚")
  seances: number;   // Nombre de séances de préparation
  path: string;      // Chemin de navigation Next.js
};

export type Classe = {
  id: string;        // Identifiant (ex: "sixieme")
  label: string;     // Label affiché (ex: "Sixième")
};
