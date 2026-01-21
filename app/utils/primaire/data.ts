/**
 * Données statiques pour le primaire
 * 
 * CONVENTION DE NOMMAGE DES PATHS :
 * - Format : /app/primaire/[matiere]-[classe]
 * - Exemples : 
 *   - /app/primaire/francais-cp
 *   - /app/primaire/mathematiques-ce1
 *   - /app/primaire/sciences-technologie-cm2
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
      nom: "Français",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/francais-cp"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/mathematiques-cp"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/histoire-geographie-cp"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/emc-cp"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/sciences-technologie-cp"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/anglais-cp"
    }
  ],

  ce1: [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/francais-ce1"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/mathematiques-ce1"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/histoire-geographie-ce1"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/emc-ce1"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/sciences-technologie-ce1"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/anglais-ce1"
    }
  ],

  ce2: [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/francais-ce2"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/mathematiques-ce2"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/histoire-geographie-ce2"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/emc-ce2"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/sciences-technologie-ce2"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/anglais-ce2"
    }
  ],

  cm1: [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/francais-cm1"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/mathematiques-cm1"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/histoire-geographie-cm1"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/emc-cm1"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/sciences-technologie-cm1"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/anglais-cm1"
    }
  ],

  cm2: [
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 12,
      path: "/app/primaire/francais-cm2"
    },
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "🔢",
      seances: 12,
      path: "/app/primaire/mathematiques-cm2"
    },
    {
      id: "histoire-geographie",
      nom: "Histoire et géographie",
      emoji: "🌍",
      seances: 8,
      path: "/app/primaire/histoire-geographie-cm2"
    },
    {
      id: "emc",
      nom: "Enseignement moral et civique",
      emoji: "⚖️",
      seances: 6,
      path: "/app/primaire/emc-cm2"
    },
    {
      id: "sciences-technologie",
      nom: "Sciences et technologie",
      emoji: "🔬",
      seances: 8,
      path: "/app/primaire/sciences-technologie-cm2"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 8,
      path: "/app/primaire/anglais-cm2"
    }
  ],
};

// Le primaire n'a pas d'épreuves finales comme le brevet ou le baccalauréat
export const EPREUVES_PRIMAIRE = [];