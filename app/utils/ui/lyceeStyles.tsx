/**
 * Styles spécifiques au lycée (thème bleu)
 * 
 * Ce fichier contient les variantes bleues des styles pour le lycée,
 * en complément des styles violet du collège.
 */

import { CSSProperties } from 'react';

// ============================================
// Palette de couleurs pour le lycée (bleu)
// ============================================

export const LYCEE_THEME_COLORS = {
  blue: {
    primary: "#38BDF8",      // sky-400
    secondary: "#0EA5E9",    // sky-500
    dark: "#0284C7",         // sky-600
    light: "#E0F2FE",        // sky-100
    lighter: "#BAE6FD",      // sky-200
    lightest: "#7DD3FC",     // sky-300
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
};

// ============================================
// Gradients spécifiques au lycée
// ============================================

export const LYCEE_GRADIENTS = {
  blueButton: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)",
  cardHeader: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)",
  badge: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
  radialGlow: "radial-gradient(circle, rgba(125,211,252,0.2) 0%, transparent 70%)",
};

// ============================================
// Fonctions de style pour les boutons (lycée)
// ============================================

/**
 * Génère le style pour un bouton de classe (thème bleu lycée)
 * @param isSelected - Si le bouton est sélectionné
 * @returns Objet de style CSS
 */
export const getLyceeButtonStyle = (isSelected: boolean): CSSProperties => ({
  padding: "1rem 2.5rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: "50px",
  color: isSelected ? LYCEE_THEME_COLORS.text.primary : LYCEE_THEME_COLORS.text.secondary,
  background: isSelected ? LYCEE_GRADIENTS.blueButton : LYCEE_THEME_COLORS.background.cardHover,
  border: isSelected 
    ? `2px solid ${LYCEE_THEME_COLORS.border.accentHover}`
    : `2px solid ${LYCEE_THEME_COLORS.border.default}`,
  transition: "all 0.3s ease",
  cursor: "pointer",
});

/**
 * Génère le style hover pour un bouton non sélectionné (lycée)
 * @returns Objet de style CSS partiel
 */
export const getLyceeButtonHoverStyle = (): Partial<CSSProperties> => ({
  background: "rgba(255,255,255,0.15)",
  borderColor: "rgba(56,189,248,0.4)",
});

// ============================================
// Fonctions de style pour les cartes (lycée)
// ============================================

/**
 * Génère le style pour l'en-tête d'une carte (thème bleu lycée)
 * @returns Objet de style CSS
 */
export const getLyceeCardHeaderStyle = (): CSSProperties => ({
  background: LYCEE_GRADIENTS.cardHeader,
  padding: "1.7rem 1.3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
});

/**
 * Génère le style pour le conteneur d'icône (thème bleu lycée)
 * @param isHovered - Si la carte est survolée
 * @returns Objet de style CSS
 */
export const getLyceeIconContainerStyle = (isHovered: boolean): CSSProperties => ({
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
    ? "0 0 0 4px rgba(56,189,248,0.5), 0 0 30px rgba(56,189,248,0.5), 0 0 50px rgba(56,189,248,0.3)"
    : "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
});

/**
 * Génère le style pour l'effet de brillance (thème bleu lycée)
 * @returns Objet de style CSS
 */
export const getLyceeGlowEffectStyle = (): CSSProperties => ({
  position: "absolute",
  top: "-50%",
  left: "-50%",
  width: "200%",
  height: "200%",
  background: LYCEE_GRADIENTS.radialGlow,
  pointerEvents: "none",
});

/**
 * Génère le style pour le badge de séances (thème bleu lycée)
 * @returns Objet de style CSS
 */
export const getLyceeBadgeStyle = (): CSSProperties => ({
  display: "inline-block",
  padding: "0.31rem 0.82rem",
  borderRadius: "17px",
  background: LYCEE_GRADIENTS.badge,
  border: `1px solid ${LYCEE_THEME_COLORS.border.accent}`,
  fontSize: "0.77rem",
  fontWeight: 600,
  color: LYCEE_THEME_COLORS.text.badge,
  marginBottom: "0.85rem",
});

// Note: Les styles de carte, titre et body sont identiques au collège
// et peuvent être importés depuis utils/ui/styles.ts