"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { useState } from "react";
import { LuPlay } from "react-icons/lu";

export default function MathematiquesSixiemeHomePage() {
  const [hoveredButton, setHoveredButton] = useState(false);

  // Données du cours
  const nombreSeances = 13;
  const nombreContenusPedagogiques = 196; // Total des exercices dans le JSON

  return (
    <AppLayout>
      {/* Bandeau supérieur avec dégradé violet */}
      <div style={{
        background: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%)",
        padding: "3rem 4rem",
        position: "relative",
        minHeight: "280px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Partie gauche : Niveau + Titre */}
        <div style={{ flex: 1 }}>
          {/* Badge Sixième */}
          <div style={{
            display: "inline-block",
            padding: "0.5rem 1.2rem",
            background: "rgba(255, 255, 255, 0.25)",
            borderRadius: "50px",
            fontSize: "0.85rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#fff",
            marginBottom: "1.2rem",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}>
            Sixième
          </div>

          {/* Titre du cours */}
          <h1 style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: "#fff",
            margin: 0,
            lineHeight: 1.2,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)"
          }}>
            Mathématiques
          </h1>
        </div>

        {/* Partie droite : Carte blanche avec CTA */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          minWidth: "320px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
          {/* Bouton principal */}
          <Link
            href="/app/college/mathematiques-sixieme/premier-cours"
            style={{
              textDecoration: "none",
              display: "block"
            }}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            <button style={{
              width: "100%",
              padding: "1rem 1.5rem",
              background: hoveredButton
                ? "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)"
                : "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.05rem",
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
              <LuPlay size={20} />
              Démarrer le Cours
            </button>
          </Link>

          {/* Séparateur */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
            margin: "1.5rem 0"
          }} />

          {/* Infos : Séances */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem"
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem"
            }}>
              📚
            </div>
            <span style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#2D3748"
            }}>
              {nombreSeances} Séances
            </span>
          </div>

          {/* Infos : Contenus pédagogiques */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem"
            }}>
              📝
            </div>
            <span style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#2D3748"
            }}>
              {nombreContenusPedagogiques} Contenus pédagogiques
            </span>
          </div>
        </div>
      </div>

      {/* Reste du contenu (à venir) */}
      <div style={{
        padding: "3rem 4rem",
        maxWidth: "1400px"
      }}>
        <p style={{
          fontSize: "1.1rem",
          opacity: 0.7,
          textAlign: "center"
        }}>
          📊 Contenu du cours à venir...
        </p>
      </div>
    </AppLayout>
  );
}
