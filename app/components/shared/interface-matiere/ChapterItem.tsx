/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/ChapterItem.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Composant GÉNÉRIQUE représentant un chapitre complet avec tous ses contenus.
 * Affiche l'en-tête du chapitre et les 5 types de contenus pédagogiques.
 * 
 * FONCTIONNALITÉS:
 * - En-tête cliquable avec numéro et titre du chapitre
 * - Liste des 5 contenus pédagogiques:
 *   1. Cours interactif
 *   2. Exercice en binôme
 *   3. Compétences clés (avec sous-menu)
 *   4. Contrôle du chapitre
 *   5. Session libre
 * - Gestion du clic extérieur pour fermer le menu compétences
 * 
 * ARCHITECTURE:
 * - ChapterItem: Composant principal
 * - ChapterHeader: En-tête avec numéro et titre
 * - ChapterLink: Liens vers les contenus
 * - CompetencesMenu: Menu des exercices de compétences
 * 
 * UTILISATION:
 * ```typescript
 * <ChapterItem 
 *   chapitre={chapitre}
 *   index={0}
 *   isOpen={openChapters['C1']}
 *   onToggle={() => toggleChapter('C1')}
 *   exercices={chapitresData[0].exercices.L}
 *   baseRoute="/app/college/mathematiques-sixieme"
 * />
 * ```
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { 
  LuChevronUp, 
  LuChevronDown, 
  LuBookOpen, 
  LuUsers, 
  LuClipboardCheck, 
  LuMessageSquare 
} from "react-icons/lu";
import { CompetencesMenu } from "./CompetencesMenu";
import { ChapterLink } from "./ChapterLink";
import { useClickOutside } from "./hooks/useClickOutside";
import { COLORS } from "./constants";
import type { Chapitre, ChapterExercise } from "./types";

/**
 * Props du composant ChapterItem
 */
interface ChapterItemProps {
  chapitre: Chapitre;             // Données du chapitre
  index: number;                  // Index du chapitre (0-based)
  isOpen: boolean;                // État ouvert/fermé
  onToggle: () => void;           // Callback pour toggle
  exercices: ChapterExercise[];   // Liste des exercices
  baseRoute: string;              // Route de base (ex: "/app/college/mathematiques-sixieme")
}

/**
 * Composant principal d'un item de chapitre
 * Contient l'en-tête et tous les contenus pédagogiques
 */
export function ChapterItem({ 
  chapitre, 
  index, 
  isOpen, 
  onToggle,
  exercices,
  baseRoute
}: ChapterItemProps) {
  // État local pour le menu des compétences
  const [isCompetencesOpen, setIsCompetencesOpen] = useState(false);
  const competencesRef = useRef<HTMLDivElement | null>(null);

  // Ferme le menu des compétences au clic extérieur
  useClickOutside(
    competencesRef, 
    () => setIsCompetencesOpen(false), 
    isCompetencesOpen
  );

  return (
    <div style={{
      background: COLORS.overlay.light,
      border: `1px solid ${COLORS.overlay.border}`,
      borderRadius: "16px",
      overflow: "visible",
      marginBottom: "1.5rem",
      maxWidth: "780px"
    }}>
      {/* En-tête du chapitre */}
      <ChapterHeader 
        chapitre={chapitre}
        index={index}
        isOpen={isOpen}
        onToggle={onToggle}
      />

      {/* Contenu dépliable: les 5 types de contenus */}
      {isOpen && (
        <div style={{
          padding: "0 2rem 1.5rem 2rem",
          borderTop: `1px solid ${COLORS.overlay.border}`
        }}>
          {/* 1. Cours interactif */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-cours`}
            icon={<LuBookOpen size={20} style={{ color: COLORS.purple.light }} />}
            text="Cours interactif"
            style={{ marginTop: "1rem" }}
          />
          
          {/* 2. Exercice en binôme */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-binome`}
            icon={<LuUsers size={20} style={{ color: COLORS.purple.light }} />}
            text="Exercice en binôme"
          />

          {/* 3. Compétences clés (avec sous-menu) */}
          <CompetencesMenu
            ref={competencesRef}
            chapterIndex={index}
            exercices={exercices}
            isOpen={isCompetencesOpen}
            onToggle={() => setIsCompetencesOpen(!isCompetencesOpen)}
            baseRoute={baseRoute}
          />

          {/* 4. Contrôle du chapitre */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-controle`}
            icon={<LuClipboardCheck size={20} style={{ color: COLORS.purple.light }} />}
            text="Contrôle du chapitre"
          />

          {/* 5. Session libre */}
          <ChapterLink 
            href={`${baseRoute}/chapitre${index + 1}-session-libre`}
            icon={<LuMessageSquare size={20} style={{ color: COLORS.purple.light }} />}
            text="Session libre"
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
}

/**
 * En-tête cliquable d'un chapitre
 * Affiche le numéro, le titre et le chevron
 */
function ChapterHeader({ 
  chapitre, 
  index, 
  isOpen, 
  onToggle 
}: ChapterHeaderProps) {
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
          background: COLORS.purple.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.purple.primary,
          fontSize: "1.3rem",
          fontWeight: 700
        }}>
          {index + 1}
        </div>
        
        {/* Titre du chapitre */}
        <span style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          color: COLORS.white.full
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