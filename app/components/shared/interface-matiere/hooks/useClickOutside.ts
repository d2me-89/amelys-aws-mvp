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

import { useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutside: (event: AnyEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: AnyEvent) => {
      const el = ref.current;

      // le ref n'est pas encore monté
      if (!el) return;

      // clic à l'intérieur → on ignore
      if (el.contains(event.target as Node)) return;

      // clic extérieur
      onOutside(event);
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onOutside, enabled]);
}

