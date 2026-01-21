/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/HeroSection.tsx
 * ============================================
 * 
 * Composant du bandeau supérieur (Hero) MODULAIRE
 * S'adapte automatiquement aux 3 cycles (primaire, collège, lycée)
 */

"use client";

import Link from "next/link";
import { getCOLORS, type Cycle } from "./constants";

/**
 * Props du composant HeroSection
 */
interface HeroSectionProps {
  level: string;              // Niveau scolaire (ex: "Sixième", "Seconde")
  levelRoute: string;         // Route vers la page du niveau
  subjectTitle: string;       // Titre de la matière (ex: "Mathématiques")
  cycle: Cycle;               // 🔥 NOUVEAU : Cycle pour déterminer les couleurs
  children?: React.ReactNode; // Contenu additionnel (ex: CTACard)
}

/**
 * Composant principal du bandeau Hero
 * S'adapte automatiquement aux couleurs du cycle
 */
export function HeroSection({ 
  level, 
  levelRoute, 
  subjectTitle,
  cycle,
  children 
}: HeroSectionProps) {
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
    <div style={{
      background: COLORS.primary.gradient, // 🔥 Gradient adaptatif
      padding: "3rem 4rem",
      position: "relative",
      minHeight: "240px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center"
    }}>
      {/* Conteneur centré avec largeur maximale */}
      <div style={{
        width: "100%",
        maxWidth: "1350px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        position: "relative"
      }}>
        {/* Partie gauche: Badge niveau + Titre matière */}
        <div style={{ flex: 1 }}>
          <LevelBadge level={level} levelRoute={levelRoute} />
          
          <h1 style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: COLORS.white.full,
            margin: 0,
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)"
          }}>
            {subjectTitle}
          </h1>
        </div>
        
        {/* Partie droite: Contenu optionnel (CTACard) */}
        {children}
      </div>
    </div>
  );
}

/**
 * Props du badge de niveau
 */
interface LevelBadgeProps {
  level: string;
  levelRoute: string;
}

/**
 * Badge cliquable affichant le niveau scolaire
 */
function LevelBadge({ level, levelRoute }: LevelBadgeProps) {
  return (
    <Link href={levelRoute} style={{ textDecoration: "none" }}>
      <div style={{
        display: "inline-block",
        padding: "0.65rem 1.6rem",
        background: "#ffffff",
        borderRadius: "50px",
        fontSize: "1rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.8px",
        color: "#1a1a1a",
        marginBottom: "1.2rem",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
      >
        {level}
      </div>
    </Link>
  );
}