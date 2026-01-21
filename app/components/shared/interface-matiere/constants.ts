/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/constants.ts
 * ============================================
 * 
 * DESCRIPTION:
 * Constantes de style et configuration GÉNÉRIQUES pour TOUTES les pages matière-classe.
 * Centralise les couleurs, espacements et autres valeurs réutilisables.
 * 
 * AVANTAGES:
 * - Cohérence visuelle entre toutes les matières
 * - Maintenance facilitée (un seul endroit pour modifier les styles)
 * - Évite la répétition de code
 * 
 * UTILISATION:
 * ```typescript
 * import { COLORS, SPACING } from '@/app/components/shared/interface-matiere/constants';
 * 
 * <div style={{ background: COLORS.purple.gradient }}>
 * ```
 */

/**
 * Palette de couleurs utilisée dans toutes les pages matière-classe
 * Theme principal: violet/purple (peut être adapté si nécessaire)
 */
export const COLORS = {
  // Couleurs principales (thème violet)
  purple: {
    gradient: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%)",
    gradientHover: "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)",
    light: "#B794F6",                     // Texte accentué
    bg: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)", // Fond des badges
    primary: "#805AD5",                   // Couleur principale
  },
  
  // Couleurs blanches
  white: {
    full: "#fff",                         // Blanc pur
    text: "#2D3748",                      // Texte sombre sur fond blanc
  },
  
  // Overlays et transparences
  overlay: {
    light: "rgba(255,255,255,0.08)",      // Fond léger des cartes
    border: "rgba(255,255,255,0.2)",      // Bordures
    hover: "rgba(159, 122, 234, 0.15)",   // État hover
    dark: "rgba(0,0,0,0.2)",              // Fond sombre pour sous-sections
  },
} as const;

/**
 * Système d'espacement cohérent
 * Basé sur une échelle de 0.4rem (base)
 */
export const SPACING = {
  xs: "0.4rem",    // 6.4px - Très petit
  sm: "0.85rem",   // 13.6px - Petit
  md: "1.5rem",    // 24px - Moyen
  lg: "2.5rem",    // 40px - Grand
  xl: "4rem",      // 64px - Très grand
} as const;

/**
 * Types de contenu pédagogique
 * Utilisés pour générer les URLs et les labels
 */
export const CONTENT_TYPES = {
  COURS: 'cours',
  BINOME: 'binome',
  CONTROLE: 'controle',
  SESSION_LIBRE: 'session-libre',
  EXERCICE: 'exercice',
} as const;

/**
 * Configuration responsive
 * Breakpoints pour les différentes tailles d'écran
 */
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
  ultrawide: '1536px',
} as const;

/**
 * Tailles maximales de conteneurs
 */
export const MAX_WIDTHS = {
  content: '1350px',      // Largeur max du contenu principal
  section: '780px',       // Largeur max des sections (FAQ, chapitres)
  ctaCard: '360px',       // Largeur de la carte CTA
} as const;

/**
 * Durées des animations
 */
export const TRANSITIONS = {
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
} as const;
