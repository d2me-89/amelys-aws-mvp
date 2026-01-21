/**
 * Fonctions utilitaires pour la logique métier du lycée
 * 
 * Ce fichier contient toutes les fonctions helpers qui manipulent les données.
 * Logique métier centralisée, testable et réutilisable.
 */

import { CLASSES, MATIERES_PAR_CLASSE, EPREUVES_BACCALAUREAT } from './data';
import { Matiere, Epreuve } from './types';

/**
 * Récupère la liste des matières pour une classe donnée
 * @param classeId - Identifiant de la classe (ex: "seconde")
 * @returns Tableau des matières ou tableau vide si la classe n'existe pas
 */
export const getMatieresParClasse = (classeId: string): Matiere[] => {
  return MATIERES_PAR_CLASSE[classeId] || [];
};

/**
 * Récupère les épreuves du baccalauréat
 * @returns Tableau des épreuves du baccalauréat
 */
export const getEpreuvesBaccalaureat = (): Epreuve[] => {
  return EPREUVES_BACCALAUREAT;
};

/**
 * Génère le titre de la page selon la classe sélectionnée
 * @param classeId - Identifiant de la classe
 * @returns Titre formaté (ex: "Matières de Seconde")
 */
export const getTitreClasse = (classeId: string): string => {
  const titres: Record<string, string> = {
    seconde: "Matières de Seconde",
    premiere: "Matières de Première",
    terminale: "Matières de Terminale",
    baccalaureat: "Épreuves du Baccalauréat",
  };
  return titres[classeId] || "";
};

/**
 * Retourne le nombre de matières/épreuves pour une classe
 * @param classeId - Identifiant de la classe
 * @returns Nombre de matières ou 0 si non défini
 */
export const getNombreMatieresClasse = (classeId: string): number => {
  const nombres: Record<string, number> = {
    seconde: 11,
    premiere: 16,
    terminale: 17,
    baccalaureat: 15,
  };
  return nombres[classeId] || 0;
};

/**
 * Génère la description affichée sous le titre
 * @param classeId - Identifiant de la classe
 * @returns Description formatée
 */
export const getDescriptionClasse = (classeId: string): string => {
  const nbMatieres = getNombreMatieresClasse(classeId);
  
  if (classeId === "baccalaureat") {
    return `${nbMatieres} épreuves • Des dizaines de bacs blancs • Des centaines d'exercices pratiques`;
  }
  
  return `${nbMatieres} matières • Des centaines de modules • Des milliers d'activités`;
};

/**
 * Vérifie si la classe sélectionnée est le baccalauréat
 * @param classeId - Identifiant de la classe
 * @returns true si c'est le baccalauréat
 */
export const isBaccalaureatClasse = (classeId: string): boolean => {
  return classeId === "baccalaureat";
};

/**
 * Vérifie si la classe sélectionnée est une classe régulière (2nde à Tle)
 * @param classeId - Identifiant de la classe
 * @returns true si c'est une classe régulière
 */
export const isRegularClasse = (classeId: string): boolean => {
  return ["seconde", "premiere", "terminale"].includes(classeId);
};

/**
 * Récupère le label d'une classe à partir de son ID
 * @param classeId - Identifiant de la classe
 * @returns Label de la classe (ex: "Seconde") ou undefined
 */
export const getLabelClasse = (classeId: string): string | undefined => {
  return CLASSES.find(c => c.id === classeId)?.label;
};

/**
 * Vérifie si une classe existe dans la configuration
 * @param classeId - Identifiant de la classe
 * @returns true si la classe existe
 */
export const classeExists = (classeId: string): boolean => {
  return CLASSES.some(c => c.id === classeId);
};