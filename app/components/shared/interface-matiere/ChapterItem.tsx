/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/ChapterItem.tsx
 * ============================================
 * 
 * Composant ChapterItem MODULAIRE
 * S'adapte automatiquement aux 3 cycles (primaire, collège, lycée)
 */

"use client";

import { useState, useRef } from "react";
import { 
  LuChevronDown, 
  LuChevronUp, 
  LuBookOpen, 
  LuUsers, 
  LuTarget, 
  LuClipboardCheck, 
  LuMessageSquare 
} from "react-icons/lu";
import { getCOLORS, type Cycle } from "./constants";
import { ChapterLink } from "./ChapterLink";
import { CompetencesMenu } from "./CompetencesMenu";
import { useClickOutside } from "./hooks/useClickOutside";

/**
 * Type d'un chapitre
 */
export type Chapitre = {
  id: string;
  theme: string;
  titre: string;
  nombreExercices: number;
};

/**
 * Props du composant ChapterItem
 */
interface ChapterItemProps {
  chapitre: Chapitre;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  exercices: any[];
  baseRoute: string;
  cycle?: Cycle; // 🔥 NOUVEAU : Cycle (optionnel, par défaut 'college')
}

/**
 * Composant ChapterItem
 * Affiche un chapitre avec ses liens de contenu
 */
export function ChapterItem({
  chapitre,
  index,
  isOpen,
  onToggle,
  exercices,
  baseRoute,
  cycle = 'college' // 🔥 Par défaut collège si non spécifié
}: ChapterItemProps) {
  const [isCompetencesOpen, setIsCompetencesOpen] = useState(false);
  const competencesRef = useRef<HTMLDivElement>(null);
  
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  useClickOutside(competencesRef, () => {
    if (isCompetencesOpen) {
      setIsCompetencesOpen(false);
    }
  });

  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      borderRadius: "12px",
      marginBottom: "1rem",
      border: "1px solid rgba(255,255,255,0.1)",
      overflow: "hidden",
      maxWidth: "780px" // 🔥 Limite la largeur comme FAQ
    }}>
      {/* En-tête cliquable */}
      <ChapterHeader 
        chapitre={chapitre}
        index={index}
        isOpen={isOpen}
        onToggle={onToggle}
        cycle={cycle} // 🔥 Passe le cycle
      />

      {/* Contenu dépliable */}
      {isOpen && (
        <div style={{
          padding: "0.5rem 1.5rem 1.5rem 1.5rem",
          background: "rgba(0,0,0,0.15)"
        }}>
          {/* 1. Cours interactif */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-cours`}
            icon={<LuBookOpen size={20} />}
            text="Cours interactif"
            style={{ marginTop: "1rem" }}
            cycle={cycle} // 🔥 Passe le cycle
          />
          
          {/* 2. Exercice en binôme */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-binome`}
            icon={<LuUsers size={20} />}
            text="Exercice en binôme"
            cycle={cycle} // 🔥 Passe le cycle
          />

          {/* 3. Compétences clés (avec sous-menu) */}
          <CompetencesMenu
            ref={competencesRef}
            chapterIndex={index}
            exercices={exercices}
            isOpen={isCompetencesOpen}
            onToggle={() => setIsCompetencesOpen(!isCompetencesOpen)}
            baseRoute={baseRoute}
            cycle={cycle} // 🔥 Passe le cycle
          />

          {/* 4. Contrôle du chapitre */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-controle`}
            icon={<LuClipboardCheck size={20} />}
            text="Contrôle du chapitre"
            cycle={cycle} // 🔥 Passe le cycle
          />

          {/* 5. Session libre */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-session-libre`}
            icon={<LuMessageSquare size={20} />}
            text="Session libre"
            cycle={cycle} // 🔥 Passe le cycle
          />
        </div>
      )}
    </div>
  );
}

/**
 * Props du composant ChapterHeader
 */
interface ChapterHeaderProps {
  chapitre: Chapitre;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  cycle: Cycle; // 🔥 NOUVEAU
}

/**
 * En-tête cliquable d'un chapitre
 */
function ChapterHeader({ 
  chapitre, 
  index, 
  isOpen, 
  onToggle,
  cycle 
}: ChapterHeaderProps) {
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
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
      {/* Gauche: Badge numéro + Titre */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        {/* Badge avec numéro du chapitre */}
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "11px",
          background: COLORS.primary.bg,       // 🔥 Fond adaptatif
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.primary.primary,       // 🔥 Couleur adaptative
          fontSize: "1.3rem",
          fontWeight: 700
        }}>
          {index + 1}
        </div>
        
        {/* Titre du chapitre */}
        <span style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "#fff"
        }}>
          {chapitre.titre}
        </span>
      </div>

      {/* Droite: Chevron */}
      <div style={{ color: "rgba(255,255,255,0.6)" }}>
        {isOpen ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
      </div>
    </button>
  );
}