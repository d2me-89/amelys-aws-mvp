/**
 * Animations CSS pour l'interface de conversation
 * 
 * Ces animations sont injectées via styled-jsx global.
 */

/**
 * Styles d'animation globaux à injecter dans le composant principal
 */
export const conversationAnimations = `
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

/**
 * Constantes de style pour la cohérence visuelle
 */
export const COLORS = {
  primary: '#9F7AEA',
  primaryDark: '#805AD5',
  primaryLight: 'rgba(159, 122, 234, 0.15)',
  primaryGlow: 'rgba(159, 122, 234, 0.3)',
  
  background: 'var(--background)',
  surface: 'rgba(255,255,255,0.05)',
  surfaceHover: 'rgba(255,255,255,0.08)',
  
  text: '#fff',
  textMuted: 'rgba(255,255,255,0.6)',
  textSubtle: 'rgba(255,255,255,0.4)',
  
  border: 'rgba(255,255,255,0.15)',
  borderFocus: '#9F7AEA',
  
  error: '#EF4444',
  errorBg: 'rgba(239, 68, 68, 0.1)',
  errorBorder: 'rgba(239, 68, 68, 0.3)',
  errorText: '#FCA5A5',
  
  userBubble: '#2f2f2f',
  assistantBubble: 'rgba(255,255,255,0.05)',
} as const;

/**
 * Valeurs de bordure et rayon
 */
export const BORDERS = {
  radiusSm: '6px',
  radiusMd: '8px',
  radiusLg: '12px',
  radiusXl: '16px',
  radiusFull: '9999px',
} as const;

/**
 * Valeurs d'espacement
 */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem',
} as const;

/**
 * Tailles de police
 */
export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xxl: '1.5rem',
} as const;

/**
 * Ombres
 */
export const SHADOWS = {
  sm: '0 2px 4px rgba(0,0,0,0.1)',
  md: '0 4px 12px rgba(0,0,0,0.2)',
  lg: '0 8px 24px rgba(0,0,0,0.3)',
  glow: `0 4px 12px ${COLORS.primaryGlow}`,
  glowHover: `0 6px 16px rgba(159, 122, 234, 0.4)`,
} as const;

/**
 * Transitions
 */
export const TRANSITIONS = {
  fast: '0.15s ease',
  default: '0.2s ease',
  slow: '0.3s ease',
} as const;
