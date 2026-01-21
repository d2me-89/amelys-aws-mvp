/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/FAQMenuItem.tsx
 * ============================================
 * 
 * Item de FAQ MODULAIRE avec style SOBRE
 * S'adapte aux 3 cycles
 */

"use client";

import { LuChevronRight } from "react-icons/lu";
import { getCOLORS, type Cycle } from "./constants";

/**
 * Structure d'une FAQ
 */
type FAQData = {
  titre: string;
  sections: Array<{
    titre: string;
    type: string;
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
 * Item de menu FAQ avec contenu dépliable
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
    <div style={{ marginTop: "1rem" }}>
      {/* En-tête cliquable - STYLE SOBRE */}
      <div
        onClick={onToggle}
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "background 0.2s ease",
          background: isOpen ? "rgba(255,255,255,0.08)" : "transparent" // Subtil
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Gauche: Icône + Titre */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {/* 🔥 WRAPPER pour colorer l'icône */}
          <div style={{ color: COLORS.primary.light }}>
            {icon}
          </div>
          <span style={{ fontSize: "1.05rem", color: "#fff", fontWeight: 500 }}>
            {data.titre}
          </span>
        </div>
        
        {/* Droite: Chevron rotatif */}
        <LuChevronRight 
          size={18} 
          style={{ 
            color: "rgba(255,255,255,0.5)",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease"
          }} 
        />
      </div>

      {/* Contenu dépliable */}
      {isOpen && <FAQContent sections={data.sections} cycle={cycle} />}
    </div>
  );
}

/**
 * Props du composant FAQContent
 */
interface FAQContentProps {
  sections: FAQData['sections'];
  cycle: Cycle; // 🔥 NOUVEAU
}

/**
 * Contenu de la FAQ avec sections multiples
 */
function FAQContent({ sections, cycle }: FAQContentProps) {
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
    <div style={{
      padding: "1rem 1.5rem",
      background: "rgba(0,0,0,0.2)",
      borderRadius: "8px",
      marginTop: "0.5rem"
    }}>
      {sections.map((section, index) => (
        <div key={index} style={{ 
          marginBottom: index < sections.length - 1 ? "1.5rem" : "0" 
        }}>
          {/* Titre de la section */}
          <h3 style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: COLORS.primary.light, // 🔥 Couleur adaptative
            marginBottom: "0.5rem"
          }}>
            {section.titre}
          </h3>
          
          {/* Contenu: Paragraphe simple */}
          {section.type === "paragraphe" && typeof section.contenu === "string" && (
            <p style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.6",
              margin: 0
            }}>
              {section.contenu}
            </p>
          )}
          
          {/* Contenu: Liste ordonnée (numérotée) */}
          {section.type === "liste-ordonnee" && Array.isArray(section.contenu) && (
            <ol style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.6",
              margin: 0,
              paddingLeft: "1.5rem"
            }}>
              {section.contenu.map((item, idx) => (
                <li key={idx} style={{ 
                  marginBottom: idx < section.contenu.length - 1 ? "0.5rem" : "0" 
                }}>
                  {item}
                </li>
              ))}
            </ol>
          )}
          
          {/* Contenu: Liste à puces */}
          {section.type === "liste-puces" && Array.isArray(section.contenu) && (
            <ul style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.6",
              margin: 0,
              paddingLeft: "1.5rem",
              listStyle: "disc"
            }}>
              {section.contenu.map((item, idx) => (
                <li key={idx} style={{ 
                  marginBottom: idx < section.contenu.length - 1 ? "0.5rem" : "0" 
                }}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}