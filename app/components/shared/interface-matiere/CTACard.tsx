/**
 * ============================================
 * FICHIER: app/components/shared/interface-matiere/CTACard.tsx
 * ============================================
 * 
 * Carte Call-To-Action MODULAIRE
 * S'adapte automatiquement aux 3 cycles (primaire, collège, lycée)
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { LuPlay, LuBrain, LuSparkles } from "react-icons/lu";
import { getCOLORS, type Cycle } from "./constants";

/**
 * Props du composant CTACard
 */
interface CTACardProps {
  nombreSeances: number;
  nombreContenusPedagogiques: number;
  startLink: string;
  cycle: Cycle; // 🔥 NOUVEAU : Cycle pour déterminer les couleurs
}

/**
 * Carte Call-To-Action avec bouton et statistiques
 * S'adapte automatiquement aux couleurs du cycle
 */
export function CTACard({ 
  nombreSeances, 
  nombreContenusPedagogiques, 
  startLink,
  cycle 
}: CTACardProps) {
  const [hoveredButton, setHoveredButton] = useState(false);
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
    <div style={{
      width: "360px",
      background: COLORS.white.full,
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
    }}>
      {/* Bouton principal "Lancer l'IA" */}
      <Link href={startLink} style={{ textDecoration: "none" }}>
        <button
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
          style={{
            width: "100%",
            padding: "1.15rem 1.75rem",
            background: hoveredButton 
              ? COLORS.primary.gradientHover  // 🔥 Gradient hover adaptatif
              : COLORS.primary.gradient,       // 🔥 Gradient adaptatif
            color: COLORS.white.full,
            border: "none",
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: hoveredButton
              ? `0 8px 20px ${COLORS.primary.primary}66` // 🔥 Shadow adaptatif
              : `0 4px 12px ${COLORS.primary.primary}4D`,
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
        bgGradient={COLORS.primary.bg}      // 🔥 Fond adaptatif
        iconColor={COLORS.primary.primary}  // 🔥 Couleur icône adaptative
      />
      
      <InfoItem 
        icon={<LuSparkles size={22} />}
        text={`${nombreContenusPedagogiques} Contenus interactifs`}
        bgGradient={COLORS.primary.bg}
        iconColor={COLORS.primary.primary}
      />
    </div>
  );
}

/**
 * Props d'un item d'information
 */
interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
  bgGradient: string;   // 🔥 NOUVEAU : Fond adaptatif
  iconColor: string;    // 🔥 NOUVEAU : Couleur icône adaptative
}

/**
 * Item d'information avec icône et texte
 */
function InfoItem({ icon, text, bgGradient, iconColor }: InfoItemProps) {
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
        background: bgGradient,   // 🔥 Fond adaptatif
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: iconColor          // 🔥 Couleur adaptative
      }}>
        {icon}
      </div>
      
      {/* Texte */}
      <span style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#2D3748"
      }}>
        {text}
      </span>
    </div>
  );
}