/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/index.ts
 * ============================================
 * 
 * DESCRIPTION:
 * Fichier d'exports centralisé pour tous les composants subject-home.
 * Permet des imports simplifiés et organisés.
 * 
 * AVANTAGES:
 * - Import groupé depuis un seul point d'entrée
 * - Code plus propre et lisible
 * - Facilite la maintenance
 * 
 * UTILISATION:
 * Au lieu de:
 * ```typescript
 * import { HeroSection } from '@/app/components/shared/interface-matiere/HeroSection';
 * import { CTACard } from '@/app/components/shared/interface-matiere/CTACard';
 * import { ChapterItem } from '@/app/components/shared/interface-matiere/ChapterItem';
 * ```
 * 
 * On peut faire:
 * ```typescript
 * import { 
 *   HeroSection, 
 *   CTACard, 
 *   ChapterItem 
 * } from '@/app/components/shared/interface-matiere';
 * ```
 */

// ============================================
// COMPOSANTS VISUELS
// ============================================

export { HeroSection } from './HeroSection';
export { CTACard } from './CTACard';
export { CollapsibleSection } from './CollapsibleSection';
export { FAQMenuItem } from './FAQMenuItem';
export { ChapterItem } from './ChapterItem';
export { ChapterLink } from './ChapterLink';
export { CompetencesMenu } from './CompetencesMenu';

// ============================================
// HOOKS PERSONNALISÉS
// ============================================

export { useChapterToggle } from './hooks/useChapterToggle';
export { useFAQToggle } from './hooks/useFAQToggle';
export { useClickOutside } from './hooks/useClickOutside';

// ============================================
// TYPES ET INTERFACES
// ============================================

export type {
  FAQSection,
  FAQData,
  Chapitre,
  ChapterExercise,
  SubjectStats,
  ContentType
} from './types';

// ============================================
// CONSTANTES
// ============================================

export {
  COLORS,
  SPACING,
  CONTENT_TYPES,
  BREAKPOINTS,
  MAX_WIDTHS,
  TRANSITIONS
} from './constants';
