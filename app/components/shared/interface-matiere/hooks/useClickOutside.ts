/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/hooks/useClickOutside.ts
 * ============================================
 * 
 * DESCRIPTION:
 * Hook React personnalisé pour détecter les clics en dehors d'un élément.
 * GÉNÉRIQUE - utilisable pour n'importe quel composant (menus, modals, dropdowns, etc.)
 * 
 * FONCTIONNALITÉS:
 * - Détecte automatiquement les clics à l'extérieur d'une ref
 * - Exécute un handler personnalisé lors de la détection
 * - Peut être activé/désactivé dynamiquement
 * - Nettoie automatiquement les event listeners
 * 
 * CAS D'USAGE:
 * - Fermer un menu déroulant quand on clique ailleurs
 * - Fermer une modale au clic extérieur
 * - Fermer le menu des compétences
 * 
 * UTILISATION:
 * ```typescript
 * const menuRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useClickOutside(menuRef, () => setIsOpen(false), isOpen);
 * 
 * <div ref={menuRef}>
 *   Mon menu
 * </div>
 * ```
 */

"use client";

import { useEffect, RefObject } from "react";

/**
 * Hook pour détecter les clics en dehors d'un élément du DOM
 * 
 * @param ref - Référence React à l'élément à surveiller
 * @param handler - Fonction à exécuter lors d'un clic extérieur
 * @param isActive - Si false, le hook est désactivé (défaut: true)
 * 
 * @example
 * ```typescript
 * const menuRef = useRef<HTMLDivElement>(null);
 * useClickOutside(menuRef, () => console.log('Clic extérieur!'), true);
 * ```
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void,
  isActive: boolean = true
) {
  useEffect(() => {
    // Si le hook est désactivé, ne rien faire
    if (!isActive) return;

    /**
     * Gestionnaire d'événement pour les clics
     * Vérifie si le clic est à l'extérieur de l'élément référencé
     */
    const handleClickOutside = (event: MouseEvent) => {
      // Si la ref n'existe pas ou si le clic est à l'intérieur, ignorer
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    // Ajouter l'écouteur d'événement au document
    // On utilise 'mousedown' au lieu de 'click' pour une meilleure réactivité
    document.addEventListener('mousedown', handleClickOutside);

    // Fonction de nettoyage : retirer l'écouteur quand le composant est démonté
    // ou quand les dépendances changent
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler, isActive]); // Re-exécuter si ces valeurs changent
}

/**
 * NOTES DE PERFORMANCE:
 * - L'écouteur n'est ajouté que si isActive est true
 * - Le nettoyage automatique évite les fuites mémoire
 * - Utilise mousedown au lieu de click pour une détection plus rapide
 */
