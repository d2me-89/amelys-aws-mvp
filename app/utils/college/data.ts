/**
 * Données statiques pour le collège
 * 
 * CONVENTION DE NOMMAGE DES PATHS :
 * - Format : /app/college/[matiere]-[classe]
 * - Exemples : 
 *   - /app/college/mathematiques-sixieme
 *   - /app/college/francais-cinquieme
 *   - /app/college/physique-chimie-quatrieme
 * 
 * Ce fichier contient toutes les données de configuration :
 * - Liste des classes
 * - Matières par classe
 * - Épreuves du brevet
 */

import { Classe, Matiere, Epreuve } from '../shared/types';

// Liste des classes disponibles
export const CLASSES: Classe[] = [
  { id: "sixieme", label: "Sixième" },
  { id: "cinquieme", label: "Cinquième" },
  { id: "quatrieme", label: "Quatrième" },
  { id: "troisieme", label: "Troisième" },
  { id: "brevet", label: "Brevet" },
];

// Matières organisées par classe
export const MATIERES_PAR_CLASSE: Record<string, Matiere[]> = {
  sixieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 13,
      path: "/app/college/mathematiques-sixieme"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/college/francais-sixieme"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/histoire-sixieme"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/geographie-sixieme"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/emc-sixieme"
    },
    {
      id: "sciences",
      nom: "Sciences",
      emoji: "🔬",
      seances: 13,
      path: "/app/college/sciences-sixieme"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/anglais-sixieme"
    }
  ],
  
  cinquieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/college/mathematiques-cinquieme"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/college/francais-cinquieme"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/histoire-cinquieme"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/geographie-cinquieme"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/emc-cinquieme"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/physique-chimie-cinquieme"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/svt-cinquieme"
    },
    {
      id: "technologie",
      nom: "Technologie",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/technologie-cinquieme"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/anglais-cinquieme"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/espagnol-cinquieme"
    }
  ],

  quatrieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/college/mathematiques-quatrieme"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/college/francais-quatrieme"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/histoire-quatrieme"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/geographie-quatrieme"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/emc-quatrieme"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/physique-chimie-quatrieme"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/svt-quatrieme"
    },
    {
      id: "technologie",
      nom: "Technologie",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/technologie-quatrieme"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/anglais-quatrieme"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/espagnol-quatrieme"
    }
  ],

  troisieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/college/mathematiques-troisieme"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/college/francais-troisieme"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/histoire-troisieme"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/geographie-troisieme"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/emc-troisieme"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/physique-chimie-troisieme"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/svt-troisieme"
    },
    {
      id: "technologie",
      nom: "Technologie",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/technologie-troisieme"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/anglais-troisieme"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/espagnol-troisieme"
    }
  ],
};

// Épreuves du brevet
export const EPREUVES_BREVET: Epreuve[] = [
  {
    id: "francais",
    nom: "Français",
    emoji: "📚",
    seances: 10,
    path: "/app/college/brevet-francais"
  },
  {
    id: "mathematiques",
    nom: "Mathématiques",
    emoji: "📐",
    seances: 10,
    path: "/app/college/brevet-mathematiques"
  },
  {
    id: "histoire-geo-emc",
    nom: "Histoire-Géographie + EMC",
    emoji: "🏛️",
    seances: 10,
    path: "/app/college/brevet-histoire-geo-emc"
  },
  {
    id: "sciences",
    nom: "Sciences",
    emoji: "🔬",
    seances: 10,
    path: "/app/college/brevet-sciences"
  },
  {
    id: "oral",
    nom: "Oral du brevet",
    emoji: "🎤",
    seances: 10,
    path: "/app/college/brevet-oral"
  }
];