/**
 * Système de thèmes unifié pour collège et lycée
 * 
 * Au lieu d'avoir deux fichiers séparés, on a un seul système avec deux thèmes.
 * Avantage : plus facile à maintenir, on peut ajouter d'autres thèmes facilement.
 */

import { CSSProperties } from 'react';
import { Cycle } from '../shared/types';

// ============================================
// Définition des thèmes
// ============================================

type ThemeColors = {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  lighter: string;
  lightest: string;
};

type Theme = {
  name: string;
  colors: {
    accent: ThemeColors;
    background: {
      card: string;
      cardHover: string;
      overlay: string;
    };
    border: {
      default: string;
      hover: string;
      accent: string;
      accentHover: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      badge: string;
    };
  };
  gradients: {
    button: string;
    cardHeader: string;
    badge: string;
    radialGlow: string;
  };
};

// Thème violet pour le collège
const collegeTheme: Theme = {
  name: 'college',
  colors: {
    accent: {
      primary: "#B794F6",
      secondary: "#9F7AEA",
      dark: "#805AD5",
      light: "#E8E0FF",
      lighter: "#D4C5FF",
      lightest: "#C4B5FE",
    },
    background: {
      card: "rgba(255,255,255,0.05)",
      cardHover: "rgba(255,255,255,0.1)",
      overlay: "rgba(255,255,255,0.03)",
    },
    border: {
      default: "rgba(255,255,255,0.1)",
      hover: "rgba(255,255,255,0.3)",
      accent: "rgba(183,148,246,0.3)",
      accentHover: "rgba(183,148,246,0.5)",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255,255,255,0.9)",
      muted: "rgba(255,255,255,0.5)",
      badge: "#B794F6",
    }
  },
  gradients: {
    button: "linear-gradient(135deg, #B794F6 0%, #9F7AEA 50%, #805AD5 100%)",
    cardHeader: "linear-gradient(135deg, #E8E0FF 0%, #D4C5FF 50%, #C4B5FE 100%)",
    badge: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
    radialGlow: "radial-gradient(circle, rgba(183,148,246,0.15) 0%, transparent 70%)",
  }
};

// Thème bleu pour le lycée
const lyceeTheme: Theme = {
  name: 'lycee',
  colors: {
    accent: {
      primary: "#38BDF8",
      secondary: "#0EA5E9",
      dark: "#0284C7",
      light: "#E0F2FE",
      lighter: "#BAE6FD",
      lightest: "#7DD3FC",
    },
    background: {
      card: "rgba(255,255,255,0.05)",
      cardHover: "rgba(255,255,255,0.1)",
      overlay: "rgba(255,255,255,0.03)",
    },
    border: {
      default: "rgba(255,255,255,0.1)",
      hover: "rgba(255,255,255,0.3)",
      accent: "rgba(56,189,248,0.4)",
      accentHover: "rgba(56,189,248,0.5)",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255,255,255,0.9)",
      muted: "rgba(255,255,255,0.5)",
      badge: "#7DD3FC",
    }
  },
  gradients: {
    button: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",
    cardHeader: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)",
    badge: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
    radialGlow: "radial-gradient(circle, rgba(125,211,252,0.2) 0%, transparent 70%)",
  }
};

// ============================================
// Fonction pour obtenir le thème selon le cycle
// ============================================

export function getTheme(cycle: Cycle): Theme {
  return cycle === 'college' ? collegeTheme : lyceeTheme;
}

// ============================================
// Fonctions de style unifiées
// ============================================

/**
 * Génère le style pour un bouton de classe
 */
export function getButtonStyle(isSelected: boolean, cycle: Cycle): CSSProperties {
  const theme = getTheme(cycle);
  
  return {
    padding: "1rem 2.5rem",
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: "50px",
    color: isSelected ? theme.colors.text.primary : theme.colors.text.secondary,
    background: isSelected ? theme.gradients.button : theme.colors.background.cardHover,
    border: isSelected 
      ? `2px solid ${theme.colors.border.accentHover}`
      : `2px solid ${theme.colors.border.default}`,
    transition: "all 0.3s ease",
    cursor: "pointer",
  };
}

/**
 * Génère le style hover pour un bouton non sélectionné
 */
export function getButtonHoverStyle(): Partial<CSSProperties> {
  return {
    background: "rgba(255,255,255,0.15)",
  };
}

/**
 * Génère le style pour une carte de matière
 */
export function getCardStyle(isHovered: boolean): CSSProperties {
  return {
    borderRadius: "16px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.05)",
    border: isHovered 
      ? "1px solid rgba(255,255,255,0.3)"
      : "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0 12px 24px rgba(0,0,0,0.3)"
      : "0 4px 8px rgba(0,0,0,0.2)",
  };
}

/**
 * Génère le style pour l'en-tête d'une carte
 */
export function getCardHeaderStyle(cycle: Cycle): CSSProperties {
  const theme = getTheme(cycle);
  
  return {
    background: theme.gradients.cardHeader,
    padding: "1.7rem 1.3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };
}

/**
 * Génère le style pour le conteneur d'icône
 */
export function getIconContainerStyle(isHovered: boolean, cycle: Cycle): CSSProperties {
  const theme = getTheme(cycle);
  
  return {
    width: "60px",
    height: "60px",
    borderRadius: "15px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    boxShadow: isHovered
      ? `0 0 0 4px ${theme.colors.border.accentHover}, 0 0 30px ${theme.colors.border.accentHover}, 0 0 50px ${theme.colors.border.accent}`
      : "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  };
}

/**
 * Génère le style pour l'effet de brillance
 */
export function getGlowEffectStyle(cycle: Cycle): CSSProperties {
  const theme = getTheme(cycle);
  
  return {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: theme.gradients.radialGlow,
    pointerEvents: "none",
  };
}

/**
 * Génère le style pour le badge de séances
 */
export function getBadgeStyle(cycle: Cycle): CSSProperties {
  const theme = getTheme(cycle);
  
  return {
    display: "inline-block",
    padding: "0.31rem 0.82rem",
    borderRadius: "17px",
    background: theme.gradients.badge,
    border: `1px solid ${theme.colors.border.accent}`,
    fontSize: "0.77rem",
    fontWeight: 600,
    color: theme.colors.text.badge,
    marginBottom: "0.85rem",
  };
}

/**
 * Génère le style pour le titre d'une carte
 */
export function getCardTitleStyle(): CSSProperties {
  return {
    fontSize: "1.2rem",
    fontWeight: 700,
    margin: "0 0 0.85rem 0",
    color: "#fff",
    lineHeight: "1.3",
    minHeight: "3.1rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
}

/**
 * Génère le style pour le corps d'une carte
 */
export function getCardBodyStyle(): CSSProperties {
  return {
    padding: "1.28rem",
    background: "rgba(255,255,255,0.03)",
    minHeight: "102px",
  };
}

/**
 * Génère le style pour l'espace de progression
 */
export function getProgressPlaceholderStyle(): CSSProperties {
  return {
    minHeight: "34px",
    opacity: 0.3,
    borderTop: "1px dashed rgba(255,255,255,0.1)",
    paddingTop: "0.64rem",
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.5)",
  };
}
