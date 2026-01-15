"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { LuGraduationCap, LuAward, LuArrowUpRight } from "react-icons/lu";
import { useState } from "react";

export default function AppHome() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <AppLayout>
      <div style={{ 
        padding: "3rem 2rem", 
        fontFamily: "sans-serif",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* En-tête */}
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "0.5rem"
        }}>
          Amélys
        </h1>
        
        <p style={{ 
          fontSize: "1.1rem", 
          opacity: 0.8,
          marginBottom: "3rem"
        }}>
          Plateforme d'apprentissage de l'enseignement secondaire
        </p>

        {/* Section Enseignement secondaire */}
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "1.5rem"
        }}>
          Enseignement secondaire
        </h2>

        {/* Grille de 2 cartes */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
          maxWidth: "1000px"
        }}>
          {/* Carte Collège */}
          <Link
            href="/app/college"
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={() => setHoveredCard("college")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              background: hoveredCard === "college" 
                ? "linear-gradient(135deg, #E8E0FF 0%, #D4C5FF 100%)"
                : "linear-gradient(135deg, #F0EBFF 0%, #E3D9FF 100%)",
              padding: "2rem",
              borderRadius: "16px",
              position: "relative",
              transition: "all 0.3s ease",
              transform: hoveredCard === "college" ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hoveredCard === "college"
                ? "0 12px 24px rgba(139, 92, 246, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.08)",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Icône en haut à gauche */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(139, 92, 246, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7C3AED"
                }}>
                  <LuGraduationCap size={24} />
                </div>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  margin: 0,
                  color: "#1a1a1a"
                }}>
                  Collège
                </h3>
              </div>

              {/* Description */}
              <p style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                color: "#4a4a4a",
                margin: "0 0 auto 0",
                maxWidth: "90%"
              }}>
                De la 6ème à la 3ème, tous les cours et contenus pédagogiques pour réussir ton collège avec une IA dédiée.
              </p>

              {/* Flèche en bas à droite */}
              <div style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: hoveredCard === "college"
                  ? "#7C3AED"
                  : "rgba(124, 58, 237, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                color: hoveredCard === "college" ? "#fff" : "#7C3AED"
              }}>
                <LuArrowUpRight size={24} />
              </div>
            </div>
          </Link>

          {/* Carte Lycée */}
          <Link
            href="/app/lycee"
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
            onMouseEnter={() => setHoveredCard("lycee")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              background: hoveredCard === "lycee" 
                ? "linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)"
                : "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
              padding: "2rem",
              borderRadius: "16px",
              position: "relative",
              transition: "all 0.3s ease",
              transform: hoveredCard === "lycee" ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hoveredCard === "lycee"
                ? "0 12px 24px rgba(14, 165, 233, 0.15)"
                : "0 4px 12px rgba(0, 0, 0, 0.08)",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Icône en haut à gauche */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(14, 165, 233, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0284C7"
                }}>
                  <LuAward size={24} />
                </div>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  margin: 0,
                  color: "#1a1a1a"
                }}>
                  Lycée
                </h3>
              </div>

              {/* Description */}
              <p style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                color: "#4a4a4a",
                margin: "0 0 auto 0",
                maxWidth: "90%"
              }}>
                De la Seconde à la Terminale, prépare ton Baccalauréat avec des cours complets et un accompagnement personnalisé.
              </p>

              {/* Flèche en bas à droite */}
              <div style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: hoveredCard === "lycee"
                  ? "#0284C7"
                  : "rgba(2, 132, 199, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                color: hoveredCard === "lycee" ? "#fff" : "#0284C7"
              }}>
                <LuArrowUpRight size={24} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}