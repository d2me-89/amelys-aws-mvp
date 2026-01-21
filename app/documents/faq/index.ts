/**
 * ============================================
 * FICHIER: app/documents/faq/index.ts
 * ============================================
 * 
 * Centralisation des imports FAQ
 * Permet d'importer toutes les FAQ depuis un seul endroit
 * 
 * UTILISATION:
 * ```typescript
 * import { 
 *   faqCoursInteractif, 
 *   faqExerciceBinome,
 *   faqCompetencesCles,
 *   faqControleEvalue,
 *   faqSessionLibre 
 * } from '@/app/documents/faq';
 * ```
 */

export { default as faqCoursInteractif } from './faq-cours-interactif.json';
export { default as faqExerciceBinome } from './faq-exercice-en-binome.json';
export { default as faqCompetencesCles } from './faq-competences-cles.json';
export { default as faqControleEvalue } from './faq-controle-evalue.json';
export { default as faqSessionLibre } from './faq-session-libre.json';
