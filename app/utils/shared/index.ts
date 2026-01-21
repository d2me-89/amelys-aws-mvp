/**
 * Export centralisé des utilitaires partagés
 * 
 * Permet d'importer facilement depuis un seul endroit :
 * import { Matiere, Classe, getMatieresParClasse } from '@/app/utils/shared';
 */

// Types
export type { Matiere, Epreuve, Classe, Cycle } from './types';

// Helpers
export type { CycleData } from './helpers';
export {
  getMatieresParClasse,
  getEpreuves,
  getTitreClasse,
  getNombreMatieresClasse,
  getDescriptionClasse,
  isExamenClasse,
  isRegularClasse,
  getLabelClasse,
  classeExists,
} from './helpers';