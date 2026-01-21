/**
 * Fonctions utilitaires pour la logique métier du collège
 * 
 * Ce fichier contient toutes les fonctions helpers qui manipulent les données.
 * Avantage : logique métier centralisée, testable et réutilisable.
 */

import { CLASSES, MATIERES_PAR_CLASSE, EPREUVES_BREVET } from './data';
import { Matiere, Epreuve } from './types';

/**
 * Récupère la liste des matières pour une classe donnée
 * @param classeId - Identifiant de la classe (ex: "sixieme")
 * @returns Tableau des matières ou tableau vide si la classe n'existe pas
 */
export const getMatieresParClasse = (classeId: string): Matiere[] => {
  return MATIERES_PAR_CLASSE[classeId] || [];
};

/**
 * Récupère les épreuves du brevet
 * @returns Tableau des épreuves du brevet
 */
export const getEpreuvesBrevet = (): Epreuve[] => {
  return EPREUVES_BREVET;
};

/**
 * Génère le titre de la page selon la classe sélectionnée
 * @param classeId - Identifiant de la classe
 * @returns Titre formaté (ex: "Matières de Sixième")
 */
export const getTitreClasse = (classeId: string): string => {
  const titres: Record<string, string> = {
    sixieme: "Matières de Sixième",
    cinquieme: "Matières de Cinquième",
    quatrieme: "Matières de Quatrième",
    troisieme: "Matières de Troisième",
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
    sixieme: 7,
    cinquieme: 10,
    quatrieme: 10,
    troisieme: 10,
    brevet: 5,
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
  const type = classeId === "brevet" ? "épreuves" : "matières";
  return `${nbMatieres} ${type} • Des centaines de modules • Des milliers d'activités`;
};

/**
 * Vérifie si la classe sélectionnée est le brevet
 * @param classeId - Identifiant de la classe
 * @returns true si c'est le brevet
 */
export const isBrevetClasse = (classeId: string): boolean => {
  return classeId === "brevet";
};

/**
 * Vérifie si la classe sélectionnée est une classe régulière (6e à 3e)
 * @param classeId - Identifiant de la classe
 * @returns true si c'est une classe régulière
 */
export const isRegularClasse = (classeId: string): boolean => {
  return ["sixieme", "cinquieme", "quatrieme", "troisieme"].includes(classeId);
};

/**
 * Récupère le label d'une classe à partir de son ID
 * @param classeId - Identifiant de la classe
 * @returns Label de la classe (ex: "Sixième") ou undefined
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
