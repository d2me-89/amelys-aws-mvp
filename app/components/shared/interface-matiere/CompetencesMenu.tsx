/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/CompetencesMenu.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Menu déroulant GÉNÉRIQUE affichant la liste des exercices de compétences.
 * S'ouvre à droite du bouton "Compétences clés" avec liste scrollable.
 * 
 * FONCTIONNALITÉS:
 * - Menu positionné à droite du déclencheur
 * - Liste scrollable si plus de 10 exercices
 * - Fermeture au clic extérieur (via useClickOutside)
 * - Affichage du nombre total d'exercices
 * - Navigation vers chaque exercice
 * 
 * TECHNIQUE:
 * - Position absolute pour placement à droite
 * - forwardRef pour permettre la ref externe (détection clic extérieur)
 * - Numérotation automatique des exercices
 * 
 * UTILISATION:
 * ```typescript
 * const ref = useRef<HTMLDivElement>(null);
 * 
 * <CompetencesMenu
 *   ref={ref}
 *   chapterIndex={0}
 *   exercices={chapitresData[0].exercices.L}
 *   isOpen={isOpen}
 *   onToggle={() => setIsOpen(!isOpen)}
 * />
 * ```
 */

"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { LuTarget, LuChevronRight } from "react-icons/lu";
import { COLORS } from "./constants";
import type { ChapterExercise } from "./types";

/**
 * Props du composant CompetencesMenu
 */
interface CompetencesMenuProps {
  chapterIndex: number;           // Index du chapitre (0-based)
  exercices: ChapterExercise[];   // Liste des exercices
  isOpen: boolean;                // État ouvert/fermé
  onToggle: () => void;           // Callback pour toggle
  baseRoute?: string;             // Route de base (défaut: automatique selon niveau)
}

/**
 * Menu des compétences avec liste d'exercices
 * Utilise forwardRef pour permettre la détection de clic extérieur
 */
export const CompetencesMenu = forwardRef<HTMLDivElement, CompetencesMenuProps>(
  function CompetencesMenu({ chapterIndex, exercices, isOpen, onToggle, baseRoute }, ref) {
    // Génération automatique de la route de base si non fournie
    // Format: /app/college/mathematiques-sixieme (à adapter selon le contexte)
    const route = baseRoute || '';

    return (
      <div 
        ref={ref}
        style={{ marginBottom: "0.4rem", position: "relative" }}
      >
        {/* Bouton déclencheur */}
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
            if (!isOpen) {
              e.currentTarget.style.background = COLORS.overlay.hover;
            }
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <LuTarget size={20} style={{ color: COLORS.purple.light }} />
            <span style={{ fontSize: "1.05rem", color: COLORS.white.full, fontWeight: 500 }}>
              Compétences clés
            </span>
          </div>
          
          {/* Chevron rotatif */}
          <LuChevronRight 
            size={18} 
            style={{ 
              color: "rgba(255,255,255,0.5)",
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease"
            }} 
          />
        </div>

        {/* Menu déroulant à droite */}
        {isOpen && (
          <div style={{
            position: "absolute",
            left: "105%",           // Positionné à droite du bouton
            top: 0,
            width: "420px",
            background: "rgba(15,15,25,0.98)",
            borderRadius: "12px",
            border: `1px solid ${COLORS.overlay.border}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            zIndex: 9999,
            overflow: "hidden"
          }}>
            {/* Titre du sous-menu - FIXE */}
            <div style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: COLORS.purple.light,
              padding: "0.75rem 0.75rem 0.5rem 0.75rem",
              borderBottom: `1px solid ${COLORS.overlay.border}`,
              background: "rgba(15,15,25,0.98)"
            }}>
              {exercices.length} exercices
            </div>

            {/* Liste des exercices - SCROLLABLE */}
            <div style={{
              maxHeight: "450px",
              overflowY: "auto",
              padding: "0.75rem"
            }}>
              {exercices.map((exercice, exIndex) => (
                <Link
                  key={exIndex}
                  href={`${route}/chapitre${chapterIndex + 1}-exercice${exIndex + 1}`}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    padding: "0.65rem 0.85rem",
                    borderRadius: "8px",
                    marginBottom: "0.4rem",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    border: "1px solid transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = COLORS.overlay.hover;
                    e.currentTarget.style.borderColor = COLORS.overlay.border;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                  >
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {/* Numéro de l'exercice */}
                      <span style={{ 
                        fontSize: "0.95rem", 
                        color: COLORS.purple.light,
                        fontWeight: 600,
                        minWidth: "35px"
                      }}>
                        E{(exIndex + 1).toString().padStart(2, '0')}.
                      </span>
                      
                      {/* Titre de l'exercice */}
                      <span style={{ 
                        fontSize: "0.95rem", 
                        color: COLORS.white.full,
                        lineHeight: "1.4"
                      }}>
                        {exercice.M.titre.S}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);