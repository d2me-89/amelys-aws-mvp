/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/FAQMenuItem.tsx
 * ============================================
 * 
 * Item de FAQ MODULAIRE
 * S'adapte aux 3 cycles
 */

"use client";

import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { getCOLORS, type Cycle } from "./constants";

/**
 * Structure d'une FAQ
 */
type FAQData = {
  titre: string;
  sections: Array<{
    titre: string;
    contenu: string | string[];
  }>;
};

/**
 * Props du composant FAQMenuItem
 */
interface FAQMenuItemProps {
  icon: React.ReactNode;
  data: FAQData;
  isOpen: boolean;
  onToggle: () => void;
  cycle?: Cycle; // 🔥 NOUVEAU
}

/**
 * Item de FAQ cliquable avec contenu dépliable
 */
export function FAQMenuItem({ 
  icon, 
  data, 
  isOpen, 
  onToggle,
  cycle = 'college' // 🔥 Par défaut collège
}: FAQMenuItemProps) {
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
    <div style={{
      marginBottom: "1rem",
      maxWidth: "780px" // 🔥 Limite la largeur
    }}>
      {/* Bouton principal */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          background: COLORS.primary.bg,         // 🔥 Fond adaptatif
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          <div style={{ color: COLORS.primary.primary }}> {/* 🔥 Couleur adaptative */}
            {icon}
          </div>
          <span style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            color: COLORS.primary.primary        // 🔥 Couleur adaptative
          }}>
            {data.titre}
          </span>
        </div>

        <div style={{ color: COLORS.primary.primary }}> {/* 🔥 Couleur adaptative */}
          {isOpen ? <LuChevronUp size={20} /> : <LuChevronDown size={20} />}
        </div>
      </button>

      {/* Contenu dépliable */}
      {isOpen && (
        <div style={{
          marginTop: "0.75rem",
          padding: "1.5rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "12px"
        }}>
          {data.sections.map((section, index) => (
            <div 
              key={index}
              style={{
                marginBottom: index < data.sections.length - 1 ? "1.5rem" : "0"
              }}
            >
              <h4 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: COLORS.primary.light,       // 🔥 Couleur adaptative
                marginBottom: "0.75rem"
              }}>
                {section.titre}
              </h4>

              {typeof section.contenu === "string" ? (
                <p style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: "1.6",
                  margin: 0
                }}>
                  {section.contenu}
                </p>
              ) : (
                <ul style={{
                  margin: 0,
                  paddingLeft: "1.5rem",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.95rem",
                  lineHeight: "1.8"
                }}>
                  {section.contenu.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}