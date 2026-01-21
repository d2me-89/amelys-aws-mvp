/**
 * ============================================
 * FICHIER: app/components/shared/subject-home/ChapterLink.tsx
 * ============================================
 * 
 * DESCRIPTION:
 * Composant de lien GÉNÉRIQUE pour les contenus pédagogiques d'un chapitre.
 * Utilisé pour afficher les liens vers: cours, binôme, contrôle, session libre.
 * 
 * FONCTIONNALITÉS:
 * - Lien cliquable avec icône et texte
 * - Effet hover (changement de background)
 * - Navigation Next.js (Link)
 * - Styles personnalisables via props
 * 
 * CAS D'USAGE:
 * - "Cours interactif"
 * - "Exercice en binôme"
 * - "Contrôle du chapitre"
 * - "Session libre"
 * 
 * UTILISATION:
 * ```typescript
 * <ChapterLink 
 *   href="/app/college/mathematiques-sixieme/chapitre1-cours"
 *   icon={<LuBookOpen size={20} style={{ color: "#B794F6" }} />}
 *   text="Cours interactif"
 * />
 * ```
 */

"use client";

import Link from "next/link";
import { COLORS } from "./constants";

/**
 * Props du composant ChapterLink
 */
interface ChapterLinkProps {
  href: string;                     // URL de destination
  icon: React.ReactNode;            // Icône à afficher (composant Lucide)
  text: string;                     // Texte du lien
  style?: React.CSSProperties;      // Styles additionnels optionnels
}

/**
 * Lien cliquable vers un contenu pédagogique
 * Avec icône, texte et effet hover
 */
export function ChapterLink({ 
  href, 
  icon, 
  text,
  style 
}: ChapterLinkProps) {
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
          ...style  // Permet d'ajouter des styles personnalisés (ex: marginTop)
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS.overlay.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {/* Icône */}
        {icon}
        
        {/* Texte du lien */}
        <span style={{ 
          fontSize: "1.05rem", 
          color: COLORS.white.full, 
          fontWeight: 500 
        }}>
          {text}
        </span>
      </div>
    </Link>
  );
}