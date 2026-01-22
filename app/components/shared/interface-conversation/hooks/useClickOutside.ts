/**
 * Hook useClickOutside
 * 
 * Détecte les clics en dehors d'un élément référencé.
 * Utile pour fermer les menus déroulants, modales, etc.
 */

"use client";

import { useEffect, RefObject } from 'react';

/**
 * Hook qui exécute un callback quand un clic se produit en dehors de l'élément ref
 * 
 * @param ref - Référence à l'élément à surveiller
 * @param handler - Fonction à exécuter lors d'un clic extérieur
 * @param enabled - Active ou désactive la détection (défaut: true)
 * 
 * @example
 * ```tsx
 * const menuRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useClickOutside(menuRef, () => setIsOpen(false), isOpen);
 * 
 * return (
 *   <div ref={menuRef}>
 *     {isOpen && <Menu />}
 *   </div>
 * );
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      
      // Ne rien faire si le clic est sur l'élément ou ses enfants
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    // Écouter les événements mousedown et touchstart
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

export default useClickOutside;
