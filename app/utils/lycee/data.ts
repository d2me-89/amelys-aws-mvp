/**
 * Données statiques pour le lycée
 * 
 * CONVENTION DE NOMMAGE DES PATHS (cohérence avec le collège) :
 * - Format : /app/lycee/[matiere]-[classe]
 * - Exemples : 
 *   - /app/lycee/mathematiques-seconde
 *   - /app/lycee/francais-premiere
 *   - /app/lycee/philosophie-terminale
 * 
 * Ce fichier contient toutes les données de configuration :
 * - Liste des classes
 * - Matières par classe
 * - Épreuves du baccalauréat
 */

import { Classe, Matiere, Epreuve } from '../shared/types';

// Liste des classes disponibles
export const CLASSES: Classe[] = [
  { id: "seconde", label: "Seconde" },
  { id: "premiere", label: "Première" },
  { id: "terminale", label: "Terminale" },
  { id: "baccalaureat", label: "Baccalauréat" },
];

// Matières organisées par classe
export const MATIERES_PAR_CLASSE: Record<string, Matiere[]> = {
  seconde: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 14,
      path: "/app/lycee/mathematiques-seconde"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/lycee/francais-seconde"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/histoire-seconde"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/geographie-seconde"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/emc-seconde"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/ses-seconde"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/physique-chimie-seconde"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/svt-seconde"
    },
    {
      id: "snt",
      nom: "Sciences numériques et technologie",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/snt-seconde"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/anglais-seconde"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/espagnol-seconde"
    }
  ],

  premiere: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/mathematiques-premiere"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/lycee/francais-premiere"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/histoire-premiere"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/geographie-premiere"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/emc-premiere"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/ses-premiere"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/enseignement-scientifique-premiere"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/physique-chimie-premiere"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/svt-premiere"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/nsi-premiere"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/anglais-premiere"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/espagnol-premiere"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌍",
      seances: 10,
      path: "/app/lycee/hggsp-premiere"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/hlp-premiere"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/llce-anglais-premiere"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/sciences-ingenieur-premiere"
    }
  ],

  terminale: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/mathematiques-terminale"
    },
    {
      id: "philosophie",
      nom: "Philosophie",
      emoji: "🤔",
      seances: 12,
      path: "/app/lycee/philosophie-terminale"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/histoire-terminale"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/geographie-terminale"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/emc-terminale"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/ses-terminale"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/enseignement-scientifique-terminale"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/physique-chimie-terminale"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/svt-terminale"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/nsi-terminale"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/anglais-terminale"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/espagnol-terminale"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌍",
      seances: 10,
      path: "/app/lycee/hggsp-terminale"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/hlp-terminale"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/llce-anglais-terminale"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/sciences-ingenieur-terminale"
    },
    {
      id: "maths-complementaires",
      nom: "Mathématiques complémentaires",
      emoji: "📊",
      seances: 10,
      path: "/app/lycee/maths-complementaires-terminale"
    },
    {
      id: "maths-expertes",
      nom: "Mathématiques expertes",
      emoji: "📈",
      seances: 10,
      path: "/app/lycee/maths-expertes-terminale"
    }
  ],
};

// Épreuves du baccalauréat
export const EPREUVES_BACCALAUREAT: Epreuve[] = [
  {
    id: "francais",
    nom: "Français",
    emoji: "📚",
    seances: 10,
    path: "/app/lycee/bac-francais"
  },
  {
    id: "philosophie",
    nom: "Philosophie",
    emoji: "🤔",
    seances: 10,
    path: "/app/lycee/bac-philosophie"
  },
  {
    id: "grand-oral",
    nom: "Grand oral",
    emoji: "🎤",
    seances: 8,
    path: "/app/lycee/bac-grand-oral"
  },
  {
    id: "mathematiques",
    nom: "Mathématiques",
    emoji: "📐",
    seances: 10,
    path: "/app/lycee/bac-mathematiques"
  },
  {
    id: "physique-chimie",
    nom: "Physique-Chimie",
    emoji: "⚛️",
    seances: 10,
    path: "/app/lycee/bac-physique-chimie"
  },
  {
    id: "svt",
    nom: "SVT",
    emoji: "🧬",
    seances: 10,
    path: "/app/lycee/bac-svt"
  },
  {
    id: "ses",
    nom: "SES",
    emoji: "💼",
    seances: 10,
    path: "/app/lycee/bac-ses"
  },
  {
    id: "hggsp",
    nom: "HGGSP",
    emoji: "🌍",
    seances: 10,
    path: "/app/lycee/bac-hggsp"
  },
  {
    id: "hlp",
    nom: "HLP",
    emoji: "📖",
    seances: 10,
    path: "/app/lycee/bac-hlp"
  },
  {
    id: "llce-anglais",
    nom: "LLCE Anglais",
    emoji: "🎭",
    seances: 10,
    path: "/app/lycee/bac-llce-anglais"
  },
  {
    id: "nsi",
    nom: "NSI",
    emoji: "💻",
    seances: 10,
    path: "/app/lycee/bac-nsi"
  },
  {
    id: "sciences-ingenieur",
    nom: "Sciences de l'ingénieur",
    emoji: "⚙️",
    seances: 10,
    path: "/app/lycee/bac-sciences-ingenieur"
  }
];