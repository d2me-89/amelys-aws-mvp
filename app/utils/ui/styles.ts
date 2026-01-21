/**
 * Styles et thème réutilisables
 * 
 * Ce fichier centralise toutes les constantes de style et les fonctions
 * qui génèrent des objets de style dynamiques.
 * 
 * Avantage : cohérence visuelle, maintenance simplifiée, réutilisabilité
 */

import { CSSProperties } from 'react';

// ============================================
// Palette de couleurs
// ============================================

export const THEME_COLORS = {
  purple: {
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
  }
};

// ============================================
// Gradients
// ============================================

export const GRADIENTS = {
  purpleButton: "linear-gradient(135deg, #B794F6 0%, #9F7AEA 50%, #805AD5 100%)",
  cardHeader: "linear-gradient(135deg, #E8E0FF 0%, #D4C5FF 50%, #C4B5FE 100%)",
  badge: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(40,40,40,0.6) 100%)",
  radialGlow: "radial-gradient(circle, rgba(183,148,246,0.15) 0%, transparent 70%)",
};

// ============================================
// Fonctions de style pour les boutons
// ============================================

/**
 * Génère le style pour un bouton de classe
 * @param isSelected - Si le bouton est sélectionné
 * @returns Objet de style CSS
 */
export const getButtonStyle = (isSelected: boolean): CSSProperties => ({
  padding: "1rem 2.5rem",
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: "50px",
  color: isSelected ? THEME_COLORS.text.primary : THEME_COLORS.text.secondary,
  background: isSelected ? GRADIENTS.purpleButton : THEME_COLORS.background.cardHover,
  border: isSelected 
    ? `2px solid ${THEME_COLORS.border.accentHover}`
    : `2px solid ${THEME_COLORS.border.default}`,
  transition: "all 0.3s ease",
  cursor: "pointer",
});

/**
 * Génère le style hover pour un bouton non sélectionné
 * @returns Objet de style CSS partiel
 */
export const getButtonHoverStyle = (): Partial<CSSProperties> => ({
  background: "rgba(255,255,255,0.15)",
  borderColor: "rgba(183,148,246,0.4)",
});

// ============================================
// Fonctions de style pour les cartes
// ============================================

/**
 * Génère le style pour une carte de matière
 * @param isHovered - Si la carte est survolée
 * @returns Objet de style CSS
 */
export const getCardStyle = (isHovered: boolean): CSSProperties => ({
  borderRadius: "16px",
  overflow: "hidden",
  background: THEME_COLORS.background.card,
  border: isHovered 
    ? `1px solid ${THEME_COLORS.border.hover}`
    : `1px solid ${THEME_COLORS.border.default}`,
  transition: "all 0.3s ease",
  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
  boxShadow: isHovered
    ? "0 12px 24px rgba(0,0,0,0.3)"
    : "0 4px 8px rgba(0,0,0,0.2)",
});

/**
 * Génère le style pour l'en-tête d'une carte
 * @returns Objet de style CSS
 */
export const getCardHeaderStyle = (): CSSProperties => ({
  background: GRADIENTS.cardHeader,
  padding: "1.7rem 1.3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
});

/**
 * Génère le style pour le conteneur d'icône
 * @param isHovered - Si la carte est survolée
 * @returns Objet de style CSS
 */
export const getIconContainerStyle = (isHovered: boolean): CSSProperties => ({
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
    ? "0 0 0 4px rgba(183,148,246,0.5), 0 0 30px rgba(183,148,246,0.5), 0 0 50px rgba(183,148,246,0.3)"
    : "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
});

/**
 * Génère le style pour l'effet de brillance
 * @returns Objet de style CSS
 */
export const getGlowEffectStyle = (): CSSProperties => ({
  position: "absolute",
  top: "-50%",
  left: "-50%",
  width: "200%",
  height: "200%",
  background: GRADIENTS.radialGlow,
  pointerEvents: "none",
});

/**
 * Génère le style pour le badge de séances
 * @returns Objet de style CSS
 */
export const getBadgeStyle = (): CSSProperties => ({
  display: "inline-block",
  padding: "0.31rem 0.82rem",
  borderRadius: "17px",
  background: GRADIENTS.badge,
  border: `1px solid ${THEME_COLORS.border.accent}`,
  fontSize: "0.77rem",
  fontWeight: 600,
  color: THEME_COLORS.purple.primary,
  marginBottom: "0.85rem",
});

/**
 * Génère le style pour le titre d'une carte
 * @returns Objet de style CSS
 */
export const getCardTitleStyle = (): CSSProperties => ({
  fontSize: "1.2rem",
  fontWeight: 700,
  margin: "0 0 0.85rem 0",
  color: THEME_COLORS.text.primary,
  lineHeight: "1.3",
  minHeight: "3.1rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

/**
 * Génère le style pour le corps d'une carte
 * @returns Objet de style CSS
 */
export const getCardBodyStyle = (): CSSProperties => ({
  padding: "1.28rem",
  background: THEME_COLORS.background.overlay,
  minHeight: "102px",
});

/**
 * Génère le style pour l'espace de progression (réservé pour futures fonctionnalités)
 * @returns Objet de style CSS
 */
export const getProgressPlaceholderStyle = (): CSSProperties => ({
  minHeight: "34px",
  opacity: 0.3,
  borderTop: "1px dashed rgba(255,255,255,0.1)",
  paddingTop: "0.64rem",
  fontSize: "0.6rem",
  color: THEME_COLORS.text.muted,
});
