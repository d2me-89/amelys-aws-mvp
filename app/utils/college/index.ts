// Export des types
export type { Matiere, Epreuve, Classe } from './types';

// Export des données
export { 
  CLASSES, 
  MATIERES_PAR_CLASSE, 
  EPREUVES_BREVET 
} from './data';

// Export des helpers
export {
  getMatieresParClasse,
  getEpreuvesBrevet,
  getTitreClasse,
  getNombreMatieresClasse,
  getDescriptionClasse,
  isBrevetClasse,
  isRegularClasse,
  getLabelClasse,
  classeExists,
} from './helpers';