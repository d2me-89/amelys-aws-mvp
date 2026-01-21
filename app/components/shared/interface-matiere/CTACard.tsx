/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/CTACard.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Carte d'appel à l'action (CTA) affichée dans le Hero.
 * GÉNÉRIQUE - Fonctionne pour toutes les matières et niveaux.
 * 
 * FONCTIONNALITÉS:
 * - Bouton principal "Lancer l'IA" avec effet hover
 * - Affichage des statistiques (nombre de chapitres et contenus)
 * - Positionnement absolu pour chevaucher le Hero
 * 
 * COMPOSANTS INCLUS:
 * - CTACard: Carte principale avec bouton et stats
 * - InfoItem: Item d'information (icône + texte)
 * 
 * UTILISATION:
 * ```typescript
 * <CTACard 
 *   nombreSeances={13}
 *   nombreContenusPedagogiques={156}
 *   startLink="/app/college/mathematiques-sixieme/chapitre1-cours"
 * />
 * ```
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { LuPlay, LuBrain, LuSparkles } from "react-icons/lu";
import { COLORS } from "./constants";

/**
 * Props du composant CTACard
 */
interface CTACardProps {
  nombreSeances: number;              // Nombre total de chapitres/séances
  nombreContenusPedagogiques: number; // Nombre total de contenus pédagogiques
  startLink: string;                  // URL vers le premier cours
}

/**
 * Carte d'appel à l'action avec bouton et statistiques
 * Positionnée en absolu dans le Hero pour créer un effet de chevauchement
 */
export function CTACard({ 
  nombreSeances, 
  nombreContenusPedagogiques,
  startLink 
}: CTACardProps) {
  // État local pour gérer l'effet hover du bouton
  const [hoveredButton, setHoveredButton] = useState(false);

  return (
    <div style={{
      background: COLORS.white.full,
      borderRadius: "16px",
      padding: "2.5rem",
      minWidth: "360px",
      maxWidth: "360px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-20%)" // Chevauche légèrement le Hero
    }}>
      {/* Bouton principal "Lancer l'IA" */}
      <Link
        href={startLink}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHoveredButton(true)}
        onMouseLeave={() => setHoveredButton(false)}
      >
        <button style={{
          width: "100%",
          padding: "1.2rem 1.5rem",
          background: hoveredButton 
            ? COLORS.purple.gradientHover 
            : COLORS.purple.gradient,
          color: COLORS.white.full,
          border: "none",
          borderRadius: "12px",
          fontSize: "1.1rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: hoveredButton
            ? "0 8px 20px rgba(128, 90, 213, 0.4)"
            : "0 4px 12px rgba(159, 122, 234, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem"
        }}>
          <LuPlay size={22} />
          Lancer l'IA
        </button>
      </Link>

      {/* Séparateur visuel */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
        margin: "1.5rem 0"
      }} />

      {/* Statistiques */}
      <InfoItem 
        icon={<LuBrain size={22} />}
        text={`${nombreSeances} Chapitres`}
      />
      
      <InfoItem 
        icon={<LuSparkles size={22} />}
        text={`${nombreContenusPedagogiques} Contenus interactifs`}
      />
    </div>
  );
}

/**
 * Props d'un item d'information
 */
interface InfoItemProps {
  icon: React.ReactNode;  // Icône React (composant Lucide)
  text: string;           // Texte à afficher
}

/**
 * Item d'information avec icône et texte
 * Utilisé pour afficher les statistiques dans la CTACard
 */
function InfoItem({ icon, text }: InfoItemProps) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.85rem",
      marginBottom: "1.1rem"
    }}>
      {/* Badge avec icône */}
      <div style={{
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: COLORS.purple.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.purple.primary
      }}>
        {icon}
      </div>
      
      {/* Texte */}
      <span style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        color: COLORS.white.text
      }}>
        {text}
      </span>
    </div>
  );
}