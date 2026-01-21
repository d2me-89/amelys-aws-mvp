/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/CollapsibleSection.tsx
 * ============================================
 * 
 * Section dépliable MODULAIRE
 * S'adapte aux 3 cycles (primaire, collège, lycée)
 */

"use client";

import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import { getCOLORS, type Cycle } from "./constants";

/**
 * Props du composant CollapsibleSection
 */
interface CollapsibleSectionProps {
  icon: React.ReactNode;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  cycle?: Cycle; // 🔥 NOUVEAU : Cycle (optionnel, défaut 'college')
}

/**
 * Section dépliable avec en-tête cliquable
 */
export function CollapsibleSection({
  icon,
  title,
  isOpen,
  onToggle,
  children,
  cycle = 'college' // 🔥 Par défaut collège
}: CollapsibleSectionProps) {
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "16px",
      overflow: "hidden",
      marginBottom: "1.5rem",
      maxWidth: "780px" // 🔥 Limite la largeur
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
          {/* Badge avec icône - COULEURS ADAPTATIVES */}
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "11px",
            background: COLORS.primary.bg,        // 🔥 Fond adaptatif
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.primary.primary         // 🔥 Couleur adaptative
          }}>
            {icon}
          </div>
          
          {/* Titre */}
          <span style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#fff"
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
          borderTop: "1px solid rgba(255,255,255,0.1)"
        }}>
          {children}
        </div>
      )}
    </div>
  );
}