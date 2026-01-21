/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/FAQMenuItem.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Composant d'item de FAQ GÉNÉRIQUE avec contenu dépliable.
 * Gère l'affichage de différents types de contenu (paragraphe, listes).
 * 
 * FONCTIONNALITÉS:
 * - En-tête cliquable avec icône et titre
 * - Chevron animé (rotation 90°)
 * - Affichage conditionnel selon le type de contenu:
 *   - Paragraphes simples
 *   - Listes ordonnées (numérotées)
 *   - Listes à puces
 * 
 * CAS D'USAGE:
 * - "Cours interactif"
 * - "Exercice en binôme"
 * - "Compétences clés"
 * - "Contrôle évalué"
 * - "Session libre"
 * 
 * UTILISATION:
 * ```typescript
 * <FAQMenuItem
 *   icon={<LuBookOpen size={20} style={{ color: "#B794F6" }} />}
 *   data={faqCoursInteractifData}
 *   isOpen={isOpen}
 *   onToggle={() => toggle('cours-interactif')}
 * />
 * ```
 */

"use client";

import { LuChevronRight } from "react-icons/lu";
import { COLORS } from "./constants";
import type { FAQData } from "./types";

/**
 * Props du composant FAQMenuItem
 */
interface FAQMenuItemProps {
  icon: React.ReactNode;  // Icône affichée (ex: LuBookOpen)
  data: FAQData;          // Données de la FAQ (titre + sections)
  isOpen: boolean;        // État ouvert/fermé
  onToggle: () => void;   // Callback au clic
}

/**
 * Item de menu FAQ avec contenu dépliable
 * Composant principal qui affiche l'en-tête et gère le contenu
 */
export function FAQMenuItem({ icon, data, isOpen, onToggle }: FAQMenuItemProps) {
  return (
    <div style={{ marginTop: "1rem" }}>
      {/* En-tête cliquable */}
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
          background: isOpen ? COLORS.overlay.hover : "transparent"
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.background = COLORS.overlay.hover;
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Gauche: Icône + Titre */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {icon}
          <span style={{ fontSize: "1.05rem", color: COLORS.white.full, fontWeight: 500 }}>
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
      {isOpen && <FAQContent sections={data.sections} />}
    </div>
  );
}

/**
 * Props du composant FAQContent
 */
interface FAQContentProps {
  sections: FAQData['sections'];  // Sections de contenu à afficher
}

/**
 * Contenu de la FAQ avec sections multiples
 * Gère l'affichage selon le type de contenu (paragraphe, listes)
 */
function FAQContent({ sections }: FAQContentProps) {
  return (
    <div style={{
      padding: "1rem 1.5rem",
      background: COLORS.overlay.dark,
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
            color: COLORS.purple.light,
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