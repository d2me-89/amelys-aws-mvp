/**
 * ChapterLink MODULAIRE
 */

"use client";

import Link from "next/link";
import { getCOLORS, type Cycle } from "./constants";

interface ChapterLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  style?: React.CSSProperties;
  cycle?: Cycle; // 🔥 NOUVEAU
}

export function ChapterLink({ 
  href, 
  icon, 
  text,
  style,
  cycle = 'college' // 🔥 Par défaut collège
}: ChapterLinkProps) {
  const COLORS = getCOLORS(cycle); // 🔥 Récupère les couleurs du cycle

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div 
        style={{
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "0.85rem",
          cursor: "pointer",
          transition: "background 0.2s ease",
          marginBottom: "0.4rem",
          ...style
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.overlay.hover; // 🔥 Hover adaptatif
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Icône avec couleur adaptative */}
        <div style={{ color: COLORS.primary.light }}>
          {icon}
        </div>
        
        {/* Texte */}
        <span style={{ 
          fontSize: "1.05rem", 
          color: "#fff", 
          fontWeight: 500 
        }}>
          {text}
        </span>
      </div>
    </Link>
  );
}