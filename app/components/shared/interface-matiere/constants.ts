/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/constants.ts
 * ============================================
 * 
 * SYSTÈME MODULAIRE DE COULEURS
 * Supporte 3 cycles : primaire (orange), collège (violet), lycée (bleu)
 * 
 * UTILISATION:
 * ```typescript
 * import { getCOLORS } from './constants';
 * 
 * // Dans un composant
 * const COLORS = getCOLORS('lycee');  // Récupère le thème bleu
 * ```
 */

/**
 * Type pour identifier le cycle scolaire
 */
export type Cycle = 'primaire' | 'college' | 'lycee';

/**
 * Structure des couleurs pour un cycle
 */
export type ColorTheme = {
  gradient: string;
  gradientHover: string;
  light: string;
  bg: string;
  primary: string;
};

export type CycleColors = {
  primary: ColorTheme;
  white: {
    full: string;
    text: string;
  };
  overlay: {
    light: string;
    border: string;
    hover: string;
    dark: string;
  };
};

// ============================================
// THÈME VIOLET - COLLÈGE
// ============================================
const collegeTheme: CycleColors = {
  primary: {
    gradient: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%)",
    gradientHover: "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)",
    light: "#B794F6",
    bg: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
    primary: "#805AD5",
  },
  white: {
    full: "#fff",
    text: "#2D3748",
  },
  overlay: {
    light: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.2)",
    hover: "rgba(159, 122, 234, 0.15)", // 🔥 Violet
    dark: "rgba(0,0,0,0.2)",
  },
};

// ============================================
// THÈME BLEU - LYCÉE
// ============================================
const lyceeTheme: CycleColors = {
  primary: {
    gradient: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",
    gradientHover: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
    light: "#7DD3FC",
    bg: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
    primary: "#0EA5E9",
  },
  white: {
    full: "#fff",
    text: "#2D3748",
  },
  overlay: {
    light: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.2)",
    hover: "rgba(56, 189, 248, 0.15)", // 🔥 Bleu
    dark: "rgba(0,0,0,0.2)",
  },
};

// ============================================
// THÈME ORANGE - PRIMAIRE
// ============================================
const primaireTheme: CycleColors = {
  primary: {
    gradient: "linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)",
    gradientHover: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    light: "#FDBA74",
    bg: "linear-gradient(135deg, #FED7AA 0%, #FED7AA 100%)",
    primary: "#F97316",
  },
  white: {
    full: "#fff",
    text: "#2D3748",
  },
  overlay: {
    light: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.2)",
    hover: "rgba(251, 146, 60, 0.15)", // 🔥 Orange
    dark: "rgba(0,0,0,0.2)",
  },
};

/**
 * Fonction pour récupérer les couleurs selon le cycle
 * 
 * @param cycle - 'primaire' | 'college' | 'lycee'
 * @returns Les couleurs correspondantes au cycle
 */
export function getCOLORS(cycle: Cycle): CycleColors {
  switch(cycle) {
    case 'primaire':
      return primaireTheme;
    case 'college':
      return collegeTheme;
    case 'lycee':
      return lyceeTheme;
    default:
      return collegeTheme; // Fallback
  }
}

// ============================================
// EXPORT PAR DÉFAUT (COLLÈGE) pour compatibilité
// ============================================
// Pour les composants qui utilisent encore l'ancienne structure COLORS.purple
export const COLORS = {
  purple: collegeTheme.primary,
  white: collegeTheme.white,
  overlay: collegeTheme.overlay,
} as const;

// ============================================
// CONSTANTES COMMUNES (indépendantes du cycle)
// ============================================

export const SPACING = {
  xs: "0.4rem",
  sm: "0.85rem",
  md: "1.5rem",
  lg: "2.5rem",
  xl: "4rem",
} as const;

export const CONTENT_TYPES = {
  COURS: 'cours',
  BINOME: 'binome',
  CONTROLE: 'controle',
  SESSION_LIBRE: 'session-libre',
  EXERCICE: 'exercice',
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultrawide: '1536px',
} as const;

export const MAX_WIDTHS = {
  content: '1350px',
  section: '780px',
  ctaCard: '360px',
} as const;

export const TRANSITIONS = {
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
} as const;