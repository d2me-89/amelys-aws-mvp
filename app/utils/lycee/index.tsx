// Export des types
export type { Matiere, Epreuve, Classe } from './types';

// Export des données
export { 
  CLASSES, 
  MATIERES_PAR_CLASSE, 
  EPREUVES_BACCALAUREAT 
} from './data';

// Export des helpers
export {
  getMatieresParClasse,
  getEpreuvesBaccalaureat,
  getTitreClasse,
  getNombreMatieresClasse,
  getDescriptionClasse,
  isBaccalaureatClasse,
  isRegularClasse,
  getLabelClasse,
  classeExists,
} from './helpers';