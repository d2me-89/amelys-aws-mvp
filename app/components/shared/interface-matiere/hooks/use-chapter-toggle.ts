/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/hooks/useChapterToggle.ts
 * ============================================
 * 
 * DESCRIPTION:
 * Hook React personnalisé pour gérer l'état d'ouverture/fermeture des chapitres.
 * GÉNÉRIQUE - fonctionne pour toutes les matières.
 * 
 * FONCTIONNALITÉS:
 * - Toggle individuel d'un chapitre
 * - Tout ouvrir / tout fermer en un clic
 * - Vérifier si tous les chapitres sont ouverts
 * 
 * UTILISATION:
 * ```typescript
 * const { openChapters, toggleChapter, toggleAll, areAllOpen } = useChapterToggle();
 * 
 * // Ouvrir/fermer un chapitre
 * <button onClick={() => toggleChapter('C1')}>Toggle Chapitre 1</button>
 * 
 * // Tout ouvrir/fermer
 * <button onClick={() => toggleAll(chaptersIds)}>
 *   {areAllOpen(chaptersIds) ? 'Tout cacher' : 'Tout afficher'}
 * </button>
 * ```
 */

"use client";

import { useState } from "react";

/**
 * Hook de gestion de l'état des chapitres (ouverts/fermés)
 * 
 * @returns {Object} Méthodes et état pour gérer les chapitres
 */
export function useChapterToggle() {
  // État: Record<chapterId, boolean> - true = ouvert, false ou absent = fermé
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  /**
   * Toggle l'état d'un chapitre individuel
   * 
   * @param chapterId - ID du chapitre (ex: "C1", "C2", etc.)
   */
  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  /**
   * Ouvre ou ferme tous les chapitres à la fois
   * Si tous sont ouverts → tout fermer
   * Sinon → tout ouvrir
   * 
   * @param chaptersIds - Liste des IDs de tous les chapitres
   */
  const toggleAll = (chaptersIds: string[]) => {
    const allOpen = chaptersIds.every(id => openChapters[id]);
    
    if (allOpen) {
      // Tout fermer
      setOpenChapters({});
    } else {
      // Tout ouvrir
      const newState: Record<string, boolean> = {};
      chaptersIds.forEach(id => {
        newState[id] = true;
      });
      setOpenChapters(newState);
    }
  };

  /**
   * Vérifie si tous les chapitres sont ouverts
   * 
   * @param chaptersIds - Liste des IDs de tous les chapitres
   * @returns true si tous les chapitres sont ouverts
   */
  const areAllOpen = (chaptersIds: string[]) => {
    return chaptersIds.length > 0 && chaptersIds.every(id => openChapters[id]);
  };

  return {
    openChapters,      // État actuel (Record<string, boolean>)
    toggleChapter,     // Fonction pour toggle un chapitre
    toggleAll,         // Fonction pour tout ouvrir/fermer
    areAllOpen,        // Fonction pour vérifier si tous sont ouverts
  };
}
