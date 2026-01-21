/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/CompetencesMenu.tsx
 * ============================================
 * 
 * Menu déroulant des compétences clés MODULAIRE
 * S'adapte automatiquement aux 3 cycles
 */

"use client";

import { forwardRef } from "react";
import { LuTarget, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { ChapterLink } from "./ChapterLink";
import { getCOLORS, type Cycle } from "./constants";

interface CompetencesMenuProps {
  chapterIndex: number;
  exercices: any[];
  isOpen: boolean;
  onToggle: () => void;
  baseRoute: string;
  cycle?: Cycle; // 🔥 NOUVEAU
}

export const CompetencesMenu = forwardRef<HTMLDivElement, CompetencesMenuProps>(
  function CompetencesMenu({ chapterIndex, exercices, isOpen, onToggle, baseRoute, cycle = 'college' }, ref) {
    const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

    return (
      <div ref={ref}>
        {/* Bouton principal "Compétences clés" */}
        <button
          onClick={onToggle}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.85rem 1rem",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            marginTop: "0.75rem"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <LuTarget size={20} style={{ color: COLORS.primary.light }} /> {/* 🔥 Couleur adaptative */}
            <span>Compétences clés</span>
          </div>
          
          {isOpen ? <LuChevronUp size={18} /> : <LuChevronDown size={18} />}
        </button>

        {/* Sous-menu des exercices */}
        {isOpen && (
          <div style={{
            marginTop: "0.5rem",
            marginLeft: "1rem",
            paddingLeft: "1rem",
            borderLeft: "2px solid rgba(255,255,255,0.1)"
          }}>
            {exercices.map((exercice: any) => (
              <ChapterLink
                key={exercice.M.id.S}
                href={`${baseRoute}/chapitre${chapterIndex + 1}-exercice${exercice.M.id.S.replace('E', '')}`}
                icon={<span style={{ 
                  fontSize: "0.85rem", 
                  color: COLORS.primary.light, // 🔥 Couleur adaptative
                  fontWeight: 700 
                }}>
                  {exercice.M.id.S}
                </span>}
                text={exercice.M.titre.S}
                style={{ fontSize: "0.95rem" }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);