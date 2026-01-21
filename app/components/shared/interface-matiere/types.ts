/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/types.ts
 * ============================================
 * 
 * DESCRIPTION:
 * Types TypeScript GÉNÉRIQUES pour TOUTES les pages matière-classe.
 * Ces types définissent la structure des données utilisées par les composants
 * réutilisables (HeroSection, CTACard, ChapterItem, etc.)
 * 
 * UTILISATION:
 * - Importer ces types dans n'importe quelle page matière-classe
 * - S'applique à: Mathématiques 6ème, Physique 3ème, Français 2nde, etc.
 * 
 * EXEMPLE:
 * ```typescript
 * import type { Chapitre, FAQData } from '@/app/components/shared/subject-home/types';
 * ```
 */

/**
 * Représente une section individuelle dans une FAQ
 * Peut contenir du texte simple ou des listes
 */
export interface FAQSection {
  titre: string;                                    // Titre de la section FAQ
  contenu: string | string[];                       // Contenu: texte ou liste d'items
  type: "paragraphe" | "liste-ordonnee" | "liste-puces";  // Type d'affichage
}

/**
 * Structure complète d'une FAQ (ex: "Cours interactif", "Exercice en binôme")
 * Contient un titre principal et plusieurs sections
 */
export interface FAQData {
  titre: string;              // Titre principal de la FAQ
  sections: FAQSection[];     // Liste des sections de contenu
}

/**
 * Représente un chapitre de cours
 * Structure utilisée pour l'affichage des chapitres dans toutes les matières
 */
export interface Chapitre {
  id: string;                 // Identifiant unique (ex: "C1", "C2", etc.)
  theme: string;              // Thème du chapitre (ex: "Nombres et calculs")
  titre: string;              // Titre du chapitre (ex: "Les nombres décimaux")
  nombreExercices: number;    // Nombre d'exercices dans ce chapitre
}

/**
 * Structure d'un exercice de compétence
 * Format correspondant aux données JSON des chapitres
 */
export interface ChapterExercise {
  M: {
    titre: {
      S: string;              // Titre de l'exercice
    };
  };
}

/**
 * Statistiques globales d'une matière
 * Utilisé pour l'affichage dans la CTACard
 */
export interface SubjectStats {
  nombreSeances: number;              // Nombre total de chapitres/séances
  nombreContenusPedagogiques: number; // Nombre total de contenus (cours + exercices + contrôles, etc.)
}

/**
 * Type pour les différents types de contenu pédagogique
 * Utilisé pour générer les URLs de navigation
 */
export type ContentType = 
  | 'cours'           // Cours interactif
  | 'binome'          // Exercice en binôme
  | 'controle'        // Contrôle du chapitre
  | 'session-libre'   // Session libre
  | 'exercice';       // Exercice de compétence (suivi d'un numéro)
