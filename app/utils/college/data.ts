/**
 * Données statiques pour le collège
 * 
 * Ce fichier contient toutes les données de configuration :
 * - Liste des classes
 * - Matières par classe
 * - Épreuves du brevet
 * 
 * Avantage : facilite la maintenance et l'ajout de nouvelles matières
 */

import { Classe, Matiere, Epreuve } from './types';

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
      nom: "Mathématiques 6ème",
      emoji: "📐",
      seances: 13,
      path: "/app/college/mathematiques-sixieme"
    },
    {
      id: "francais",
      nom: "Français 6ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/sixieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 6ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/sixieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 6ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/sixieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 6ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/sixieme/matieres/emc"
    },
    {
      id: "sciences",
      nom: "Sciences 6ème",
      emoji: "🔬",
      seances: 13,
      path: "/app/college/sixieme/matieres/sciences"
    },
    {
      id: "anglais",
      nom: "Anglais 6ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/sixieme/matieres/anglais"
    }
  ],
  
  cinquieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques 5ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/cinquieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 5ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/cinquieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 5ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/cinquieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 5ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/cinquieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 5ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/cinquieme/matieres/emc"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie 5ème",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/cinquieme/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT 5ème",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/cinquieme/matieres/svt"
    },
    {
      id: "technologie",
      nom: "Technologie 5ème",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/cinquieme/matieres/technologie"
    },
    {
      id: "anglais",
      nom: "Anglais 5ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/cinquieme/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol 5ème",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/cinquieme/matieres/espagnol"
    }
  ],

  quatrieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques 4ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/quatrieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 4ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/quatrieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 4ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/quatrieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 4ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/quatrieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 4ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/quatrieme/matieres/emc"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie 4ème",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/quatrieme/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT 4ème",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/quatrieme/matieres/svt"
    },
    {
      id: "technologie",
      nom: "Technologie 4ème",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/quatrieme/matieres/technologie"
    },
    {
      id: "anglais",
      nom: "Anglais 4ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/quatrieme/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol 4ème",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/quatrieme/matieres/espagnol"
    }
  ],

  troisieme: [
    {
      id: "mathematiques",
      nom: "Mathématiques 3ème",
      emoji: "📐",
      seances: 12,
      path: "/app/college/troisieme/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français 3ème",
      emoji: "📚",
      seances: 15,
      path: "/app/college/troisieme/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire 3ème",
      emoji: "🏛️",
      seances: 11,
      path: "/app/college/troisieme/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie 3ème",
      emoji: "🌍",
      seances: 9,
      path: "/app/college/troisieme/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC 3ème",
      emoji: "⚖️",
      seances: 8,
      path: "/app/college/troisieme/matieres/emc"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie 3ème",
      emoji: "⚛️",
      seances: 10,
      path: "/app/college/troisieme/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT 3ème",
      emoji: "🧬",
      seances: 10,
      path: "/app/college/troisieme/matieres/svt"
    },
    {
      id: "technologie",
      nom: "Technologie 3ème",
      emoji: "⚙️",
      seances: 10,
      path: "/app/college/troisieme/matieres/technologie"
    },
    {
      id: "anglais",
      nom: "Anglais 3ème",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/college/troisieme/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol 3ème",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/college/troisieme/matieres/espagnol"
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
    path: "/app/college/brevet/epreuves/francais"
  },
  {
    id: "mathematiques",
    nom: "Mathématiques",
    emoji: "📐",
    seances: 10,
    path: "/app/college/brevet/epreuves/mathematiques"
  },
  {
    id: "histoire-geo-emc",
    nom: "Histoire-Géographie + EMC",
    emoji: "🏛️",
    seances: 10,
    path: "/app/college/brevet/epreuves/histoire-geo-emc"
  },
  {
    id: "sciences",
    nom: "Sciences",
    emoji: "🔬",
    seances: 10,
    path: "/app/college/brevet/epreuves/sciences"
  },
  {
    id: "oral",
    nom: "Oral du brevet",
    emoji: "📣",
    seances: 10,
    path: "/app/college/brevet/epreuves/oral"
  }
];
