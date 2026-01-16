"use client";

import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import { useState } from "react";
import { LuPlay, LuBrain, LuSparkles, LuCalculator, LuChevronDown, LuChevronUp } from "react-icons/lu";

export default function MathematiquesSixiemeHomePage() {
  const [hoveredButton, setHoveredButton] = useState(false);
  const [isPlanCoursOpen, setIsPlanCoursOpen] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  // Données du cours
  const nombreSeances = 13;
  const nombreContenusPedagogiques = 196;

  // Données des chapitres (extraites du JSON)
  const chapitres = [
    {
      id: "C1",
      theme: "Nombres, calcul et résolution de problèmes",
      titre: "Les nombres entiers et décimaux",
      nombreExercices: 39
    },
    {
      id: "C2",
      theme: "Nombres, calcul et résolution de problèmes",
      titre: "Les fractions",
      nombreExercices: 26
    },
    {
      id: "C3",
      theme: "Nombres, calcul et résolution de problèmes",
      titre: "Algèbre",
      nombreExercices: 12
    },
    {
      id: "C4",
      theme: "Grandeurs et mesures",
      titre: "Les longueurs",
      nombreExercices: 15
    },
    {
      id: "C5",
      theme: "Grandeurs et mesures",
      titre: "Les aires",
      nombreExercices: 12
    },
    {
      id: "C6",
      theme: "Grandeurs et mesures",
      titre: "Les volumes",
      nombreExercices: 12
    },
    {
      id: "C7",
      theme: "Grandeurs et mesures",
      titre: "Le repérage dans le temps et les durées",
      nombreExercices: 12
    },
    {
      id: "C8",
      theme: "Espace et géométrie",
      titre: "Étude de configurations planes",
      nombreExercices: 21
    },
    {
      id: "C9",
      theme: "Espace et géométrie",
      titre: "La vision dans l'espace",
      nombreExercices: 8
    },
    {
      id: "C10",
      theme: "Organisation et gestion de données et probabilités",
      titre: "Organisation et gestion de données",
      nombreExercices: 7
    },
    {
      id: "C11",
      theme: "Organisation et gestion de données et probabilités",
      titre: "Les probabilités",
      nombreExercices: 10
    },
    {
      id: "C12",
      theme: "La proportionnalité",
      titre: "La proportionnalité",
      nombreExercices: 12
    },
    {
      id: "C13",
      theme: "Initiation à la pensée informatique",
      titre: "Initiation à la pensée informatique",
      nombreExercices: 10
    }
  ];

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  return (
    <AppLayout>
      {/* Bande pour icônes et recherche (à venir) */}
      <div style={{
        background: "var(--background)",
        height: "70px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        {/* Espace réservé pour icônes et moteur de recherche */}
      </div>

      {/* Bandeau supérieur avec dégradé violet */}
      <div style={{
        background: "linear-gradient(135deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%)",
        padding: "3rem 4rem",
        position: "relative",
        minHeight: "240px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
      }}>
        {/* Conteneur centré avec largeur max */}
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative"
        }}>
        {/* Partie gauche : Niveau + Titre */}
        <div style={{ flex: 1 }}>
          {/* Badge Sixième */}
          <div style={{
            display: "inline-block",
            padding: "0.65rem 1.6rem",
            background: "#fff",
            borderRadius: "50px",
            fontSize: "1rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            color: "#1a1a1a",
            marginBottom: "1.2rem",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
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

        {/* Partie droite : Carte blanche avec CTA - Positionnée pour chevaucher */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "2.5rem",
          minWidth: "360px",
          maxWidth: "360px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-20%)"
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
              padding: "1.2rem 1.5rem",
              background: hoveredButton
                ? "linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)"
                : "linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)",
              color: "#fff",
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

          {/* Séparateur */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
            margin: "1.5rem 0"
          }} />

          {/* Infos : Chapitres */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            marginBottom: "1.1rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#805AD5"
            }}>
              <LuBrain size={22} />
            </div>
            <span style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#2D3748"
            }}>
              {nombreSeances} Chapitres
            </span>
          </div>

          {/* Infos : Contenus interactifs */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#805AD5"
            }}>
              <LuSparkles size={22} />
            </div>
            <span style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#2D3748"
            }}>
              {nombreContenusPedagogiques} Contenus interactifs
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Contenu principal : Plan du cours */}
      <div style={{
        padding: "3rem 4rem",
        maxWidth: "100%",
        margin: "0",
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
        {/* Section Plan du cours */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "1.5rem",
          marginLeft: "0",
          maxWidth: "780px"
        }}>
          {/* En-tête cliquable */}
          <button
            onClick={() => setIsPlanCoursOpen(!isPlanCoursOpen)}
            style={{
              width: "100%",
              padding: "1.5rem 2rem",
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
            {/* Gauche : Icône + Titre */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #E9D5FF 0%, #DDD6FE 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#805AD5"
              }}>
                <LuCalculator size={24} />
              </div>
              <span style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#fff"
              }}>
                Plan du cours
              </span>
            </div>

            {/* Droite : Icône chevron */}
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              {isPlanCoursOpen ? <LuChevronUp size={24} /> : <LuChevronDown size={24} />}
            </div>
          </button>

          {/* Contenu déroulant : Liste des chapitres */}
          {isPlanCoursOpen && (
            <div style={{
              padding: "0 2rem 1.5rem 2rem",
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}>
              {chapitres.map((chapitre, index) => (
                <div key={chapitre.id} style={{ marginTop: "1rem" }}>
                  {/* Bouton chapitre */}
                  <button
                    onClick={() => toggleChapter(chapitre.id)}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1.5rem",
                      background: openChapters[chapitre.id] 
                        ? "rgba(159, 122, 234, 0.1)" 
                        : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      if (!openChapters[chapitre.id]) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!openChapters[chapitre.id]) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      }
                    }}
                  >
                    {/* Gauche : Numéro + Titre */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "1.1rem",
                        color: "#B794F6",
                        fontWeight: 600,
                        marginBottom: "0.4rem"
                      }}>
                        Chapitre {index + 1}. {chapitre.titre}
                      </div>
                      <div style={{
                        fontSize: "0.9rem",
                        color: "#fff",
                        fontWeight: 400
                      }}>
                        Cours • {chapitre.nombreExercices} exercices interactifs • Contrôle • Discussion libre
                      </div>
                    </div>

                    {/* Droite : Chevron */}
                    <div style={{ color: "rgba(255,255,255,0.5)" }}>
                      {openChapters[chapitre.id] ? <LuChevronUp size={20} /> : <LuChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Sous-menu : Liste des exercices (à venir) */}
                  {openChapters[chapitre.id] && (
                    <div style={{
                      marginTop: "0.5rem",
                      padding: "1rem 1.5rem",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "12px",
                      border: "1px solid rgba(159, 122, 234, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <LuSparkles size={16} style={{ color: "rgba(159, 122, 234, 0.8)" }} />
                      <p style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.6)",
                        fontStyle: "italic"
                      }}>
                        Liste des {chapitre.nombreExercices} exercices à venir...
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </AppLayout>
  );
}