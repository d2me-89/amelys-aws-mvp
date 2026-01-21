/**
 * Données statiques pour le lycée
 * 
 * Ce fichier contient toutes les données de configuration :
 * - Liste des classes
 * - Matières par classe
 * - Épreuves du baccalauréat
 */

import { Classe, Matiere, Epreuve } from './types';

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
      seances: 12,
      path: "/app/lycee/seconde/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/lycee/seconde/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/seconde/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/seconde/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/seconde/matieres/emc"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/seconde/matieres/ses"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/seconde/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/seconde/matieres/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/seconde/matieres/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/seconde/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/seconde/matieres/espagnol"
    }
  ],

  premiere: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/premiere/matieres/mathematiques"
    },
    {
      id: "francais",
      nom: "Français",
      emoji: "📚",
      seances: 15,
      path: "/app/lycee/premiere/matieres/francais"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/premiere/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/premiere/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/premiere/matieres/emc"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/premiere/matieres/ses"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/premiere/matieres/enseignement-scientifique"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/premiere/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/premiere/matieres/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/premiere/matieres/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/premiere/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/premiere/matieres/espagnol"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌍",
      seances: 10,
      path: "/app/lycee/premiere/matieres/hggsp"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/premiere/matieres/hlp"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/premiere/matieres/llce-anglais"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/premiere/matieres/sciences-ingenieur"
    }
  ],

  terminale: [
    {
      id: "mathematiques",
      nom: "Mathématiques",
      emoji: "📐",
      seances: 12,
      path: "/app/lycee/terminale/matieres/mathematiques"
    },
    {
      id: "philosophie",
      nom: "Philosophie",
      emoji: "🤔",
      seances: 12,
      path: "/app/lycee/terminale/matieres/philosophie"
    },
    {
      id: "histoire",
      nom: "Histoire",
      emoji: "🏛️",
      seances: 11,
      path: "/app/lycee/terminale/matieres/histoire"
    },
    {
      id: "geographie",
      nom: "Géographie",
      emoji: "🌍",
      seances: 9,
      path: "/app/lycee/terminale/matieres/geographie"
    },
    {
      id: "emc",
      nom: "EMC",
      emoji: "⚖️",
      seances: 8,
      path: "/app/lycee/terminale/matieres/emc"
    },
    {
      id: "ses",
      nom: "SES",
      emoji: "💼",
      seances: 10,
      path: "/app/lycee/terminale/matieres/ses"
    },
    {
      id: "enseignement-scientifique",
      nom: "Enseignement scientifique",
      emoji: "🔬",
      seances: 10,
      path: "/app/lycee/terminale/matieres/enseignement-scientifique"
    },
    {
      id: "physique-chimie",
      nom: "Physique-Chimie",
      emoji: "⚛️",
      seances: 10,
      path: "/app/lycee/terminale/matieres/physique-chimie"
    },
    {
      id: "svt",
      nom: "SVT",
      emoji: "🧬",
      seances: 10,
      path: "/app/lycee/terminale/matieres/svt"
    },
    {
      id: "nsi",
      nom: "Numérique et sciences informatiques",
      emoji: "💻",
      seances: 10,
      path: "/app/lycee/terminale/matieres/nsi"
    },
    {
      id: "anglais",
      nom: "Anglais",
      emoji: "🇬🇧",
      seances: 10,
      path: "/app/lycee/terminale/matieres/anglais"
    },
    {
      id: "espagnol",
      nom: "Espagnol",
      emoji: "🇪🇸",
      seances: 10,
      path: "/app/lycee/terminale/matieres/espagnol"
    },
    {
      id: "hggsp",
      nom: "Histoire-géographie, géopolitique et sciences politiques",
      emoji: "🌍",
      seances: 10,
      path: "/app/lycee/terminale/matieres/hggsp"
    },
    {
      id: "hlp",
      nom: "Humanités, littérature et philosophie",
      emoji: "📖",
      seances: 10,
      path: "/app/lycee/terminale/matieres/hlp"
    },
    {
      id: "llce-anglais",
      nom: "LLCE Anglais",
      emoji: "🎭",
      seances: 10,
      path: "/app/lycee/terminale/matieres/llce-anglais"
    },
    {
      id: "sciences-ingenieur",
      nom: "Sciences de l'ingénieur",
      emoji: "⚙️",
      seances: 10,
      path: "/app/lycee/terminale/matieres/sciences-ingenieur"
    },
    {
      id: "maths-complementaires",
      nom: "Mathématiques complémentaires",
      emoji: "📊",
      seances: 10,
      path: "/app/lycee/terminale/matieres/maths-complementaires"
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
    path: "/app/lycee/baccalaureat/epreuves/francais"
  },
  {
    id: "philosophie",
    nom: "Philosophie",
    emoji: "🤔",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/philosophie"
  },
  {
    id: "ses",
    nom: "SES",
    emoji: "💼",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/ses"
  },
  {
    id: "enseignement-scientifique",
    nom: "Enseignement scientifique",
    emoji: "🔬",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/enseignement-scientifique"
  },
  {
    id: "mathematiques",
    nom: "Mathématiques",
    emoji: "📐",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/mathematiques"
  },
  {
    id: "physique-chimie",
    nom: "Physique-Chimie",
    emoji: "⚛️",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/physique-chimie"
  },
  {
    id: "svt",
    nom: "SVT",
    emoji: "🧬",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/svt"
  },
  {
    id: "nsi",
    nom: "Numérique et sciences informatiques",
    emoji: "💻",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/nsi"
  },
  {
    id: "anglais",
    nom: "Anglais",
    emoji: "🇬🇧",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/anglais"
  },
  {
    id: "espagnol",
    nom: "Espagnol",
    emoji: "🇪🇸",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/espagnol"
  },
  {
    id: "hggsp",
    nom: "Histoire-géographie, géopolitique et sciences politiques",
    emoji: "🌍",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/hggsp"
  },
  {
    id: "hlp",
    nom: "Humanités, littérature et philosophie",
    emoji: "📖",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/hlp"
  },
  {
    id: "llce-anglais",
    nom: "LLCE Anglais",
    emoji: "🎭",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/llce-anglais"
  },
  {
    id: "sciences-ingenieur",
    nom: "Sciences de l'ingénieur",
    emoji: "⚙️",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/sciences-ingenieur"
  },
  {
    id: "grand-oral",
    nom: "Grand oral",
    emoji: "📣",
    seances: 10,
    path: "/app/lycee/baccalaureat/epreuves/grand-oral"
  }
];