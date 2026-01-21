/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/hooks/useFAQToggle.ts
 * ============================================
 * 
 * DESCRIPTION:
 * Hook React personnalisé pour gérer l'état d'ouverture/fermeture des menus FAQ.
 * GÉNÉRIQUE - fonctionne pour toutes les matières et tous les types de FAQ.
 * 
 * FONCTIONNALITÉS:
 * - Toggle individuel d'un menu FAQ
 * - Vérifier si un menu est ouvert
 * - Gestion multi-menus (plusieurs FAQ peuvent être ouvertes simultanément)
 * 
 * UTILISATION:
 * ```typescript
 * const faqToggle = useFAQToggle();
 * 
 * <FAQMenuItem
 *   isOpen={faqToggle.isOpen('cours-interactif')}
 *   onToggle={() => faqToggle.toggle('cours-interactif')}
 * />
 * ```
 */

"use client";

import { useState } from "react";

/**
 * Hook de gestion de l'état des menus FAQ (ouverts/fermés)
 * Permet de gérer plusieurs menus FAQ indépendamment
 * 
 * @returns {Object} Méthodes et état pour gérer les FAQ
 */
export function useFAQToggle() {
  // État: Record<menuId, boolean> - true = ouvert, false ou absent = fermé
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  /**
   * Toggle l'état d'un menu FAQ
   * Ouvre le menu s'il est fermé, le ferme s'il est ouvert
   * 
   * @param id - ID du menu FAQ (ex: 'cours-interactif', 'exercice-binome')
   */
  const toggle = (id: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  /**
   * Vérifie si un menu FAQ est actuellement ouvert
   * 
   * @param id - ID du menu FAQ
   * @returns true si le menu est ouvert, false sinon
   */
  const isOpen = (id: string): boolean => {
    return openMenus[id] || false;
  };

  /**
   * Ferme tous les menus FAQ
   * Utile pour réinitialiser l'état ou fermer tout au chargement
   */
  const closeAll = () => {
    setOpenMenus({});
  };

  /**
   * Ouvre un menu spécifique et ferme tous les autres
   * Utile pour un comportement "accordion" (un seul menu ouvert à la fois)
   * 
   * @param id - ID du menu à ouvrir
   */
  const openOnly = (id: string) => {
    setOpenMenus({ [id]: true });
  };

  return {
    openMenus,    // État actuel (Record<string, boolean>)
    toggle,       // Fonction pour toggle un menu
    isOpen,       // Fonction pour vérifier si un menu est ouvert
    closeAll,     // Fonction pour tout fermer
    openOnly,     // Fonction pour ouvrir uniquement un menu (accordion)
  };
}
