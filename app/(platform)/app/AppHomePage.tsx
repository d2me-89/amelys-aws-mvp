/**
 * Page d'accueil principale de l'application
 * 
 * Affiche 3 fenêtres pour accéder aux différents cycles :
 * - Primaire (orange)
 * - Collège (violet)
 * - Lycée (bleu)
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import AppLayout from "@/app/components/sidebar/AppLayout";

export default function AppHomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <AppLayout>
      <div
        style={{
          minHeight: "100vh",
          padding: "3rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* En-tête */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bienvenue sur Amélys
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "0.5rem",
            }}
          >
            Ton compagnon IA pour réussir ta scolarité
          </p>
        </div>

        {/* Section Éducation nationale */}
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Titre de la section */}
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "2rem",
              textAlign: "center",
              opacity: 0.9,
            }}
          >
            Éducation nationale
          </h2>

          {/* Grille de 3 cartes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {/* Carte Primaire */}
            <CycleCard
              title="Primaire"
              subtitle="CP à CM2"
              emoji="📖"
              color="#FB923C"
              gradient="linear-gradient(135deg, #FB923C 0%, #F97316 50%, #EA580C 100%)"
              headerGradient="linear-gradient(135deg, #FED7AA 0%, #FED7AA 50%, #FDBA74 100%)"
              glowColor="rgba(251,146,60,0.2)"
              borderColor="rgba(251,146,60,0.4)"
              href="/app/primaire"
              isHovered={hoveredCard === "primaire"}
              onHoverChange={() => setHoveredCard("primaire")}
              onHoverLeave={() => setHoveredCard(null)}
            />

            {/* Carte Collège */}
            <CycleCard
              title="Collège"
              subtitle="6ème à 3ème"
              emoji="🎓"
              color="#B794F6"
              gradient="linear-gradient(135deg, #B794F6 0%, #9F7AEA 50%, #805AD5 100%)"
              headerGradient="linear-gradient(135deg, #E8E0FF 0%, #D4C5FF 50%, #C4B5FE 100%)"
              glowColor="rgba(183,148,246,0.15)"
              borderColor="rgba(183,148,246,0.3)"
              href="/app/college"
              isHovered={hoveredCard === "college"}
              onHoverChange={() => setHoveredCard("college")}
              onHoverLeave={() => setHoveredCard(null)}
            />

            {/* Carte Lycée */}
            <CycleCard
              title="Lycée"
              subtitle="2nde à Terminale"
              emoji="🏅"
              color="#38BDF8"
              gradient="linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #0284C7 100%)"
              headerGradient="linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)"
              glowColor="rgba(125,211,252,0.2)"
              borderColor="rgba(56,189,248,0.4)"
              href="/app/lycee"
              isHovered={hoveredCard === "lycee"}
              onHoverChange={() => setHoveredCard("lycee")}
              onHoverLeave={() => setHoveredCard(null)}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Composant de carte pour chaque cycle
type CycleCardProps = {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  gradient: string;
  headerGradient: string;
  glowColor: string;
  borderColor: string;
  href: string;
  isHovered: boolean;
  onHoverChange: () => void;
  onHoverLeave: () => void;
};

function CycleCard({
  title,
  subtitle,
  emoji,
  color,
  gradient,
  headerGradient,
  glowColor,
  borderColor,
  href,
  isHovered,
  onHoverChange,
  onHoverLeave,
}: CycleCardProps) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseEnter={onHoverChange}
      onMouseLeave={onHoverLeave}
    >
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.05)",
          border: isHovered
            ? `1px solid rgba(255,255,255,0.3)`
            : "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s ease",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 12px 24px rgba(0,0,0,0.3)"
            : "0 4px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
      >
        {/* En-tête avec gradient de couleur */}
        <div
          style={{
            background: headerGradient,
            padding: "2.5rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Effet de brillance */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          {/* Icône avec effet lumineux au hover */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
              boxShadow: isHovered
                ? `0 0 0 4px ${borderColor}, 0 0 30px ${borderColor}, 0 0 50px ${glowColor}`
                : "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>{emoji}</span>
          </div>
        </div>

        {/* Corps de la carte */}
        <div
          style={{
            padding: "1.5rem",
            background: "rgba(255,255,255,0.03)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {subtitle}
          </p>

          {/* Bouton */}
          <div
            style={{
              marginTop: "1.5rem",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                background: isHovered ? gradient : "rgba(255,255,255,0.1)",
                border: `2px solid ${isHovered ? borderColor : "rgba(255,255,255,0.2)"}`,
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              }}
            >
              Découvrir
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}