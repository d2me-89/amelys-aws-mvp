/**
 * Données statiques pour le primaire
 * 
 * Ce fichier contient toutes les données de configuration :
 * - Liste des classes (CP à CM2)
 * - Matières par classe
 * 
 * Note : Le primaire n'a pas d'épreuves finales comme le brevet ou le bac.
 */

import { Classe, Matiere } from '../shared/types';

// Liste des classes disponibles
export const CLASSES: Classe[] = [
  { id: "cp", label: "CP" },
  { id: "ce1", label: "CE1" },
  { id: "ce2", label: "CE2" },
  { id: "cm1", label: "CM1" },
  { id: "cm2", label: "CM2" },
];

// Matières organisées par classe
export const MATIERES_PAR_CLASSE: Record<string, Matiere[]> = {
  cp: [
    {
      id: "francais",
      nom: "Français CP",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/cp/matieres/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques CP",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/cp/matieres/mathematiques"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie CP",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/cp/matieres/histoire-geographie"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique CP",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/cp/matieres/emc"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie CP",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/cp/matieres/sciences-technologie"
    },
    {
      id: "anglais",
      nom: "Anglais CP",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/cp/matieres/anglais"
    }
  ],

  ce1: [
    {
      id: "francais",
      nom: "Français CE1",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/ce1/matieres/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques CE1",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/ce1/matieres/mathematiques"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie CE1",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/ce1/matieres/histoire-geographie"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique CE1",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/ce1/matieres/emc"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie CE1",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/ce1/matieres/sciences-technologie"
    },
    {
      id: "anglais",
      nom: "Anglais CE1",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/ce1/matieres/anglais"
    }
  ],

  ce2: [
    {
      id: "francais",
      nom: "Français CE2",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/ce2/matieres/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques CE2",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/ce2/matieres/mathematiques"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie CE2",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/ce2/matieres/histoire-geographie"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique CE2",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/ce2/matieres/emc"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie CE2",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/ce2/matieres/sciences-technologie"
    },
    {
      id: "anglais",
      nom: "Anglais CE2",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/ce2/matieres/anglais"
    }
  ],

  cm1: [
    {
      id: "francais",
      nom: "Français CM1",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/cm1/matieres/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques CM1",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/cm1/matieres/mathematiques"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie CM1",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/cm1/matieres/histoire-geographie"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique CM1",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/cm1/matieres/emc"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie CM1",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/cm1/matieres/sciences-technologie"
    },
    {
      id: "anglais",
      nom: "Anglais CM1",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/cm1/matieres/anglais"
    }
  ],

  cm2: [
    {
      id: "francais",
      nom: "Français CM2",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/cm2/matieres/francais"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques CM2",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/cm2/matieres/mathematiques"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie CM2",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/cm2/matieres/histoire-geographie"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique CM2",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/cm2/matieres/emc"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie CM2",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/cm2/matieres/sciences-technologie"
    },
    {
      id: "anglais",
      nom: "Anglais CM2",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/cm2/matieres/anglais"
    }
  ],
};

// Le primaire n'a pas d'épreuves finales comme le brevet ou le baccalauréat
// Cette constante est vide mais existe pour la cohérence avec les autres cycles
export const EPREUVES_PRIMAIRE = [];
