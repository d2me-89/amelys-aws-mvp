/**
 * Fonctions utilitaires unifiées pour collège et lycée
 * 
 * Ce fichier remplace les helpers séparés de college/ et lycee/.
 * Les fonctions sont identiques, seules les données changent.
 */

import { Matiere, Epreuve, Classe } from '../shared/types';

/**
 * Type pour la structure de données complète d'un cycle
 */
export type CycleData = {
  classes: Classe[];
  matieresParClasse: Record<string, Matiere[]>;
  epreuves: Epreuve[];
};

/**
 * Récupère la liste des matières pour une classe donnée
 */
export function getMatieresParClasse(
  classeId: string, 
  cycleData: CycleData
): Matiere[] {
  return cycleData.matieresParClasse[classeId] || [];
}

/**
 * Récupère les épreuves (brevet ou baccalauréat)
 */
export function getEpreuves(cycleData: CycleData): Epreuve[] {
  return cycleData.epreuves;
}

/**
 * Génère le titre de la page selon la classe sélectionnée
 */
export function getTitreClasse(classeId: string, isExamen: boolean): string {
  // Pour les examens (brevet/baccalauréat)
  if (isExamen) {
    return classeId === 'brevet' 
      ? "Épreuves du Brevet" 
      : "Épreuves du Baccalauréat";
  }

  // Pour les classes régulières
  const titres: Record<string, string> = {
    // Collège
    sixieme: "Matières de Sixième",
    cinquieme: "Matières de Cinquième",
    quatrieme: "Matières de Quatrième",
    troisieme: "Matières de Troisième",
    // Lycée
    seconde: "Matières de Seconde",
    premiere: "Matières de Première",
    terminale: "Matières de Terminale",
  };
  
  return titres[classeId] || "";
}

/**
 * Retourne le nombre de matières/épreuves pour une classe
 */
export function getNombreMatieresClasse(
  classeId: string,
  cycleData: CycleData
): number {
  // Pour les examens
  if (classeId === 'brevet' || classeId === 'baccalaureat') {
    return cycleData.epreuves.length;
  }

  // Pour les classes régulières
  const matieres = cycleData.matieresParClasse[classeId];
  return matieres ? matieres.length : 0;
}

/**
 * Génère la description affichée sous le titre
 */
export function getDescriptionClasse(
  classeId: string,
  cycleData: CycleData
): string {
  const nbMatieres = getNombreMatieresClasse(classeId, cycleData);
  const isExamen = classeId === 'brevet' || classeId === 'baccalaureat';
  
  if (isExamen) {
    return `${nbMatieres} épreuves • Des dizaines de ${classeId === 'brevet' ? 'brevets blancs' : 'bacs blancs'} • Des centaines d'exercices pratiques`;
  }
  
  return `${nbMatieres} matières • Des centaines de modules • Des milliers d'activités`;
}

/**
 * Vérifie si la classe sélectionnée est un examen
 */
export function isExamenClasse(classeId: string): boolean {
  return classeId === 'brevet' || classeId === 'baccalaureat';
}

/**
 * Vérifie si la classe sélectionnée est une classe régulière
 */
export function isRegularClasse(classeId: string): boolean {
  const classesRegulieres = [
    'sixieme', 'cinquieme', 'quatrieme', 'troisieme',  // Collège
    'seconde', 'premiere', 'terminale'  // Lycée
  ];
  return classesRegulieres.includes(classeId);
}

/**
 * Récupère le label d'une classe à partir de son ID
 */
export function getLabelClasse(
  classeId: string,
  cycleData: CycleData
): string | undefined {
  return cycleData.classes.find(c => c.id === classeId)?.label;
}

/**
 * Vérifie si une classe existe dans la configuration
 */
export function classeExists(
  classeId: string,
  cycleData: CycleData
): boolean {
  return cycleData.classes.some(c => c.id === classeId);
}
