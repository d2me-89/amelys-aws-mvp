/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/CollapsibleSection.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Composant de section dépliable/collapsible GÉNÉRIQUE.
 * Utilisé pour l'introduction, la FAQ, et potentiellement d'autres sections.
 * 
 * FONCTIONNALITÉS:
 * - En-tête cliquable avec icône et titre
 * - Animation d'ouverture/fermeture (chevron rotatif)
 * - Effet hover sur l'en-tête
 * - Contenu personnalisable via children
 * 
 * CAS D'USAGE:
 * - Section "Les mathématiques en sixième"
 * - Section "FAQ"
 * - Toute autre section dépliable
 * 
 * UTILISATION:
 * ```typescript
 * <CollapsibleSection
 *   icon={<LuCalculator size={22} />}
 *   title="Les mathématiques en sixième"
 *   isOpen={isOpen}
 *   onToggle={() => setIsOpen(!isOpen)}
 * >
 *   <p>Contenu de la section...</p>
 * </CollapsibleSection>
 * ```
 */

"use client";

import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import { COLORS } from "./constants";

/**
 * Props du composant CollapsibleSection
 */
interface CollapsibleSectionProps {
  icon: React.ReactNode;      // Icône affichée dans l'en-tête (ex: LuCalculator)
  title: string;              // Titre de la section
  isOpen: boolean;            // État ouvert/fermé
  onToggle: () => void;       // Callback au clic sur l'en-tête
  children: React.ReactNode;  // Contenu de la section (affiché si isOpen=true)
}

/**
 * Section dépliable avec en-tête cliquable
 * Affiche un chevron animé et gère l'état ouvert/fermé
 */
export function CollapsibleSection({
  icon,
  title,
  isOpen,
  onToggle,
  children
}: CollapsibleSectionProps) {
  return (
    <div style={{
      background: COLORS.overlay.light,
      border: `1px solid ${COLORS.overlay.border}`,
      borderRadius: "16px",
      overflow: "hidden",
      marginBottom: "1.5rem",
      maxWidth: "780px"
    }}>
      {/* En-tête cliquable */}
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "1.2rem 1.5rem",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "background 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Partie gauche: Icône + Titre */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.85rem"
        }}>
          {/* Badge avec icône */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "11px",
            background: COLORS.purple.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.purple.primary
          }}>
            {icon}
          </div>
          
          {/* Titre */}
          <span style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: COLORS.white.full
          }}>
            {title}
          </span>
        </div>

        {/* Partie droite: Chevron animé */}
        <div style={{ color: "rgba(255,255,255,0.6)" }}>
          {isOpen ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
        </div>
      </button>

      {/* Contenu dépliable */}
      {isOpen && (
        <div style={{
          padding: "0 1.5rem 1.5rem 1.5rem",
          borderTop: `1px solid ${COLORS.overlay.border}`
        }}>
          {children}
        </div>
      )}
    </div>
  );
}